import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Volume2, Maximize2, AlertTriangle } from 'lucide-react';
import { ThreeBottleUpsell1DTC, ThreeBottleUpsell1Copyright } from '../../components/3-bottles';
import { analyticsTracker } from '../../utils/analyticsTracker';

function Upsell1() {


  // Track page views automatically
  useEffect(() => {
    // Track this page view
    analyticsTracker.trackPageView('/3-bottles/upsell-1');

    // Track Meta Pixel custom event
    if (typeof window.fbq !== 'undefined') {
      window.fbq('trackCustom', 'ViewUpsell', {
        offer_type: 'Upsell',
        product_name: 'Max Testorin - 3 or 6 Bottles Upgrade'
      });
    }
  }, []);
  return (
    <>
      <Helmet>
        <link rel="preload" href="https://scripts.converteai.net/f5ab9e88-cc1b-4dce-a537-c7de7e019d8b/players/69042b458687c6f8d6f4860f/v4/embed.html" />
        <script>{`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}</script>
        <link rel="preload" href="https://scripts.converteai.net/f5ab9e88-cc1b-4dce-a537-c7de7e019d8b/players/69042b458687c6f8d6f4860f/v4/player.js" as="script" />
        <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
        <link rel="preload" href="https://cdn.converteai.net/f5ab9e88-cc1b-4dce-a537-c7de7e019d8b/69042b2766bcfa8a2160c424/main.m3u8" as="fetch" />
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Fixed Header Alert */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#ec3131] py-3 px-4 shadow-lg">
        <div className="flex items-center justify-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
          <span className="text-white font-black text-sm md:text-base tracking-wide text-center">
            WAIT! YOUR ORDER IS NOT COMPLETE
          </span>
          <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
        </div>
      </div>
      
      {/* Main Content with top padding to account for fixed header */}
      <div className="flex items-center justify-center p-4 pt-20">
      <div className="flex flex-col items-center max-w-md w-full">
        
        {/* New Logo */}
        <img 
          src="/MAX-LOGO copy.png" 
          alt="Max Testorin Logo" 
          className="w-28 h-auto mx-auto mt-0 mb-8"
        />
        
        {/* Headline Section */}
        <div className="text-center mb-2">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent leading-tight mb-4">
            <span style={{ color: '#fd0000' }}>You are one step away from</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-red-800 bg-clip-text text-transparent mb-4 -mt-4">
            <span className="bg-gradient-to-r from-red-700 via-red-500 to-red-800 bg-clip-text text-transparent">the complete treatment</span>
          </h2>
          
          <p className="text-lg bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 bg-clip-text text-transparent mb-4 font-medium">
            <span className="text-black font-normal text-base">See the importance of completing your full cycle and achieving maximum results</span>
          </p>
        </div>

        {/* Video Container */}
        <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden" 
             style={{ 
               width: '100%', 
               maxWidth: '360px',
               aspectRatio: '1290/720'
             }}>
        
          {/* Vturb Video Player */}
          <div className="relative w-full h-full">
            <iframe
              src="https://scripts.converteai.net/f5ab9e88-cc1b-4dce-a537-c7de7e019d8b/players/69042b458687c6f8d6f4860f/v4/embed.html"
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
        <div className="mt-6 w-full max-w-sm bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-3 shadow-lg">
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 rounded-full p-1">
                <Volume2 className="w-4 h-4 text-white" />
              </div>
              <p className="text-blue-800 font-semibold text-sm">
                Please make sure your sound is on
              </p>
            </div>
            
            <p className="text-blue-800 font-semibold text-sm text-center">
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
                <span className="whitespace-nowrap">Your order is not complete yet!</span>
              </p>
            </div>
            
            <p className="text-red-800 font-medium text-xs text-center">
              Watch the quick video above to finalize your order
            </p>
          </div>
        </div>

        {/* Small white spacing below Alert section */}
        <div className="h-4 bg-white"></div>

        {/* DTC Offer with all content below */}
        <ThreeBottleUpsell1DTC />

        {/* White space above Copyright - Increased */}
        <div className="h-8 bg-white"></div>
        <div className="h-8 bg-white"></div>

        {/* Copyright Section */}
        <ThreeBottleUpsell1Copyright />
      </div>
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
}

export default Upsell1;