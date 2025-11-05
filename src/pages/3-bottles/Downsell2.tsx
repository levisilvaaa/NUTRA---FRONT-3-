import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Volume2, Maximize2, AlertTriangle, Clock, Zap } from 'lucide-react';
import { ThreeBottleDownsell2DTC, ThreeBottleDownsell2Copyright } from '../../components/3-bottles';
import { analyticsTracker } from '../../utils/analyticsTracker';
import DevNavigation from '../../components/DevNavigation';
import TestingPanel from '../../components/TestingPanel';

function Downsell2() {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos = 120 segundos
  const [isExpired, setIsExpired] = useState(false);


  // Track page views automatically
  useEffect(() => {
    // Track this page view
    analyticsTracker.trackPageView('/3-bottles/downsell-2');
  }, []);

  // Cronômetro de 2 minutos
  useEffect(() => {
    if (isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired]);

  // Formatar tempo para exibição
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Determinar cor do cronômetro baseado no tempo restante
  const getTimerColor = () => {
    return 'from-red-500 to-red-600'; // Sempre vermelho
  };

  return (
    <>
      <Helmet>
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
        <script src="https://assets.mycartpanda.com/cartx-ecomm-ui-assets/js/libs/ocu-external.js"></script>
        <script>
          {`
            document.addEventListener('DOMContentLoaded', function() {
              if (typeof OcuExternal !== 'undefined') {
                new OcuExternal();
              }
            });
          `}
        </script>
      </Helmet>
      <DevNavigation />
      <TestingPanel />
      <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Cronômetro Fixo no Topo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3">
          {!isExpired ? (
            <div className="flex items-center justify-center space-x-3">
              <div className={`bg-gradient-to-r ${getTimerColor()} rounded-full p-2`}>
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <div className={`text-2xl font-black bg-gradient-to-r ${getTimerColor()} bg-clip-text text-transparent`}>
                  {formatTime(timeLeft)}
                </div>
                <div className="text-xs font-semibold text-gray-600 -mt-1">
                  {timeLeft <= 60 ? 'HURRY UP!' : 'Limited Time'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-800">
                  Special Offer
                </div>
                <div className="text-xs text-gray-600">
                  Expires Soon
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-3 animate-pulse">
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-full p-2">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <div className="text-lg font-black text-red-600">
                  OFFER EXPIRED
                </div>
                <div className="text-xs font-semibold text-red-500">
                  Page going offline...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4 pt-24">
        <div className="flex flex-col items-center max-w-md w-full">
        
          {/* Modern Logo */}
          <img 
            src="/MAX-LOGO copy.png" 
            alt="Max Testorin Logo" 
            className="w-28 h-auto mx-auto mt-0 mb-8"
          />
        
          {/* Modern Headline Section */}
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent leading-tight">
              The choice is
              <span className="block bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent">
                yours!
              </span>
            </h1>
            
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                But what about
                <span className="text-yellow-600 font-bold"> 4 bottles with a huge discount</span>
                ? Are you going to let that
                <span className="text-red-600 font-bold"> slip away too</span>
                ?
              </h2>
            </div>
          </div>


          {/* DTC Offer with all content below */}
          <ThreeBottleDownsell2DTC />

          {/* Space above Copyright */}
          <div className="h-16"></div>

          {/* Copyright Section */}
          <ThreeBottleDownsell2Copyright />
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gray-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-40"></div>
      </div>
    </div>
    </>
  );
}

export default Downsell2;