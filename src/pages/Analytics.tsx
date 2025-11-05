import React, { useState, useEffect } from 'react';
import { Users, Eye, Clock, TrendingUp, Activity, Globe, Smartphone, Monitor, RefreshCw, AlertCircle, Home, ShoppingCart, BarChart3, Folder, ChevronDown, ChevronRight } from 'lucide-react';
import { useAnalytics } from '../utils/analyticsTracker';

interface PageAnalytics {
  path: string;
  name: string;
  slug: string;
  onlineUsers: number;
  totalViews: number;
  avgTimeOnPage: string;
  bounceRate: number;
  conversionRate: number;
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  lastUpdated: string;
  status: 'active' | 'inactive';
}

interface RealTimeData {
  totalOnlineUsers: number;
  totalPageViews: number;
  avgSessionDuration: string;
  topPerformingPage: string;
  lastRefresh: string;
}

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<PageAnalytics[]>([]);
  const [realTimeData, setRealTimeData] = useState<RealTimeData>({
    totalOnlineUsers: 0,
    totalPageViews: 0,
    avgSessionDuration: '0:00',
    topPerformingPage: '',
    lastRefresh: new Date().toLocaleTimeString()
  });
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['main', 'upsells']);
  const analytics = useAnalytics();

  // Get real analytics data
  const getRealAnalyticsData = (): PageAnalytics[] => {
    return analytics.getAllPagesAnalytics();
  };

  // Update analytics data
  const updateAnalytics = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newData = getRealAnalyticsData();
      setAnalyticsData(newData);
      
      // Get real-time summary data
      setRealTimeData(analytics.getRealTimeData());
      
      setIsLoading(false);
    }, 500);
  };

  // Auto-refresh effect
  useEffect(() => {
    updateAnalytics();
    
    if (autoRefresh) {
      const interval = setInterval(updateAnalytics, 3000); // Update every 3 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  // Organize pages by category
  const organizePagesByCategory = (pages: any[]) => {
    const categories = {
      main: {
        name: 'Páginas Principais',
        icon: Home,
        color: 'from-red-500 to-red-600',
        pages: pages.filter(page => page.path === '/')
      },
      upsells: {
        name: 'Páginas de Upsell',
        icon: ShoppingCart,
        color: 'from-green-500 to-green-600',
        pages: pages.filter(page => page.path.includes('/upsell') || page.path.includes('/downsell'))
      },
      analytics: {
        name: 'Dashboard & Analytics',
        icon: BarChart3,
        color: 'from-blue-500 to-blue-600',
        pages: pages.filter(page => page.path === '/analytics')
      }
    };

    // Filter out empty categories
    return Object.entries(categories).filter(([_, category]) => category.pages.length > 0);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-red-800 via-red-600 to-red-400 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Monitoramento em tempo real de todas as páginas do projeto
              </p>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  autoRefresh
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>{autoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}</span>
              </button>
              
              <button
                onClick={updateAnalytics}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Atualizar</span>
              </button>
            </div>
          </div>
          
          {/* Last Update Info */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Última atualização: {realTimeData.lastRefresh}</span>
            {autoRefresh && (
              <span className="flex items-center space-x-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Atualizando automaticamente</span>
              </span>
            )}
          </div>
        </div>

        {/* Real-Time Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Total Online Users */}
          <div className="bg-white rounded-2xl border-2 border-red-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-full p-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-red-600">
                  {formatNumber(realTimeData.totalOnlineUsers)}
                </p>
                <p className="text-sm text-gray-600">Usuários Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+12% vs ontem</span>
            </div>
          </div>

          {/* Total Page Views */}
          <div className="bg-white rounded-2xl border-2 border-red-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-3">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-blue-600">
                  {formatNumber(realTimeData.totalPageViews)}
                </p>
                <p className="text-sm text-gray-600">Visualizações</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+8% vs ontem</span>
            </div>
          </div>

          {/* Average Session Duration */}
          <div className="bg-white rounded-2xl border-2 border-red-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full p-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-purple-600">
                  {realTimeData.avgSessionDuration}
                </p>
                <p className="text-sm text-gray-600">Tempo Médio</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+5% vs ontem</span>
            </div>
          </div>

          {/* Top Performing Page */}
          <div className="bg-white rounded-2xl border-2 border-red-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-green-600 truncate">
                  {realTimeData.topPerformingPage}
                </p>
                <p className="text-sm text-gray-600">Página Top</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-semibold">Mais acessada</span>
            </div>
          </div>
        </div>

        {/* Pages Analytics Table */}
        <div className="bg-white rounded-2xl border-2 border-red-200 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
            <h2 className="text-2xl font-black text-white mb-2">
              Analytics Detalhado por Página
            </h2>
            <p className="text-red-100">
              Dados organizados por categoria e funcionalidade
            </p>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <RefreshCw className="w-6 h-6 text-red-600 animate-spin" />
                  <span className="text-gray-600 font-semibold">Carregando dados...</span>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {organizePagesByCategory(analyticsData).map(([categoryKey, category]) => {
                  const isExpanded = expandedCategories.includes(categoryKey);
                  const CategoryIcon = category.icon;
                  
                  return (
                    <div key={categoryKey} className="space-y-4">
                      
                      {/* Category Header */}
                      <div 
                        onClick={() => toggleCategory(categoryKey)}
                        className="cursor-pointer group"
                      >
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 hover:border-gray-300 rounded-xl p-4 transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {/* Category Icon */}
                              <div className={`bg-gradient-to-r ${category.color} rounded-full p-3 shadow-lg`}>
                                <CategoryIcon className="w-6 h-6 text-white" />
                              </div>
                              
                              {/* Category Info */}
                              <div>
                                <h3 className="text-xl font-black text-gray-800 group-hover:text-gray-900">
                                  {category.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  {category.pages.length} página{category.pages.length !== 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                            
                            {/* Expand/Collapse + Summary Stats */}
                            <div className="flex items-center space-x-4">
                              {/* Quick Stats */}
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4 text-red-600" />
                                  <span className="font-bold text-red-600">
                                    {category.pages.reduce((sum, page) => sum + page.onlineUsers, 0)}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4 text-blue-600" />
                                  <span className="font-bold text-blue-600">
                                    {formatNumber(category.pages.reduce((sum, page) => sum + page.totalViews, 0))}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Expand Icon */}
                              <div className="bg-white rounded-full p-2 shadow-sm group-hover:shadow-md transition-all duration-300">
                                {isExpanded ? (
                                  <ChevronDown className="w-5 h-5 text-gray-600" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-gray-600" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Category Pages */}
                      {isExpanded && (
                        <div className="ml-4 space-y-6">
                          {category.pages.map((page, index) => (
                            <div key={page.path} className="border-2 border-gray-200 rounded-xl p-6 hover:border-red-300 transition-all duration-300 bg-white shadow-sm hover:shadow-md">
                              
                              {/* Page Header */}
                              <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                  <div className={`bg-gradient-to-r ${category.color} rounded-full p-3 shadow-lg`}>
                                    <CategoryIcon className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="text-xl font-bold text-gray-800">{page.name}</h4>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <code className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-mono">
                                        {page.slug}
                                      </code>
                                      <div className={`w-2 h-2 rounded-full ${
                                        page.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                      }`}></div>
                                      <span className={`text-sm font-semibold ${
                                        page.status === 'active' ? 'text-green-600' : 'text-gray-500'
                                      }`}>
                                        {page.status === 'active' ? 'Ativa' : 'Inativa'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <p className="text-sm text-gray-500">Última atualização</p>
                                  <p className="text-sm font-semibold text-gray-700">{page.lastUpdated}</p>
                                </div>
                              </div>

                              {/* Metrics Grid */}
                              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                                
                                {/* Online Users */}
                                <div className="bg-red-50 rounded-xl p-4 text-center">
                                  <div className="flex items-center justify-center mb-2">
                                    <Users className="w-5 h-5 text-red-600" />
                                  </div>
                                  <p className="text-2xl font-black text-red-600">{page.onlineUsers}</p>
                                  <p className="text-xs text-red-700 font-semibold">Online Agora</p>
                                </div>

                                {/* Total Views */}
                                <div className="bg-blue-50 rounded-xl p-4 text-center">
                                  <div className="flex items-center justify-center mb-2">
                                    <Eye className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <p className="text-2xl font-black text-blue-600">{formatNumber(page.totalViews)}</p>
                                  <p className="text-xs text-blue-700 font-semibold">Visualizações</p>
                                </div>

                                {/* Avg Time */}
                                <div className="bg-purple-50 rounded-xl p-4 text-center">
                                  <div className="flex items-center justify-center mb-2">
                                    <Clock className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <p className="text-2xl font-black text-purple-600">{page.avgTimeOnPage}</p>
                                  <p className="text-xs text-purple-700 font-semibold">Tempo Médio</p>
                                </div>

                                {/* Bounce Rate */}
                                <div className="bg-orange-50 rounded-xl p-4 text-center">
                                  <div className="flex items-center justify-center mb-2">
                                    <AlertCircle className="w-5 h-5 text-orange-600" />
                                  </div>
                                  <p className="text-2xl font-black text-orange-600">{page.bounceRate}%</p>
                                  <p className="text-xs text-orange-700 font-semibold">Taxa Rejeição</p>
                                </div>

                                {/* Conversion Rate */}
                                <div className="bg-green-50 rounded-xl p-4 text-center">
                                  <div className="flex items-center justify-center mb-2">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                  </div>
                                  <p className="text-2xl font-black text-green-600">{page.conversionRate}%</p>
                                  <p className="text-xs text-green-700 font-semibold">Conversão</p>
                                </div>

                                {/* Device Breakdown */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                  <div className="flex items-center justify-center mb-2">
                                    <div className="flex space-x-1">
                                      <Smartphone className="w-4 h-4 text-gray-600" />
                                      <Monitor className="w-4 h-4 text-gray-600" />
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-600">Mobile</span>
                                      <span className="font-bold text-gray-800">{page.deviceBreakdown.mobile}%</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-600">Desktop</span>
                                      <span className="font-bold text-gray-800">{page.deviceBreakdown.desktop}%</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-600">Tablet</span>
                                      <span className="font-bold text-gray-800">{page.deviceBreakdown.tablet}%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Device Breakdown Visual */}
                              <div className="bg-gray-50 rounded-xl p-4">
                                <h4 className="text-sm font-bold text-gray-700 mb-3">Distribuição por Dispositivo</h4>
                                <div className="flex rounded-lg overflow-hidden h-3">
                                  <div 
                                    className="bg-gradient-to-r from-blue-500 to-blue-600" 
                                    style={{ width: `${page.deviceBreakdown.mobile}%` }}
                                  ></div>
                                  <div 
                                    className="bg-gradient-to-r from-green-500 to-green-600" 
                                    style={{ width: `${page.deviceBreakdown.desktop}%` }}
                                  ></div>
                                  <div 
                                    className="bg-gradient-to-r from-purple-500 to-purple-600" 
                                    style={{ width: `${page.deviceBreakdown.tablet}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between mt-2 text-xs">
                                  <span className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-gray-600">Mobile ({page.deviceBreakdown.mobile}%)</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-600">Desktop ({page.deviceBreakdown.desktop}%)</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span className="text-gray-600">Tablet ({page.deviceBreakdown.tablet}%)</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Nota:</strong> Dashboard organizado por categorias para melhor visualização. Clique nas categorias para expandir/recolher.
            </p>
            <p className="text-xs text-gray-500">
              Os dados são simulados para demonstração. Em produção, conecte com Google Analytics, Mixpanel ou similar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;