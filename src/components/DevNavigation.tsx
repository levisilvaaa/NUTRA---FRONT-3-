import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, ShoppingCart, Eye, Code, Globe, BarChart3, TrendingUp, TrendingDown, ChevronDown, ChevronRight, Shield } from 'lucide-react';

const DevNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Only show in development environment (Bolt)
  const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname.includes('bolt.new');

  if (!isDevelopment) return null;

  const menuStructure = [
    {
      type: 'page',
      name: 'Main Page',
      path: '/',
      slug: '/',
      icon: Home,
      description: 'Landing page with video and offers',
      color: 'from-red-500 to-red-600'
    },
    {
      type: 'page',
      name: 'Analytics Dashboard',
      path: '/analytics',
      slug: '/analytics',
      icon: BarChart3,
      description: 'Real-time analytics and user monitoring',
      color: 'from-red-700 to-red-800'
    },
    {
      type: 'page',
      name: 'Thank You',
      path: '/thank-you',
      slug: '/thank-you',
      icon: Shield,
      description: 'Order confirmation and app download',
      color: 'from-green-500 to-green-600'
    },
    {
      type: 'folder',
      name: '1-Bottle Pages',
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600',
      children: [
        {
          type: 'page',
          name: 'Upsell-1',
          path: '/1-bottle/upsell-1',
          slug: '/1-bottle/upsell-1',
          icon: TrendingUp,
          description: 'Primeira página de upsell',
          color: 'from-green-500 to-green-600'
        },
        {
          type: 'page',
          name: 'Downsell-1',
          path: '/1-bottle/downsell-1',
          slug: '/1-bottle/downsell-1',
          icon: TrendingDown,
          description: 'Primeira página de downsell',
          color: 'from-orange-500 to-orange-600'
        },
        {
          type: 'page',
          name: 'Downsell-2',
          path: '/1-bottle/downsell-2',
          slug: '/1-bottle/downsell-2',
          icon: TrendingDown,
          description: 'Segunda página de downsell',
          color: 'from-orange-500 to-orange-600'
        }
      ]
    },
    {
      type: 'folder',
      name: '3-Bottles Pages',
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600',
      children: [
        {
          type: 'page',
          name: 'Upsell-1',
          path: '/3-bottles/upsell-1',
          slug: '/3-bottles/upsell-1',
          icon: TrendingUp,
          description: 'Primeira página de upsell 3-bottles',
          color: 'from-green-500 to-green-600'
        },
        {
          type: 'page',
          name: 'Upsell-1-Backup',
          path: '/3-bottles/upsell-1-backup',
          slug: '/3-bottles/upsell-1-backup',
          icon: TrendingUp,
          description: 'Backup da primeira página de upsell 3-bottles',
          color: 'from-green-500 to-green-600'
        },
        {
          type: 'page',
          name: 'Downsell-1',
          path: '/3-bottles/downsell-1',
          slug: '/3-bottles/downsell-1',
          icon: TrendingDown,
          description: 'Primeira página de downsell 3-bottles',
          color: 'from-orange-500 to-orange-600'
        },
        {
          type: 'page',
          name: 'Downsell-2',
          path: '/3-bottles/downsell-2',
          slug: '/3-bottles/downsell-2',
          icon: TrendingDown,
          description: 'Segunda página de downsell 3-bottles',
          color: 'from-orange-500 to-orange-600'
        }
      ]
    },
    {
      type: 'folder',
      name: '6-Bottles Pages',
      icon: ShoppingCart,
      color: 'from-indigo-500 to-indigo-600',
      children: [
        {
          type: 'page',
          name: 'Upsell-1',
          path: '/6-bottles/upsell-1',
          slug: '/6-bottles/upsell-1',
          icon: TrendingUp,
          description: 'Primeira página de upsell 6-bottles',
          color: 'from-green-500 to-green-600'
        },
        {
          type: 'page',
          name: 'Upsell-1-Backup',
          path: '/6-bottles/upsell-1-backup',
          slug: '/6-bottles/upsell-1-backup',
          icon: TrendingUp,
          description: 'Backup da primeira página de upsell 6-bottles',
          color: 'from-green-500 to-green-600'
        },
        {
          type: 'page',
          name: 'Downsell-1',
          path: '/6-bottles/downsell-1',
          slug: '/6-bottles/downsell-1',
          icon: TrendingDown,
          description: 'Primeira página de downsell 6-bottles',
          color: 'from-orange-500 to-orange-600'
        }
        // TODO: Add more 6-bottles pages here as they are created
      ]
    }
  ];

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(name => name !== folderName)
        : [...prev, folderName]
    );
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  // Encontrar a página atual em toda a estrutura
  const findCurrentPage = (items: any[]): any => {
    for (const item of items) {
      if (item.type === 'page' && item.path === location.pathname) {
        return item;
      }
      if (item.type === 'folder' && item.children) {
        const found = item.children.find((child: any) => child.path === location.pathname);
        if (found) return found;
      }
    }
    return null;
  };

  const currentPage = findCurrentPage(menuStructure);

  return (
    <>
      {/* Fixed Menu Button - Red Design */}
      <div className="fixed top-4 right-4 z-[9999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 border border-red-500/30"
          title="Development Navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Menu - Minimalist Red Design */}
      {isOpen && (
        <div className="fixed inset-0 z-[9998] flex items-start justify-end pt-16 pr-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9997]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel - Ultra Minimalist Design */}
          <div className="relative bg-white rounded-xl shadow-xl border border-red-200 p-4 max-w-xs w-full max-h-[80vh] overflow-hidden flex flex-col z-[9999]">
            
            {/* Header - Ultra Minimalist */}
            <div className="mb-4 text-center flex-shrink-0">
              <div className="inline-flex items-center space-x-2 bg-red-50 rounded-lg px-3 py-1.5 mb-2">
                <Code className="w-3 h-3 text-red-600" />
                <span className="text-red-800 font-semibold text-xs">PAGES</span>
              </div>
              
              {/* Protection Status */}
              <div className="inline-flex items-center space-x-2 bg-orange-50 rounded-lg px-3 py-1.5 mb-2 ml-2">
                <Shield className="w-3 h-3 text-orange-600" />
                <span className="text-orange-800 font-semibold text-xs">ULTRA PROTECTED</span>
              </div>
            </div>

            {/* Current Page Indicator - Minimal */}
            <div className="mb-3 p-3 bg-red-50 rounded-lg border border-red-100 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="bg-red-500 rounded-full p-1">
                  <Eye className="w-3 h-3 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-red-700 font-semibold text-sm">
                    {currentPage?.name || 'Unknown'}
                  </p>
                  <p className="text-red-600 text-xs font-mono">
                    {location.pathname}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Links - Scrollable Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-2">
                {menuStructure.map((item) => {
                  if (item.type === 'page') {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavigate(item.path)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 border group ${
                          isActive
                            ? 'bg-red-500 text-white border-red-500 shadow-md'
                            : 'bg-white hover:bg-red-50 text-gray-800 border-red-100 hover:border-red-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {/* Icon */}
                          <div className={`rounded-md p-1.5 ${
                            isActive 
                              ? 'bg-white/20' 
                              : 'bg-red-100 group-hover:bg-red-200'
                          }`}>
                            <Icon className={`w-4 h-4 ${
                              isActive ? 'text-white' : 'text-red-600'
                            }`} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-semibold text-sm ${
                                isActive ? 'text-white' : 'text-gray-800'
                              }`}>
                                {item.name}
                              </h4>
                              
                              {isActive && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            
                            {/* Slug Display */}
                            <code className={`text-xs font-mono ${
                              isActive 
                                ? 'text-red-100' 
                                : 'text-red-600'
                            }`}>
                              {item.slug}
                            </code>
                          </div>
                        </div>
                      </button>
                    );
                  }

                  if (item.type === 'folder') {
                    const Icon = item.icon;
                    const isExpanded = expandedFolders.includes(item.name);
                    const hasActiveChild = item.children?.some((child: any) => child.path === location.pathname);
                    
                    return (
                      <div key={item.name} className="space-y-1">
                        {/* Folder Header */}
                        <button
                          onClick={() => toggleFolder(item.name)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 border group ${
                            hasActiveChild
                              ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 shadow-sm'
                              : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {/* Expand/Collapse Icon */}
                            <div className="rounded-md p-1.5 bg-gray-100 group-hover:bg-gray-200">
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-gray-600" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-gray-600" />
                              )}
                            </div>
                            
                            {/* Folder Icon */}
                            <div className={`rounded-md p-1.5 ${
                              hasActiveChild 
                                ? 'bg-red-100' 
                                : 'bg-gray-100 group-hover:bg-gray-200'
                            }`}>
                              <Icon className={`w-4 h-4 ${
                                hasActiveChild ? 'text-red-600' : 'text-gray-600'
                              }`} />
                            </div>
                            
                            {/* Folder Name */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className={`font-semibold text-sm ${
                                  hasActiveChild ? 'text-red-800' : 'text-gray-800'
                                }`}>
                                  {item.name}
                                </h4>
                                
                                {/* Child count badge */}
                                <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                  hasActiveChild 
                                    ? 'bg-red-200 text-red-800' 
                                    : 'bg-gray-200 text-gray-600'
                                }`}>
                                  {item.children?.length || 0}
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>

                        {/* Folder Children */}
                        {isExpanded && item.children && (
                          <div className="ml-6 space-y-1 border-l-2 border-gray-200 pl-4">
                            {item.children.length === 0 ? (
                              <div className="p-3 text-center text-gray-500 text-sm italic bg-gray-50 rounded-lg border border-gray-200">
                                Nenhuma página ainda
                              </div>
                            ) : (
                              item.children.map((child: any) => {
                                const ChildIcon = child.icon;
                                const isActive = location.pathname === child.path;
                                
                                return (
                                  <button
                                    key={child.path}
                                    onClick={() => handleNavigate(child.path)}
                                    className={`w-full text-left p-2.5 rounded-lg transition-all duration-200 border group ${
                                      isActive
                                        ? 'bg-red-500 text-white border-red-500 shadow-md'
                                        : 'bg-white hover:bg-red-50 text-gray-800 border-red-100 hover:border-red-200'
                                    }`}
                                  >
                                    <div className="flex items-center space-x-3">
                                      {/* Child Icon */}
                                      <div className={`rounded-md p-1 ${
                                        isActive 
                                          ? 'bg-white/20' 
                                          : 'bg-red-100 group-hover:bg-red-200'
                                      }`}>
                                        <ChildIcon className={`w-3.5 h-3.5 ${
                                          isActive ? 'text-white' : 'text-red-600'
                                        }`} />
                                      </div>
                                      
                                      {/* Child Content */}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                          <h5 className={`font-medium text-sm ${
                                            isActive ? 'text-white' : 'text-gray-800'
                                          }`}>
                                            {child.name}
                                          </h5>
                                          
                                          {isActive && (
                                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                          )}
                                        </div>
                                        
                                        {/* Child Slug */}
                                        <code className={`text-xs font-mono ${
                                          isActive 
                                            ? 'text-red-100' 
                                            : 'text-red-600'
                                        }`}>
                                          {child.slug}
                                        </code>
                                      </div>
                                    </div>
                                  </button>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
              
            {/* Footer - Ultra Minimal */}
            <div className="pt-3 border-t border-red-100 flex-shrink-0">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DevNavigation;