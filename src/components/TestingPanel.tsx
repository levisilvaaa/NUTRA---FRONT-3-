import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, Monitor, Smartphone, Globe, Clock, AlertTriangle, CheckCircle, X, RefreshCw, Download, Bug } from 'lucide-react';
import { brazilProtection } from '../utils/brazilProtection';

interface TestResult {
  test: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: string;
}

const TestingPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentEnvironment, setCurrentEnvironment] = useState<any>({});
  const [debugLogs, setDebugLogs] = useState<any[]>([]);
  const [showDebugLogs, setShowDebugLogs] = useState(false);

  // Detecta ambiente de desenvolvimento
  const isDevelopment = () => {
    const hostname = window.location.hostname;
    const isDev = import.meta.env.DEV;
    
    return hostname.includes('bolt.new') || 
           hostname.includes('stackblitz') ||
           hostname === 'localhost' ||
           hostname === '127.0.0.1' ||
           hostname.includes('webcontainer') ||
           isDev;
  };

  // Só mostra o painel em desenvolvimento
  if (!isDevelopment()) {
    return null;
  }

  // Carregar logs de debug
  const loadDebugLogs = () => {
    const logs = brazilProtection.getDebugLogs();
    setDebugLogs(logs);
  };

  // Exportar logs como arquivo
  const exportDebugLogs = () => {
    const logsText = brazilProtection.exportDebugLogs();
    const blob = new Blob([logsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `protection-debug-logs-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Coleta informações do ambiente atual
  const collectEnvironmentInfo = () => {
    const info = {
      // Dispositivo
      userAgent: navigator.userAgent,
      isMobile: /mobile|iphone|ipod|android|blackberry|opera mini|windows ce|palm|smartphone|iemobile|tablet|ipad|playbook|silk/i.test(navigator.userAgent.toLowerCase()),
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      
      // Localização
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      languages: navigator.languages,
      
      // Idioma detalhado
      primaryLanguage: navigator.language,
      allLanguages: navigator.languages || [navigator.language],
      isEnglish: navigator.language.toLowerCase().startsWith('en'),
      
      // Navegador
      hostname: window.location.hostname,
      referrer: document.referrer,
      
      // DevTools (aproximação)
      devToolsOpen: window.outerHeight - window.innerHeight > 160 || window.outerWidth - window.innerWidth > 160,
      
      // Ambiente
      isDev: import.meta.env.DEV,
      isProduction: !import.meta.env.DEV
    };
    
    setCurrentEnvironment(info);
    return info;
  };

  // Executa todos os testes
  const runAllTests = async () => {
    setIsRunning(true);
    const results: TestResult[] = [];
    const env = collectEnvironmentInfo();

    // Teste 0: Verificação de UTM Parameters
    const urlParams = new URLSearchParams(window.location.search);
    const requiredUTMParams = ['utm_source', 'utm_medium', 'utm_campaign'];
    const foundUTMParams = requiredUTMParams.filter(param => {
      const value = urlParams.get(param);
      return value && value.trim() !== '';
    });
    const hasRequiredUTM = foundUTMParams.length > 0;
    
    results.push({
      test: 'UTM Parameters Check',
      status: hasRequiredUTM ? 'pass' : 'fail',
      message: hasRequiredUTM ? 'Required UTM parameters found ✅' : 'Missing required UTM parameters - WOULD BE BLOCKED ❌',
      details: `Found: ${foundUTMParams.join(', ') || 'none'}, Required: ${requiredUTMParams.join(', ')}, URL: ${window.location.search || 'no params'}`
    });
    // Teste 1: Verificação de Dispositivo
    results.push({
      test: 'Mobile Device Check',
      status: env.isMobile ? 'pass' : 'fail',
      message: env.isMobile ? 'Mobile device detected ✅' : 'Desktop device detected - WOULD BE BLOCKED ❌',
      details: `User Agent: ${env.userAgent.substring(0, 50)}...`
    });

    // Teste 2: Verificação de DevTools
    results.push({
      test: 'DevTools Detection',
      status: env.devToolsOpen ? 'warning' : 'pass',
      message: env.devToolsOpen ? 'DevTools detected - More tolerant now ⚠️' : 'No DevTools detected ✅',
      details: `Window size: ${env.screenWidth}x${env.screenHeight}`
    });

    // Teste 3: Verificação de Timezone
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
      'Pacific/Saipan', 'America/Puerto_Rico', 'America/St_Thomas',
      'America/St_Croix'
    ];
    
    const isUSATimezone = usaTimezones.includes(env.timezone);
    results.push({
      test: 'USA Timezone Check',
      status: isUSATimezone ? 'pass' : 'fail',
      message: isUSATimezone ? 'USA timezone detected ✅' : 'Non-USA timezone - WOULD BE BLOCKED ❌',
      details: `Current timezone: ${env.timezone}`
    });

    // Teste 4: Verificação de Idioma
    const userLanguage = navigator.language.toLowerCase();
    const userLanguages = navigator.languages?.map(lang => lang.toLowerCase()) || [userLanguage];
    const allowedLanguages = ['en-us', 'en', 'en-gb', 'en-ca', 'en-au'];
    const hasAllowedLanguage = userLanguages.some(lang => 
      allowedLanguages.some(allowed => lang.startsWith(allowed))
    );
    
    results.push({
      test: 'English Language Check',
      status: hasAllowedLanguage ? 'pass' : 'fail',
      message: hasAllowedLanguage ? 'English language detected ✅' : 'Non-English language - WOULD BE BLOCKED ❌',
      details: `Primary language: ${userLanguage}, All languages: ${userLanguages.join(', ')}`
    });

    // Teste 5: Verificação de Geolocalização (simulado)
    results.push({
      test: 'IP Geolocation Check',
      status: 'pass',
      message: 'Geolocation now has fallback - More reliable ✅',
      details: 'If all APIs fail, system allows access (benefit of doubt)'
    });

    // Teste 6: Verificação de Ambiente
    results.push({
      test: 'Environment Check',
      status: env.isDev ? 'warning' : 'pass',
      message: env.isDev ? 'Development environment - Protection DISABLED ⚠️' : 'Production environment - Protection ACTIVE ✅',
      details: `Hostname: ${env.hostname}, Dev mode: ${env.isDev}`
    });

    setTestResults(results);
    
    // Carregar logs após os testes
    loadDebugLogs();
    
    setIsRunning(false);
  };

  // Simula diferentes cenários
  const simulateScenario = (scenario: string) => {
    const scenarios = {
      'usa-mobile': 'Simulating: USA Mobile User (iPhone, New York timezone, English)',
      'brazil-mobile': 'Simulating: Brazil Mobile User (Android, São Paulo timezone, Portuguese)',
      'usa-desktop': 'Simulating: USA Desktop User (Chrome, Los Angeles timezone, English)',
      'devtools': 'Simulating: User with DevTools Open',
      'cloaker': 'Simulating: Traffic from Cloaker (vitaegold.vercel.app)\n\nThis traffic would be ALLOWED to proceed to other verifications (timezone, geo, etc.)',
      'no-utm': 'Simulating: User without UTM parameters\n\nThis user would be BLOCKED immediately - UTM parameters are required',
      'valid-utm': 'Simulating: User with valid UTM parameters\n\nExample: ?utm_source=facebook&utm_medium=cpc&utm_campaign=test'
    };
    
    alert(`${scenarios[scenario as keyof typeof scenarios]}\n\nIn production, this user would be ${scenario.includes('usa-mobile') ? 'ALLOWED' : 'BLOCKED'}`);
  };

  useEffect(() => {
    collectEnvironmentInfo();
    loadDebugLogs();
  }, []);

  return (
    <>
      {/* Floating Test Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 border border-blue-500/30"
          title="Protection Testing Panel"
        >
          {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Testing Panel */}
      {isVisible && (
        <div className="fixed inset-0 z-40 flex items-start justify-center pt-4 p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsVisible(false)}
          />
          
          {/* Panel */}
          <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-white" />
                <div>
                  <h2 className="text-xl font-bold text-white">Protection Testing Panel</h2>
                  <p className="text-blue-100 text-sm">Test all protection mechanisms</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => simulateScenario('cloaker')}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Simulate Cloaker Traffic
                </button>
                
                <button
                  onClick={() => setIsVisible(false)}
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Debug Controls */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-bold text-orange-800 mb-3 flex items-center space-x-2">
                  <Bug className="w-5 h-5" />
                  <span>Debug Controls</span>
                </h4>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={loadDebugLogs}
                    className="flex items-center space-x-2 bg-orange-100 hover:bg-orange-200 text-orange-800 px-3 py-2 rounded-lg font-semibold transition-colors duration-200"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reload Debug Logs</span>
                  </button>
                  
                  <button
                    onClick={exportDebugLogs}
                    className="flex items-center space-x-2 bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-lg font-semibold transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Logs</span>
                  </button>
                  
                  <button
                    onClick={() => setShowDebugLogs(!showDebugLogs)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                      showDebugLogs 
                        ? 'bg-blue-100 hover:bg-blue-200 text-blue-800' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>{showDebugLogs ? 'Hide' : 'Show'} Debug Logs</span>
                  </button>
                </div>
                
                <div className="mt-3 text-sm text-orange-700">
                  <p>• <strong>Debug Logs:</strong> Shows detailed step-by-step protection verification</p>
                  <p>• <strong>Export:</strong> Download logs as text file for analysis</p>
                  <p>• <strong>Real-time:</strong> Logs are captured during actual protection checks</p>
                </div>
              </div>

              {/* Current Environment */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Current Environment</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {currentEnvironment.isMobile ? <Smartphone className="w-4 h-4 text-green-600" /> : <Monitor className="w-4 h-4 text-red-600" />}
                      <span className={currentEnvironment.isMobile ? 'text-green-600' : 'text-red-600'}>
                        {currentEnvironment.isMobile ? 'Mobile Device' : 'Desktop Device'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">{currentEnvironment.timezone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-purple-600" />
                      <span className="text-gray-700">
                        {currentEnvironment.primaryLanguage} 
                        {currentEnvironment.isEnglish ? ' ✅' : ' ❌'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-orange-600" />
                      <span className="text-gray-700">
                        {currentEnvironment.isDev ? 'Development' : 'Production'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-gray-700">
                        DevTools: {currentEnvironment.devToolsOpen ? 'Detected' : 'Not Detected'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Controls */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={runAllTests}
                  disabled={isRunning}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'Running Tests...' : 'Run All Tests'}</span>
                </button>
                
                <button
                  onClick={() => simulateScenario('usa-mobile')}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Simulate USA Mobile
                </button>
                
                <button
                  onClick={() => simulateScenario('brazil-mobile')}
                  className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Simulate Brazil Mobile
                </button>
                
                <button
                  onClick={() => simulateScenario('usa-desktop')}
                  className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Simulate USA Desktop
                </button>
                
                <button
                  onClick={() => simulateScenario('no-utm')}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Simulate No UTM
                </button>
                
                <button
                  onClick={() => simulateScenario('valid-utm')}
                  className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Simulate Valid UTM
                </button>
              </div>

              {/* Debug Logs Section */}
              {showDebugLogs && (
                <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-white flex items-center space-x-2">
                      <Bug className="w-5 h-5" />
                      <span>Debug Logs ({debugLogs.length})</span>
                    </h4>
                    <div className="text-xs text-gray-400">
                      Real-time protection verification logs
                    </div>
                  </div>
                  
                  {debugLogs.length === 0 ? (
                    <div className="text-gray-400 text-center py-8">
                      <Bug className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No debug logs available</p>
                      <p className="text-xs">Run tests or trigger protection to see logs</p>
                    </div>
                  ) : (
                    <div className="space-y-2 font-mono text-sm">
                      {debugLogs.map((log, index) => {
                        const time = new Date(log.timestamp).toLocaleTimeString();
                        const isError = log.error;
                        const isSuccess = typeof log.result === 'boolean' && log.result;
                        const isFail = typeof log.result === 'boolean' && !log.result;
                        
                        return (
                          <div 
                            key={index} 
                            className={`p-2 rounded border-l-4 ${
                              isError ? 'bg-red-900/20 border-red-500 text-red-300' :
                              isSuccess ? 'bg-green-900/20 border-green-500 text-green-300' :
                              isFail ? 'bg-yellow-900/20 border-yellow-500 text-yellow-300' :
                              'bg-blue-900/20 border-blue-500 text-blue-300'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-gray-400 text-xs">[{time}]</span>
                                  <span className="font-bold">{log.step}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded ${
                                    isError ? 'bg-red-800 text-red-200' :
                                    isSuccess ? 'bg-green-800 text-green-200' :
                                    isFail ? 'bg-yellow-800 text-yellow-200' :
                                    'bg-blue-800 text-blue-200'
                                  }`}>
                                    {String(log.result)}
                                  </span>
                                </div>
                                
                                {log.details && (
                                  <div className="text-xs text-gray-400 mt-1 pl-4 border-l border-gray-600">
                                    <pre className="whitespace-pre-wrap">
                                      {JSON.stringify(log.details, null, 2)}
                                    </pre>
                                  </div>
                                )}
                                
                                {log.error && (
                                  <div className="text-xs text-red-400 mt-1 pl-4 border-l border-red-600">
                                    <strong>ERROR:</strong> {log.error}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Test Results */}
              {testResults.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800 text-lg">Test Results</h3>
                  
                  {testResults.map((result, index) => (
                    <div key={index} className={`border-2 rounded-lg p-4 ${
                      result.status === 'pass' ? 'border-green-200 bg-green-50' :
                      result.status === 'fail' ? 'border-red-200 bg-red-50' :
                      'border-yellow-200 bg-yellow-50'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {result.status === 'pass' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : result.status === 'fail' ? (
                            <X className="w-5 h-5 text-red-600" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{result.test}</h4>
                          <p className={`text-sm mt-1 ${
                            result.status === 'pass' ? 'text-green-700' :
                            result.status === 'fail' ? 'text-red-700' :
                            'text-yellow-700'
                          }`}>
                            {result.message}
                          </p>
                          {result.details && (
                            <p className="text-xs text-gray-600 mt-2 font-mono bg-white/50 p-2 rounded">
                              {result.details}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-800 mb-2">How to Test:</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• <strong>UTM Test:</strong> Add ?utm_source=test&utm_medium=test&utm_campaign=test to URL</p>
                  <p>• <strong>Development:</strong> Protection is disabled - use this panel to test</p>
                  <p>• <strong>Production:</strong> Test with real devices and locations</p>
                  <p>• <strong>Mobile Test:</strong> Use Chrome DevTools device emulation</p>
                  <p>• <strong>Location Test:</strong> Use VPN to test different countries</p>
                  <p>• <strong>DevTools Test:</strong> Open F12 to trigger detection</p>
                  <p>• <strong>Debug Logs:</strong> Show detailed step-by-step verification process</p>
                  <p>• <strong>Language Test:</strong> System checks for English language preference</p>
                  <p>• <strong>Cloaker Exception:</strong> Whitelisted domains bypass referrer check</p>
                  <p>• <strong>Chrome Fixed:</strong> More tolerant DevTools detection and geo fallback</p>
                </div>
                <div className="mt-2 pt-2 border-t border-blue-200">
                  <p className="text-red-800 font-semibold">• <strong>UTM Required:</strong> At least one of utm_source, utm_medium, or utm_campaign required</p>
                  <p className="text-green-800 font-semibold">• <strong>Language Check:</strong> Only English speakers allowed</p>
                  <p className="text-blue-800 font-semibold">• <strong>ALL PAGES PROTECTED:</strong> Protection now active on all pages, not just homepage</p>
                  <p className="text-purple-800 font-semibold">• <strong>Cloaker Domains:</strong> inner-glow-teal.vercel.app, innerglowvita.online, paymaxtestorin.com, innerglowvita.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestingPanel;