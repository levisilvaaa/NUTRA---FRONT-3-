// Sistema de Proteção - Apenas para Página Inicial
// Utility function to preserve all URL parameters
const preserveAllParams = (baseUrl) => {
  try {
    // Get current URL parameters
    const currentParams = new URLSearchParams(window.location.search);
    
    // Create new URL object
    const url = new URL(baseUrl);
    
    // Add ALL parameters from current URL
    currentParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    
    return url.toString();
  } catch (error) {
    console.warn('Error preserving URL parameters:', error);
    return baseUrl;
  }
};

class USAOnlyProtectionSystem {
  constructor() {
    // CONFIGURAÇÕES - ALTERE AQUI CONFORME NECESSÁRIO
    this.redirectUrl = 'https://innerglowvitamins.com/'; // URL de redirecionamento para BLOQUEIO
    this.enableDebugLogs = false; // Defina como 'true' para ver logs detalhados (apenas para testes)
    this.allowedCloakerDomains = [
      'inner-glow-teal.vercel.app',
      'innerglowvita.online',
      'paymaxtestorin.com',
      'innerglowvita.com'
    ]; // Domínios de cloaker permitidos
    
    // Estados internos
    this.verificationComplete = false;
    this.accessGranted = false;
    this.isDevelopment = false;
    this.debugLogs = [];
    
    // Detecta se está no ambiente de desenvolvimento
    this.isDevelopment = this.isInDevelopmentEnvironment();
    this.log('SYSTEM_INIT', this.isDevelopment, { 
      hostname: window.location.hostname,
      currentPath: window.location.pathname
    });
  }

  // Sistema de logs para depuração
  log(step, result, details, error) {
    if (!this.enableDebugLogs) return;
    
    const logEntry = {
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

  // Detecta ambiente de desenvolvimento
  isInDevelopmentEnvironment() {
    const hostname = window.location.hostname;
    
    // Verifica se está em ambiente de desenvolvimento
    const isBoltEnvironment = hostname.includes('bolt.new') || 
                             hostname.includes('stackblitz') ||
                             hostname === 'localhost' ||
                             hostname === '127.0.0.1' ||
                             hostname.includes('webcontainer') ||
                             hostname.includes('127.0.0.1') ||
                             hostname.includes('192.168.') ||
                             hostname.includes('10.0.') ||
                             hostname.includes('172.16.');
    
    this.log('ENV_DETECTION', isBoltEnvironment, {
      hostname,
      userAgent: navigator.userAgent.substring(0, 100)
    });
    
    if (isBoltEnvironment) {
      console.log('🔧 Ambiente de desenvolvimento detectado - Proteção desabilitada');
    }
    
    return isBoltEnvironment;
  }


  // Detecção de DevTools
  detectDevToolsOnce() {
    const startTime = performance.now();
    
    const threshold = 200;
    const outerWidth = window.outerWidth;
    const innerWidth = window.innerWidth;
    const outerHeight = window.outerHeight;
    const innerHeight = window.innerHeight;
    
    const widthDiff = Math.abs(outerWidth - innerWidth);
    const heightDiff = Math.abs(outerHeight - innerHeight);
    
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
      duration: `${(endTime - startTime).toFixed(2)}ms`
    });
    
    return detected;
  }

  // Verifica se é dispositivo móvel
  isMobileDevice() {
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
    
    const hasSmallScreen = window.innerWidth <= 1024 || window.innerHeight <= 1366;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    const isDevToolsMobile = userAgent.includes('chrome') && hasTouchScreen && hasSmallScreen;
    
    const isMobile = hasMobileKeyword || (hasSmallScreen && hasTouchScreen) || isDevToolsMobile;
    
    const endTime = performance.now();
    
    this.log('MOBILE_CHECK', isMobile, {
      userAgent: userAgent.substring(0, 100),
      hasMobileKeyword,
      hasSmallScreen,
      hasTouchScreen,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      duration: `${(endTime - startTime).toFixed(2)}ms`
    });
    
    return isMobile;
  }

  // Validação de UTM Parameters
  validateUTMParameters() {
    const startTime = performance.now();
    
    this.log('UTM_CHECK_START', 'starting');
    
    try {
      const urlParams = new URLSearchParams(window.location.search);
      
      const requiredUTMParams = [
        'utm_source',
        'utm_medium', 
        'utm_campaign'
      ];
      
      const optionalUTMParams = [
        'utm_term',
        'utm_content',
        'utm_id',
        'gclid',
        'fbclid',
        'msclkid'
      ];
      
      const foundRequiredParams = [];
      const foundOptionalParams = [];
      const allFoundParams = {};
      
      requiredUTMParams.forEach(param => {
        const value = urlParams.get(param);
        if (value && value.trim() !== '') {
          foundRequiredParams.push(param);
          allFoundParams[param] = value;
        }
      });
      
      optionalUTMParams.forEach(param => {
        const value = urlParams.get(param);
        if (value && value.trim() !== '') {
          foundOptionalParams.push(param);
          allFoundParams[param] = value;
        }
      });
      
      const hasRequiredUTM = foundRequiredParams.length > 0;
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.log('UTM_CHECK', hasRequiredUTM, {
        hasRequiredUTM,
        foundRequiredParams,
        foundOptionalParams,
        allFoundParams,
        currentUrl: window.location.href,
        duration: `${duration.toFixed(2)}ms`
      });
      
      if (!hasRequiredUTM) {
        this.log('UTM_BLOCK', false, { 
          reason: 'missing-required-utm-parameters',
          url: window.location.href
        });
        return false;
      }
      
      return true;
      
    } catch (error) {
      this.log('UTM_ERROR', false, {
        error: error instanceof Error ? error.message : String(error),
        url: window.location.href
      }, error instanceof Error ? error.message : String(error));
      
      return false;
    }
  }

  // Validações de acesso
  validateAccess() {
    this.log('ACCESS_VALIDATION_START', 'starting');
    
    if (this.accessGranted) {
      this.log('ACCESS_VALIDATION_SKIP', true, { reason: 'already_granted' });
      return { isValid: true };
    }

    // Validação 1: UTM Parameters obrigatórios
    if (!this.validateUTMParameters()) {
      return { isValid: false, reason: 'missing-utm-parameters' };
    }

    // Validação 2: Apenas mobile
    if (!this.isMobileDevice()) {
      return { isValid: false, reason: 'desktop-access' };
    }

    // Validação 3: DevTools bloqueado
    if (this.detectDevToolsOnce()) {
      return { isValid: false, reason: 'devtools-detected' };
    }

    this.log('ACCESS_VALIDATION_PASS', true);
    return { isValid: true };
  }

  async performSingleVerification() {
    const verificationStartTime = performance.now();
    
    this.log('VERIFICATION_START', 'starting', {
      isDevelopment: this.isDevelopment,
      currentUrl: window.location.href
    });
    
    // Bypass em desenvolvimento
    if (this.isDevelopment) {
      this.log('DEV_BYPASS', true, { reason: 'development_environment' });
      this.accessGranted = true;
      this.verificationComplete = true;
      return false;
    }
    
    if (this.verificationComplete) {
      this.log('VERIFICATION_SKIP', this.accessGranted, { reason: 'already_completed' });
      return !this.accessGranted;
    }

    try {
      // Validações básicas de acesso
      const accessValidation = this.validateAccess();
      if (!accessValidation.isValid) {
        this.log('ACCESS_CHECKS_FAIL', false, { reason: accessValidation.reason });
        this.verificationComplete = true;
        this.accessGranted = false;
        this.executeRedirect(accessValidation.reason);
        return true;
      }

      // Verificação de timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const usaTimezones = [
        'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
        'America/Phoenix', 'America/Anchorage', 'Pacific/Honolulu', 'America/Detroit',
        'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Indiana/Indianapolis',
        'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Indiana/Marengo',
        'America/Indiana/Petersburg', 'America/Indiana/Vevay', 'America/North_Dakota/Center',
        'America/North_Dakota/New_Salem', 'America/North_Dakota/Beulah', 'America/Boise',
        'America/Juneau', 'America/Sitka', 'America/Metlakatla', 'America/Yakutat',
        'America/Nome', 'America/Adak', 'America/Indiana/Tell_City',
        'America/Indiana/Knox', 'Pacific/Pago_Pago', 'Pacific/Guam',
        'Pacific/Saipan', 'America/Puerto_Rico', 'America/St_Thomas', 'America/St_Croix'
      ];
      
      if (!usaTimezones.includes(timezone)) {
        this.log('TIMEZONE_BLOCK', false, { reason: 'non-usa-timezone', timezone });
        this.verificationComplete = true;
        this.accessGranted = false;
        this.executeRedirect('non-usa-timezone');
        return true;
      }

      // Verificação de geolocalização
      const geoResult = await this.checkMultipleGeoAPIs();
      if (!geoResult) {
        this.log('GEO_BLOCK', false, { reason: 'non-usa-geo-api' });
        this.verificationComplete = true;
        this.accessGranted = false;
        this.executeRedirect('non-usa-geo-api');
        return true;
      }

      // Verificação de referrer
      const referrer = document.referrer.toLowerCase();
      const nonUSADomains = ['.com.br', '.gov.br', '.org.br', '.net.br', '.edu.br'];
      const hasNonUSADomain = nonUSADomains.some(domain => referrer.includes(domain));
      const isFromAllowedCloaker = this.allowedCloakerDomains.some(domain => referrer.includes(domain));
      
      if (hasNonUSADomain && !isFromAllowedCloaker) {
        this.log('REFERRER_BLOCK', false, { reason: 'non-usa-referrer', referrer });
        this.verificationComplete = true;
        this.accessGranted = false;
        this.executeRedirect('non-usa-referrer');
        return true;
      }

      // Verificação de idioma
      const userLanguage = navigator.language.toLowerCase();
      const userLanguages = navigator.languages?.map(lang => lang.toLowerCase()) || [userLanguage];
      const allowedLanguages = ['en-us', 'en', 'en-gb', 'en-ca', 'en-au'];
      const hasAllowedLanguage = userLanguages.some(lang => 
        allowedLanguages.some(allowed => lang.startsWith(allowed))
      );
      
      if (!hasAllowedLanguage) {
        this.log('LANGUAGE_BLOCK', false, { 
          reason: 'non-english-language', 
          detectedLanguage: userLanguage
        });
        this.verificationComplete = true;
        this.accessGranted = false;
        this.executeRedirect('non-english-language');
        return true;
      }

      // Se chegou até aqui, passou em todas as verificações
      const verificationEndTime = performance.now();
      const totalDuration = verificationEndTime - verificationStartTime;
      
      this.log('VERIFICATION_SUCCESS', true, {
        totalDuration: `${totalDuration.toFixed(2)}ms`,
        finalResult: 'access_granted'
      });
      
      this.verificationComplete = true;
      this.accessGranted = true;
      console.log('✅ Verificação concluída - Acesso liberado');
      return false;

    } catch (error) {
      this.log('VERIFICATION_ERROR', false, {
        error: error instanceof Error ? error.message : String(error)
      }, error instanceof Error ? error.message : String(error));
      
      this.verificationComplete = true;
      this.accessGranted = false;
      this.executeRedirect('verification-error');
      return true;
    }
  }

  async checkMultipleGeoAPIs() {
    this.log('GEO_APIS_START', 'starting');
    
    const apis = [
      {
        name: 'ipapi.co',
        url: 'https://ipapi.co/json/',
        parser: (data) => data.country_code === 'US'
      },
      {
        name: 'ip-api.com',
        url: 'http://ip-api.com/json/',
        parser: (data) => data.countryCode === 'US'
      },
      {
        name: 'ipinfo.io',
        url: 'https://ipinfo.io/json',
        parser: (data) => data.country === 'US'
      }
    ];

    let apiErrors = [];

    for (let i = 0; i < apis.length; i++) {
      const api = apis[i];
      
      try {
        const response = await fetch(api.url, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(5000)
        });
        
        if (response.ok) {
          const data = await response.json();
          const isUSA = api.parser(data);
          
          this.log('GEO_API_SUCCESS', isUSA, {
            apiName: api.name,
            isUSA
          });
          
          if (isUSA) {
            return true;
          }
        } else {
          apiErrors.push(`${api.name}: HTTP ${response.status}`);
        }
      } catch (error) {
        apiErrors.push(`${api.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        continue;
      }
    }

    // Se todas as APIs falharam, permite acesso (benefício da dúvida)
    if (apiErrors.length === apis.length) {
      this.log('GEO_APIS_FALLBACK', true, {
        reason: 'All APIs failed - allowing access'
      });
      return true;
    }
    
    return false;
  }

  executeRedirect(method) {
    this.log('REDIRECT_EXECUTE', method, {
      method,
      targetUrl: this.redirectUrl
    });
    
    try {
      window.location.replace(this.redirectUrl);
    } catch (error) {
      try {
        window.location.href = this.redirectUrl;
      } catch (error2) {
        window.open(this.redirectUrl, '_self');
      }
    }
  }

  /**
   * Inicializa o sistema de proteção EM TODAS AS PÁGINAS
   * @param {string} [successRedirectUrl] - URL para redirecionar se todas as verificações passarem
   * @returns {Promise<boolean>} - Retorna true se bloqueado, false se permitido
   */
  async initialize(successRedirectUrl = null) {
    const currentPath = window.location.pathname;

    this.log('INITIALIZE_START', 'starting', {
      successRedirectUrl: successRedirectUrl || 'not_provided',
      currentPath,
      protectionEnabled: 'all_pages'
    });

    // Execução imediata sem delay - proteção ativa em todas as páginas
    const isBlocked = await this.performSingleVerification();

    if (!isBlocked && successRedirectUrl) {
      // Redireciona para URL de sucesso com parâmetros preservados
      const finalSuccessUrl = preserveAllParams(successRedirectUrl);
      this.log('SUCCESS_REDIRECT', 'executing', { targetUrl: finalSuccessUrl });
      window.location.replace(finalSuccessUrl);
      return false;
    }

    this.log('INITIALIZE_END', isBlocked, {
      isBlocked,
      accessGranted: this.accessGranted,
      currentPath
    });

    return isBlocked;
  }
    
  isAccessGranted() {
    return this.accessGranted;
  }

  isVerificationComplete() {
    return this.verificationComplete;
  }

  getDebugLogs() {
    return [...this.debugLogs];
  }
}

// Cria instância global
window.brazilProtection = new USAOnlyProtectionSystem();

// Inicialização automática quando DOM estiver pronto
window.addEventListener('DOMContentLoaded', async () => {
  // CONFIGURE AQUI: URL para onde redirecionar usuários que passarem nas verificações
  // Deixe como null se não quiser redirecionar automaticamente
  const mySuccessPageUrl = null; // Exemplo: 'https://seusite.com/pagina-de-sucesso'
  
  try {
    await window.brazilProtection.initialize(mySuccessPageUrl);
  } catch (error) {
    console.error('Erro na inicialização da proteção:', error);
  }
});

// Exporta para uso manual se necessário
if (typeof module !== 'undefined' && module.exports) {
  module.exports = USAOnlyProtectionSystem;
}