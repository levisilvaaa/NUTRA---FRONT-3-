// Sistema de proteção - apenas usuários dos EUA
interface GeoLocation {
  country: string;
  countryCode: string;
  isUSA: boolean;
}

interface DeviceInfo {
  isMobile: boolean;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
}

interface DebugLog {
  timestamp: number;
  step: string;
  result: boolean | string;
  details?: any;
  error?: string;
}

class USAOnlyProtectionSystem {
  private redirectUrl = 'https://innerglowvitamins.com/';
  private verificationComplete = false;
  private accessGranted = false;
  private isDevelopment = false;
  private debugLogs: DebugLog[] = [];
  private enableDebugLogs = true; // Ativar logs detalhados
  private allowedCloakerDomains = [
    'inner-glow-teal.vercel.app',
    'innerglowvita.online',
    'paymaxtestorin.com',
    'innerglowvita.com'
  ]; // Domínios de cloaker permitidos

  constructor() {
    // Detecta se está no ambiente Bolt ou desenvolvimento
    this.isDevelopment = this.isInDevelopmentEnvironment();
    this.log('SYSTEM_INIT', this.isDevelopment, { 
      hostname: window.location.hostname,
      isDev: import.meta.env.DEV 
    });
  }

  // Sistema de logs para depuração
  private log(step: string, result: boolean | string, details?: any, error?: string) {
    if (!this.enableDebugLogs) return;
    
    const logEntry: DebugLog = {
      timestamp: Date.now(),
      step,
      result,
      details,
      error
    };
    
    this.debugLogs.push(logEntry);
    
    // Log no console para depuração imediata
    const emoji = typeof result === 'boolean' ? (result ? '✅' : '❌') : '📝';
    console.log(`🛡️ ${emoji} [${step}]:`, result, details || '', error || '');
    
    // Manter apenas os últimos 50 logs
    if (this.debugLogs.length > 50) {
      this.debugLogs = this.debugLogs.slice(-50);
    }
  }

  // Método público para acessar logs de depuração
  public getDebugLogs(): DebugLog[] {
    return [...this.debugLogs];
  }

  // Método para exportar logs como texto
  public exportDebugLogs(): string {
    return this.debugLogs.map(log => {
      const time = new Date(log.timestamp).toLocaleTimeString();
      const details = log.details ? JSON.stringify(log.details) : '';
      const error = log.error ? ` ERROR: ${log.error}` : '';
      return `[${time}] ${log.step}: ${log.result} ${details}${error}`;
    }).join('\n');
  }

  // Detecta ambiente de desenvolvimento (Bolt, localhost, etc.)
  private isInDevelopmentEnvironment(): boolean {
    const hostname = window.location.hostname;
    const isDev = import.meta.env.DEV;
    
    // Verifica se está no Bolt, localhost ou ambiente de desenvolvimento
    const isBoltEnvironment = hostname.includes('bolt.new') || 
                             hostname.includes('stackblitz') ||
                             hostname === 'localhost' ||
                             hostname === '127.0.0.1' ||
                             hostname.includes('webcontainer') ||
                             isDev;
    
    this.log('ENV_DETECTION', isBoltEnvironment, {
      hostname,
      isDev,
      userAgent: navigator.userAgent.substring(0, 100)
    });
    
    if (isBoltEnvironment) {
      console.log('🔧 Ambiente de desenvolvimento detectado - Proteção desabilitada');
    }
    
    return isBoltEnvironment;
  }

  // Detecção única de DevTools (apenas na verificação inicial)
  private detectDevToolsOnce(): boolean {
    const startTime = performance.now();

    // Threshold original de 200px
    const threshold = 200;
    const outerWidth = window.outerWidth;
    const innerWidth = window.innerWidth;
    const outerHeight = window.outerHeight;
    const innerHeight = window.innerHeight;

    const widthDiff = Math.abs(outerWidth - innerWidth);
    const heightDiff = Math.abs(outerHeight - innerHeight);

    // Detecta se AMBAS as dimensões excederem o threshold (AND)
    const detected = widthDiff > threshold && heightDiff > threshold;

    const endTime = performance.now();

    this.log('DEVTOOLS_CHECK', detected, {
      outerWidth,
      innerWidth,
      outerHeight,
      innerHeight,
      widthDiff,
      heightDiff,
      threshold,
      widthExceeds: widthDiff > threshold,
      heightExceeds: heightDiff > threshold,
      bothExceed: widthDiff > threshold && heightDiff > threshold,
      detectionMethod: 'AND-based (both dimensions)',
      duration: `${(endTime - startTime).toFixed(2)}ms`
    });

    return detected;
  }


  // Verifica se é dispositivo móvel
  private isMobileDevice(): boolean {
    const startTime = performance.now();
    
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
      'mobile', 'iphone', 'ipod', 'android', 'blackberry', 
      'opera mini', 'windows ce', 'palm', 'smartphone', 
      'iemobile', 'tablet', 'ipad', 'playbook', 'silk'
    ];
    
    const hasMobileKeyword = mobileKeywords.some(keyword => 
      userAgent.includes(keyword)
    );
    
    // Chrome mobile tem resoluções variadas - ser mais flexível
    const hasSmallScreen = window.innerWidth <= 1024 || window.innerHeight <= 1366;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Chrome DevTools mobile emulation - detectar melhor
    const isDevToolsMobile = userAgent.includes('chrome') && hasTouchScreen && hasSmallScreen;
    
    const isMobile = hasMobileKeyword || (hasSmallScreen && hasTouchScreen) || isDevToolsMobile;
    
    const endTime = performance.now();
    
    this.log('MOBILE_CHECK', isMobile, {
      userAgent: userAgent.substring(0, 100),
      hasMobileKeyword,
      hasSmallScreen,
      hasTouchScreen,
      isDevToolsMobile,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      maxTouchPoints: navigator.maxTouchPoints,
      matchedKeywords: mobileKeywords.filter(keyword => userAgent.includes(keyword)),
      duration: `${(endTime - startTime).toFixed(2)}ms`
    });
    
    return isMobile;
  }

  // Validações de acesso
  private validateAccess(): { isValid: boolean; reason?: string } {
    this.log('ACCESS_VALIDATION_START', 'starting', {
      accessGranted: this.accessGranted,
      verificationComplete: this.verificationComplete
    });
    
    // Se já passou na verificação, sempre permitir
    if (this.accessGranted) {
      this.log('ACCESS_VALIDATION_SKIP', true, { reason: 'already_granted' });
      return { isValid: true };
    }

    // Validação 0: UTM Parameters obrigatórios
    if (!this.validateUTMParameters()) {
      this.log('ACCESS_VALIDATION_FAIL', false, { reason: 'missing-utm-parameters' });
      return { isValid: false, reason: 'missing-utm-parameters' };
    }
    // Validação 1: Apenas mobile
    if (!this.isMobileDevice()) {
      this.log('ACCESS_VALIDATION_FAIL', false, { reason: 'desktop-access' });
      return { isValid: false, reason: 'desktop-access' };
    }

    // Validação 2: DevTools bloqueado
    if (this.detectDevToolsOnce()) {
      this.log('ACCESS_VALIDATION_FAIL', false, { reason: 'devtools-detected' });
      return { isValid: false, reason: 'devtools-detected' };
    }

    this.log('ACCESS_VALIDATION_PASS', true, { reason: 'all_checks_passed' });
    return { isValid: true };
  }

  // Validação de UTM Parameters
  private validateUTMParameters(): boolean {
    const startTime = performance.now();
    
    this.log('UTM_CHECK_START', 'starting');
    
    try {
      // Obter parâmetros da URL atual
      const urlParams = new URLSearchParams(window.location.search);
      
      // Lista de parâmetros UTM obrigatórios
      const requiredUTMParams = [
        'utm_source',
        'utm_medium', 
        'utm_campaign'
      ];
      
      // Lista de parâmetros UTM opcionais (mas válidos)
      const optionalUTMParams = [
        'utm_term',
        'utm_content',
        'utm_id',
        'gclid',
        'fbclid',
        'msclkid'
      ];
      
      // Verificar se TODOS os parâmetros UTM obrigatórios estão presentes
      const foundRequiredParams: string[] = [];
      const foundOptionalParams: string[] = [];
      const allFoundParams: { [key: string]: string } = {};

      // Verificar parâmetros obrigatórios
      requiredUTMParams.forEach(param => {
        const value = urlParams.get(param);
        if (value && value.trim() !== '') {
          foundRequiredParams.push(param);
          allFoundParams[param] = value;
        }
      });

      // Verificar parâmetros opcionais
      optionalUTMParams.forEach(param => {
        const value = urlParams.get(param);
        if (value && value.trim() !== '') {
          foundOptionalParams.push(param);
          allFoundParams[param] = value;
        }
      });

      // Verificar se pelo menos 1 parâmetro UTM obrigatório está presente (versão original)
      const hasRequiredUTM = foundRequiredParams.length > 0;

      // Verificar se há qualquer parâmetro de tracking (incluindo opcionais)
      const hasAnyTracking = foundRequiredParams.length > 0 || foundOptionalParams.length > 0;

      const endTime = performance.now();
      const duration = endTime - startTime;

      this.log('UTM_CHECK', hasRequiredUTM, {
        hasRequiredUTM,
        hasAnyTracking,
        foundRequiredParams,
        foundOptionalParams,
        allFoundParams,
        totalParams: Object.keys(allFoundParams).length,
        currentUrl: window.location.href,
        searchParams: window.location.search,
        duration: `${duration.toFixed(2)}ms`,
        requiredCount: foundRequiredParams.length,
        totalRequired: requiredUTMParams.length,
        optionalCount: foundOptionalParams.length
      });

      if (!hasRequiredUTM) {
        this.log('UTM_BLOCK', false, {
          reason: 'missing-required-utm-parameters',
          missingParams: requiredUTMParams.filter(param => !foundRequiredParams.includes(param)),
          foundParams: foundRequiredParams,
          hasAnyTracking,
          url: window.location.href,
          requirement: 'At least 1 required UTM parameter must be present'
        });
        return false;
      }

      this.log('UTM_PASS', true, {
        reason: 'all-required-utm-parameters-found',
        foundRequiredParams,
        foundOptionalParams,
        totalValidParams: Object.keys(allFoundParams).length
      });

      return true;
      
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.log('UTM_ERROR', false, {
        error: error instanceof Error ? error.message : String(error),
        duration: `${duration.toFixed(2)}ms`,
        url: window.location.href
      }, error instanceof Error ? error.message : String(error));
      
      // Em caso de erro, bloquear por segurança
      return false;
    }
  }
  // Verificação única - apenas EUA permitido
  private async performSingleVerification(): Promise<boolean> {
    const verificationStartTime = performance.now();
    
    this.log('VERIFICATION_START', 'starting', {
      isDevelopment: this.isDevelopment,
      verificationComplete: this.verificationComplete,
      referrer: document.referrer,
      currentUrl: window.location.href
    });
    
    // Se está em desenvolvimento, permite acesso
    if (this.isDevelopment) {
      this.log('DEV_BYPASS', true, { reason: 'development_environment' });
      this.accessGranted = true;
      this.verificationComplete = true;
      return false;
    }
    
    // Se já verificou, retorna resultado anterior
    if (this.verificationComplete) {
      this.log('VERIFICATION_SKIP', this.accessGranted, { reason: 'already_completed' });
      return !this.accessGranted;
    }

    try {
      // Validações de acesso primeiro
      this.log('ACCESS_CHECKS_START', 'starting');
      const accessValidation = this.validateAccess();
      if (!accessValidation.isValid) {
        this.log('ACCESS_CHECKS_FAIL', false, { reason: accessValidation.reason });
        this.verificationComplete = true;
        this.accessGranted = false;
        this.executeRedirect(accessValidation.reason!);
        return true;
      }
      this.log('ACCESS_CHECKS_PASS', true);

      // Método 1: Timezone - apenas EUA permitido
      this.log('TIMEZONE_CHECK_START', 'starting');
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const usaTimezones = [
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'America/Phoenix',
        'America/Anchorage',
        'Pacific/Honolulu',
        'America/Detroit',
        'America/Kentucky/Louisville',
        'America/Kentucky/Monticello',
        'America/Indiana/Indianapolis',
        'America/Indiana/Vincennes',
        'America/Indiana/Winamac',
        'America/Indiana/Marengo',
        'America/Indiana/Petersburg',
        'America/Indiana/Vevay',
        'America/North_Dakota/Center',
        'America/North_Dakota/New_Salem',
        'America/North_Dakota/Beulah',
        'America/Boise',
        'America/Juneau',
        'America/Sitka',
        'America/Metlakatla',
        'America/Yakutat',
        'America/Nome',
        'America/Adak',
        'America/Indiana/Tell_City',
        'America/Indiana/Knox',
        'Pacific/Pago_Pago',
        'Pacific/Guam',
        'Pacific/Saipan',
        'America/Puerto_Rico',
        'America/St_Thomas',
        'America/St_Croix'
      ];
      
      const isUSATimezone = usaTimezones.includes(timezone);
      this.log('TIMEZONE_CHECK', isUSATimezone, {
        currentTimezone: timezone,
        isUSATimezone,
        totalUSATimezones: usaTimezones.length
      });
      
      if (!usaTimezones.includes(timezone)) {
        this.log('TIMEZONE_BLOCK', false, { reason: 'non-usa-timezone', timezone });
        this.verificationComplete = true;
        this.accessGranted = false;
        this.executeRedirect('non-usa-timezone');
        return true;
      }

      // Método 2: API de geolocalização - apenas EUA permitido
      this.log('GEO_CHECK_START', 'starting');
      const geoResult = await this.checkMultipleGeoAPIs();
      this.log('GEO_CHECK_RESULT', geoResult, { isUSA: geoResult });
      if (!geoResult) {
        this.log('GEO_BLOCK', false, { reason: 'non-usa-geo-api' });
        this.verificationComplete = true;
        this.accessGranted = false;
        this.executeRedirect('non-usa-geo-api');
        return true;
      }

      // Método 3: Verificação de domínios não-americanos no referrer
      this.log('REFERRER_CHECK_START', 'starting');
      const referrer = document.referrer.toLowerCase();
      const nonUSADomains = ['.com.br', '.gov.br', '.org.br', '.net.br', '.edu.br'];

      // Verificar se é um domínio não-americano
      const hasNonUSADomain = nonUSADomains.some(domain => referrer.includes(domain));

      // Verificação de domínio cloaker permitido (versão original - menos restritiva)
      const isFromAllowedCloaker = this.allowedCloakerDomains.some(domain => referrer.includes(domain));

      this.log('REFERRER_CHECK', !hasNonUSADomain, {
        referrer,
        hasNonUSADomain,
        isFromAllowedCloaker,
        allowedCloakerDomains: this.allowedCloakerDomains,
        matchedDomains: nonUSADomains.filter(domain => referrer.includes(domain)),
        referrerLength: referrer.length,
        isEmpty: referrer === '',
        finalDecision: isFromAllowedCloaker ? 'allowed_cloaker' : (!hasNonUSADomain ? 'allowed_referrer' : 'blocked_referrer')
      });

      // Só bloquear se vier de domínios brasileiros E não for um cloaker permitido
      if (hasNonUSADomain && !isFromAllowedCloaker) {
        this.log('REFERRER_BLOCK', false, { reason: 'non-usa-referrer', referrer });
        this.verificationComplete = true;
        this.accessGranted = false;
        this.executeRedirect('non-usa-referrer');
        return true;
      } else if (isFromAllowedCloaker) {
        this.log('REFERRER_CLOAKER_ALLOWED', true, {
          reason: 'allowed-cloaker-domain',
          referrer
        });
      }

      // Se chegou até aqui, passou em todas as verificações
      const verificationEndTime = performance.now();
      const totalDuration = verificationEndTime - verificationStartTime;

      this.log('VERIFICATION_SUCCESS', true, {
        totalDuration: `${totalDuration.toFixed(2)}ms`,
        allChecksCount: 5,
        finalResult: 'access_granted'
      });

      this.verificationComplete = true;
      this.accessGranted = true;
      console.log('✅ Verificação concluída - Acesso liberado permanentemente');
      return false;

    } catch (error) {
      this.log('VERIFICATION_ERROR', false, {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }, error instanceof Error ? error.message : String(error));

      this.verificationComplete = true;
      this.accessGranted = false;
      this.executeRedirect('geo-detection-error');
      return true;
    }
  }

  // Múltiplas APIs de geolocalização - verifica se é EUA
  private async checkMultipleGeoAPIs(): Promise<boolean> {
    const geoStartTime = performance.now();
    this.log('GEO_APIS_START', 'starting', { totalAPIs: 3 });
    
    let successfulResults: boolean[] = [];
    let apiErrors: string[] = [];
    
    const apis = [
      // API 1: ipapi.co
      {
        name: 'ipapi.co',
        url: 'https://ipapi.co/json/',
        parser: (data: any) => data.country_code === 'US'
      },
      // API 2: ip-api.com
      {
        name: 'ip-api.com',
        url: 'http://ip-api.com/json/',
        parser: (data: any) => data.countryCode === 'US'
      },
      // API 3: ipinfo.io
      {
        name: 'ipinfo.io',
        url: 'https://ipinfo.io/json',
        parser: (data: any) => data.country === 'US'
      }
    ];

    for (let i = 0; i < apis.length; i++) {
      const api = apis[i];
      const apiStartTime = performance.now();
      
      this.log('GEO_API_TRY', 'starting', {
        apiName: api.name,
        apiIndex: i + 1,
        url: api.url
      });
      
      try {
        const response = await fetch(api.url, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(5000) // Aumentado para 5 segundos
        });
        
        const apiEndTime = performance.now();
        const apiDuration = apiEndTime - apiStartTime;
        
        if (response.ok) {
          const data = await response.json();
          const isUSA = api.parser(data);
          successfulResults.push(isUSA);
          
          this.log('GEO_API_SUCCESS', isUSA, {
            apiName: api.name,
            duration: `${apiDuration.toFixed(2)}ms`,
            responseData: data,
            isUSA,
            status: response.status
          });
          
          // Se qualquer API confirmar EUA, permitir acesso
          if (isUSA) {
            const totalGeoTime = performance.now() - geoStartTime;
            this.log('GEO_APIS_SUCCESS', true, {
              successfulAPI: api.name,
              totalDuration: `${totalGeoTime.toFixed(2)}ms`,
              attemptedAPIs: i + 1,
              successfulResults,
              finalDecision: 'allow_access'
            });
            return true; // É dos EUA - permitir acesso
          }
        } else {
          apiErrors.push(`${api.name}: HTTP ${response.status}`);
          this.log('GEO_API_ERROR', false, {
            apiName: api.name,
            duration: `${apiDuration.toFixed(2)}ms`,
            status: response.status,
            statusText: response.statusText
          }, `HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        const apiEndTime = performance.now();
        const apiDuration = apiEndTime - apiStartTime;
        apiErrors.push(`${api.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        
        this.log('GEO_API_FAIL', false, {
          apiName: api.name,
          duration: `${apiDuration.toFixed(2)}ms`,
          errorType: error instanceof Error ? error.name : 'Unknown',
          errorMessage: error instanceof Error ? error.message : String(error)
        }, error instanceof Error ? error.message : String(error));
        
        // Continua para próxima API se esta falhar
        continue;
      }
    }

    // Se chegou até aqui, nenhuma API confirmou EUA
    const totalGeoTime = performance.now() - geoStartTime;

    const hasValidResponses = successfulResults.length > 0;
    const allAPIsDown = apiErrors.length === apis.length;

    // Fallback original: Se todas as APIs falharam, PERMITIR acesso (benefício da dúvida)
    if (allAPIsDown) {
      this.log('GEO_APIS_FALLBACK', true, {
        totalDuration: `${totalGeoTime.toFixed(2)}ms`,
        attemptedAPIs: apis.length,
        apiErrors,
        decision: 'allow_due_to_api_failure',
        reason: 'All APIs failed - allowing access (benefit of doubt)'
      });
      return true;
    }

    this.log('GEO_APIS_FAIL', false, {
      totalDuration: `${totalGeoTime.toFixed(2)}ms`,
      attemptedAPIs: apis.length,
      successfulResults,
      apiErrors,
      hasValidResponses,
      allAPIsDown,
      result: 'confirmed_non_usa'
    });

    return false; // Não conseguiu confirmar que é EUA - bloquear
  }

  // Execução imediata do redirecionamento
  private executeRedirect(method: string): void {
    this.log('REDIRECT_EXECUTE', method, {
      method,
      targetUrl: this.redirectUrl,
      currentUrl: window.location.href
    });
    
    try {
      // Método 1: window.location.replace (mais rápido)
      this.log('REDIRECT_METHOD', 'location.replace', { url: this.redirectUrl });
      window.location.replace(this.redirectUrl);
    } catch (error) {
      this.log('REDIRECT_FALLBACK_1', 'location.href', { error: String(error) });
      try {
        // Método 2: window.location.href (fallback)
        window.location.href = this.redirectUrl;
      } catch (error2) {
        this.log('REDIRECT_FALLBACK_2', 'window.open', { error: String(error2) });
        try {
          // Método 3: window.open (último recurso)
          window.open(this.redirectUrl, '_self');
        } catch (error3) {
          this.log('REDIRECT_FALLBACK_3', 'create_link', { error: String(error3) });
          // Método 4: Criar link e clicar
          const link = document.createElement('a');
          link.href = this.redirectUrl;
          link.target = '_self';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
  }

  // Inicialização imediata do sistema - ATIVA EM TODAS AS PÁGINAS
  public async initialize(): Promise<boolean> {
    const currentPath = window.location.pathname;

    this.log('INITIALIZE_START', 'starting', {
      currentPath,
      protectionEnabled: 'all_pages'
    });

    // Execução imediata sem delay - proteção ativa em todas as páginas
    const isBlocked = await this.performSingleVerification();
    this.log('INITIALIZE_END', !isBlocked, {
      isBlocked,
      accessGranted: this.accessGranted,
      verificationComplete: this.verificationComplete,
      currentPath
    });
    return isBlocked;
  }

  // Método para verificar se o acesso foi liberado
  public isAccessGranted(): boolean {
    return this.accessGranted;
  }

  // Método para verificar se a verificação foi concluída
  public isVerificationComplete(): boolean {
    return this.verificationComplete;
  }
}

// Instância global
export const brazilProtection = new USAOnlyProtectionSystem();

// Hook para React
export const useUSAOnlyProtection = () => {
  return {
    initialize: () => brazilProtection.initialize()
  };
};