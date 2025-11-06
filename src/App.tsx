import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Volume2, Maximize2, AlertTriangle } from 'lucide-react';
import DTCOffer from './components/DTCOffer';
import { getActiveVideo } from './config/videoConfig';
import { useVturbPlayer } from './hooks/useVturbPlayer';
import Analytics from './pages/Analytics';
import DevNavigation from './components/DevNavigation';
import TestingPanel from './components/TestingPanel';
import ThankYou from './pages/ThankYou';
import { analyticsTracker } from './utils/analyticsTracker';
import { brazilProtection } from './utils/brazilProtection';
import { preserveUTMParams } from './utils/urlUtils';

// 1-Bottle pages
import { Upsell1, Upsell1Backup, Downsell1, Downsell2 } from './pages/1-bottle';

// 3-Bottles pages
import { Upsell1 as ThreeBottleUpsell1, Upsell1Backup as ThreeBottleUpsell1Backup, Downsell1 as ThreeBottleDownsell1, Downsell2 as ThreeBottleDownsell2 } from './pages/3-bottles';

// 6-Bottles pages
import { Upsell1 as SixBottleUpsell1, Upsell1Backup as SixBottleUpsell1Backup, Downsell1 as SixBottleDownsell1 } from './pages/6-bottles';

function App() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationComplete, setVerificationComplete] = useState(false);

  // Proteção - apenas usuários dos EUA - EXECUÇÃO IMEDIATA
  useEffect(() => {
    const runProtection = async () => {
      // Lista de páginas sem proteção
      const unprotectedPages = [
        '/analytics',
        '/thank-you',
        '/1-bottle/upsell-1',
        '/1-bottle/upsell-1-backup',
        '/1-bottle/downsell-1',
        '/1-bottle/downsell-2',
        '/3-bottles/upsell-1',
        '/3-bottles/upsell-1-backup',
        '/3-bottles/downsell-1',
        '/3-bottles/downsell-2',
        '/6-bottles/upsell-1',
        '/6-bottles/upsell-1-backup',
        '/6-bottles/downsell-1'
      ];

      const currentPath = window.location.pathname;
      const isUnprotectedPage = unprotectedPages.includes(currentPath);

      if (isUnprotectedPage) {
        // Páginas sem proteção - liberar acesso imediatamente
        setVerificationComplete(true);
        setIsVerifying(false);
        return;
      }

      try {
        // Inicialização imediata
        const isBlocked = await brazilProtection.initialize();

        if (!isBlocked) {
          // Se não foi bloqueado, libera acesso permanentemente
          setTimeout(() => {
            setVerificationComplete(true);
            setIsVerifying(false);
          }, 50);
        }
        // Se foi bloqueado, o usuário já foi redirecionado
      } catch (error) {
        console.error('Erro na proteção - Bloqueando por segurança:', error);
        // Em caso de erro, redireciona por segurança
        setTimeout(() => {
          window.location.href = preserveUTMParams('https://vitaegold.com.br/suplementos-naturais-vitae7-1/');
        }, 1000);
      }
    };

    runProtection();
  }, []);

  // Track page views automatically
  useEffect(() => {
    if (!verificationComplete) return;

    // Initialize analytics
    const trackCurrentPage = () => {
      const currentPath = window.location.pathname;
      analyticsTracker.trackPageView(currentPath);
    };

    // Track initial page load
    trackCurrentPage();

    // Track route changes
    const handleRouteChange = () => {
      setTimeout(trackCurrentPage, 100); // Small delay to ensure route has changed
    };

    // Listen for popstate (back/forward buttons)
    window.addEventListener('popstate', handleRouteChange);

    // Listen for pushstate/replacestate (programmatic navigation)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      handleRouteChange();
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      handleRouteChange();
    };

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [verificationComplete]);

  // Tela branca durante verificação
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-white"></div>
    );
  }

  // Se chegou aqui, passou em todas as verificações
  const MainPage = () => {
    const activeVideo = getActiveVideo();
    const [showDTCContent, setShowDTCContent] = useState(false);

    // Timer para mostrar DTC após 39 minutos e 5 segundos (2345 segundos)
    useEffect(() => {
      const dtcTimer = setTimeout(() => {
        setShowDTCContent(true);
      }, 2345000); // 2345 segundos = 39 minutos e 5 segundos

      return () => clearTimeout(dtcTimer);
    }, []);

    useEffect(() => {
      if (typeof window.fbq !== 'undefined') {
        window.fbq('track', 'ViewContent', {
          content_name: 'VSL Max Testorin',
          content_category: 'Nutraceutical Funnel',
          page_section: 'VSL'
        });
      }
    }, []);

    return (
    <>
      <Helmet>
        <link rel="preload" href={activeVideo.embedUrl} />
        <script>
          {`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}
        </script>
        <link rel="preload" href={`https://scripts.converteai.net/f5ab9e88-cc1b-4dce-a537-c7de7e019d8b/players/${activeVideo.playerId}/v4/player.js`} as="script" />
        <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
        <link rel="preload" href="https://cdn.converteai.net/f5ab9e88-cc1b-4dce-a537-c7de7e019d8b/690649e5e24c483f7c7a7a34/main.m3u8" as="fetch" />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://images.converteai.net" />
        <link rel="dns-prefetch" href="https://api.vturb.com.br" />
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-subids
          async
          defer
        />
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '844688501573155');
            fbq('track', 'PageView');
          `}
        </script>
      </Helmet>

    {/* Fixed Header */}
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* First Header - Men's Sexual Health */}
      <div style={{ backgroundColor: '#a70100' }} className="py-2">
        <h1 className="text-white text-center font-serif font-bold" style={{ fontSize: '32px' }}>
          Men's Sexual Health
        </h1>
      </div>

      {/* Second Header - Animated News Ticker */}
      <div style={{ backgroundColor: '#8b0100' }} className="overflow-hidden py-1.5">
        <div className="news-ticker">
          <div className="news-ticker-content">
            <span className="text-white text-sm md:text-base font-bold whitespace-nowrap">
              BREAKING NEWS - NEW DISCOVERIES - DAILY UPDATES
            </span>
            <span className="text-white text-sm md:text-base font-bold whitespace-nowrap">
              •
            </span>
            <span className="text-white text-sm md:text-base font-bold whitespace-nowrap">
              BREAKING NEWS - NEW DISCOVERIES - DAILY UPDATES
            </span>
            <span className="text-white text-sm md:text-base font-bold whitespace-nowrap">
              •
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-x-hidden" style={{ paddingTop: '80px' }}>
      <div className="flex flex-col items-center max-w-md w-full">
        
        {/* New Logo */}
        <img 
          src="/MAX-LOGO copy.png" 
          alt="Max Testorin Logo" 
          className="w-28 h-auto mx-auto mt-0 mb-8"
        />
        
        {/* Headline Section */}
        <div className="text-center mb-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent leading-tight mb-1">
            <span style={{ color: '#fd0000' }}>The trick used by</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-red-800 bg-clip-text text-transparent mb-4 -mt-4">
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 -mt-6 bg-gradient-to-r from-red-800 via-red-600 to-red-400 bg-clip-text text-transparent">
            adult film actors
          </h2>

          <p className="text-lg mb-4 font-medium">
            <span className="text-black">How this </span>
            <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 bg-clip-text text-transparent font-black text-xl">
              baking soda trick
            </span>
            <span className="text-black"> produces rock-hard erections instantly?</span>
          </p>

          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="bg-red-600 rounded-full p-2">
              <Play className="w-2 h-2 text-white fill-white" />
            </div>
            <span className="text-sm md:text-base font-bold tracking-wide" style={{ color: '#e70a0a' }}>
              WATCH BELOW AND SEE HOW IT WORKS
            </span>
          </div>
        </div>

        {/* Video Container */}
        <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
             style={{
               width: '100%',
               maxWidth: '360px',
               aspectRatio: '720/1280'
             }}>

          {/* Vturb Video Player */}
          <div className="relative w-full h-full">
            <iframe
              src={activeVideo.embedUrl}
              className="w-full h-full rounded-2xl"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Vturb Video Player"
            />
          </div>

          {/* Reflection Effect */}
          <div className="absolute -bottom-32 left-0 right-0 h-32 bg-gradient-to-b from-gray-900/20 to-transparent rounded-2xl blur-xl -z-10"></div>
        </div>

        {/* Audio Information Box */}
        <div className="mt-6 w-full max-w-sm bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-3 shadow-lg">
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-2">
              <div className="bg-green-500 rounded-full p-1">
                <Volume2 className="w-4 h-4 text-white" />
              </div>
              <p className="text-green-800 font-semibold text-sm">
                Please make sure your sound is on
              </p>
            </div>
            
            <p className="text-green-800 font-semibold text-sm text-center">
            Contains important audio information
            </p>
          </div>
        </div>

        {/* Alert Warning Box */}
        <div className="mt-4 w-full max-w-sm bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-4 shadow-lg">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="text-red-800 font-semibold text-sm">
                <span className="whitespace-nowrap">This video may be taken down at any time</span>
              </p>
            </div>

            <p className="text-red-800 font-medium text-xs text-center">
              Watch now before it's removed from the internet
            </p>
          </div>
        </div>

        {/* Small white spacing below Alert section */}
        <div className="h-4 bg-white"></div>

        {/* DTC Offer with all content below - Aparece após 39min 5seg */}
        {showDTCContent && <DTCOffer />}
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-40"></div>
      </div>
    </div>
    </>
    );
  };

  return (
    <Router>
      <DevNavigation />
      <TestingPanel />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/1-bottle/upsell-1" element={<Upsell1 />} />
        <Route path="/1-bottle/upsell-1-backup" element={<Upsell1Backup />} />
        <Route path="/1-bottle/downsell-1" element={<Downsell1 />} />
        <Route path="/1-bottle/downsell-2" element={<Downsell2 />} />
        <Route path="/3-bottles/upsell-1" element={<ThreeBottleUpsell1 />} />
        <Route path="/3-bottles/upsell-1-backup" element={<ThreeBottleUpsell1Backup />} />
        <Route path="/3-bottles/downsell-1" element={<ThreeBottleDownsell1 />} />
        <Route path="/3-bottles/downsell-2" element={<ThreeBottleDownsell2 />} />
        <Route path="/6-bottles/upsell-1" element={<SixBottleUpsell1 />} />
        <Route path="/6-bottles/upsell-1-backup" element={<SixBottleUpsell1Backup />} />
        <Route path="/6-bottles/downsell-1" element={<SixBottleDownsell1 />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;