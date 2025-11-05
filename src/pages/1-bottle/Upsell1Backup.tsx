import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Volume2, Maximize2, AlertTriangle } from 'lucide-react';
import { OneBottleUpsell1DTC, OneBottleUpsell1Copyright } from '../../components/1-bottle';
import { analyticsTracker } from '../../utils/analyticsTracker';

function Upsell1Backup() {


  // Track page views automatically
  useEffect(() => {
    // Track this page view
    analyticsTracker.trackPageView('/1-bottle/upsell-1-backup');
  }, []);
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
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent leading-tight mb-4">
            Join the<br />Max Testorin Club
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            Keep your potency at its peak
          </h2>

          <p className="text-base md:text-lg text-gray-700 mb-3 leading-relaxed">
            Subscribe to Max Testorin and receive your treatment every month, right at your doorstep, worry-free.
          </p>
        </div>

        {/* DTC Offer with all content below */}
        <OneBottleUpsell1DTC />

        {/* White space above Copyright - Increased */}
        <div className="h-8 bg-white"></div>
        <div className="h-8 bg-white"></div>

        {/* Copyright Section */}
        <OneBottleUpsell1Copyright />
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

export default Upsell1Backup;
