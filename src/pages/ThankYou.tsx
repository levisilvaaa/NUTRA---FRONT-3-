import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Smartphone, Download, Star, Shield, Clock, Gift, ArrowRight, Sparkles, Mail, Phone, Truck } from 'lucide-react';
import { analyticsTracker } from '../utils/analyticsTracker';
import DevNavigation from '../components/DevNavigation';
import TestingPanel from '../components/TestingPanel';

function ThankYou() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const showAppSection = import.meta.env.VITE_SHOW_APP_SECTION === 'true';

  // App images array
  const appImages = [
    'https://i.postimg.cc/1XqXTLmC/MOCKU-HOME2.png',
    'https://i.postimg.cc/bYgtt2dd/MOCKU-PROGRESS.png',
    'https://i.postimg.cc/wTBscTs2/MOCKUP-SHOP.png'
  ];


  // Auto-rotate app images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % appImages.length);
    }, 4000); // 4 seconds - more time to appreciate each image

    return () => clearInterval(interval);
  }, [appImages.length]);

  // Track page views automatically
  useEffect(() => {
    // Track this page view
    analyticsTracker.trackPageView('/thank-you');
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
      <DevNavigation />
      <TestingPanel />
      
      <div className="min-h-screen bg-white overflow-x-hidden">
        
        {/* Fixed White Header with Logo */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
          <div className="flex items-center justify-center py-4 px-4">
            <img 
              src="/MAX-LOGO copy.png" 
              alt="Max Testorin Logo" 
              className="h-12 w-auto"
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex items-center justify-center min-h-screen p-4 pt-24">
          <div className="flex flex-col items-center max-w-md w-full space-y-8">
            
            {/* Thank You Message */}
            <div className="text-center space-y-3 mt-8">
              {/* Thank You with inline icon */}
              <div className="flex items-center justify-center space-x-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  Thank You!
                </h1>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800">
                Your Order is Confirmed
              </h2>
              
              <p className="text-gray-600 leading-relaxed">
                You've taken the first step towards transforming your vitality with 
                <span className="font-bold text-red-600"> Max Testorin</span>.
              </p>
            </div>

            {/* What's Next Card */}
            <div className="w-full bg-gray-50 rounded-2xl p-6 space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-black text-gray-900 mb-2">What Happens Next?</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-base mb-1">Email Confirmation</h4>
                    <p className="text-gray-600 text-sm">You'll receive confirmation within 5 minutes</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Truck className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-base mb-1">Fast Shipping</h4>
                    <p className="text-gray-600 text-sm">Your order ships within 3-5 business days</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-base mb-1">90-Day Guarantee</h4>
                    <p className="text-gray-600 text-sm">Complete money-back guarantee protection</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div className="w-full text-center px-4 py-6">
              <div className="bg-gradient-to-br from-white via-gray-50 to-white border-2 border-gray-100 rounded-2xl px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 inline-block group">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-gray-800 font-bold text-lg">Need Help?</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Our support team is here to assist you
                </p>
                
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText('support@maxtestorin.com');
                    // Modern notification instead of alert
                    const notification = document.createElement('div');
                    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 transition-all duration-300';
                    notification.textContent = '✓ Email copied to clipboard!';
                    document.body.appendChild(notification);
                    setTimeout(() => {
                      notification.style.opacity = '0';
                      setTimeout(() => document.body.removeChild(notification), 300);
                    }, 2000);
                  }}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-red-50 hover:to-red-100 text-gray-700 hover:text-red-700 font-semibold px-6 py-3 rounded-xl transition-all duration-300 border border-gray-200 hover:border-red-200 group-hover:scale-105 transform"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <span>support@maxtestorin.com</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Get Our Exclusive App Section - Controlled by VITE_SHOW_APP_SECTION in .env */}
            {showAppSection && (
              <div className="w-full bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden">

                {/* Exclusive Badge - Inside the section */}
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-full px-6 py-2 shadow-lg border-2 border-yellow-300 relative">
                    <span className="text-yellow-900 font-black text-sm tracking-wider">★ EXCLUSIVE ACCESS ★</span>
                    {/* Badge shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-black text-gray-600 mb-4">
                    Get Our Exclusive App
                  </h2>
                </div>

                {/* App Images Carousel */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-48 h-96 overflow-hidden">
                    {appImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1500 ease-in-out transform ${
                          index === currentImageIndex
                            ? 'opacity-100 scale-100 translate-x-0 rotate-0'
                            : index === (currentImageIndex - 1 + appImages.length) % appImages.length
                            ? 'opacity-0 scale-90 -translate-x-8 -rotate-2'
                            : 'opacity-0 scale-90 translate-x-8 rotate-2'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`App Screenshot ${index + 1}`}
                          className="w-full h-full object-contain drop-shadow-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center space-x-2 mb-6">
                  {appImages.map((_, index) => (
                    <div
                      key={index}
                      className={`rounded-full transition-all duration-500 cursor-pointer hover:scale-110 ${
                        index === currentImageIndex
                          ? 'w-8 h-3 bg-red-500 scale-110 shadow-lg'
                          : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>

                {/* Subtitle */}
                <div className="text-center mb-8">
                  <p className="text-gray-600 text-base font-medium">
                    Track your progress and maximize your results
                  </p>
                </div>

                {/* Download Button */}
                <div className="text-center">
                  <button
                    onClick={() => window.open('https://app.maxtestorin.com/auth/register', '_blank')}
                    className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 font-black text-lg py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-yellow-300 relative overflow-hidden group cursor-pointer"
                    style={{
                      animation: 'pulse-scale 2s ease-in-out infinite'
                    }}
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>ACCESS APP</span>
                    </span>
                  </button>
                </div>

                {/* Subtle decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-red-100 rounded-full blur-xl opacity-30"></div>
                <div className="absolute bottom-4 left-4 w-20 h-20 bg-yellow-100 rounded-full blur-xl opacity-30"></div>
              </div>
            )}

            {/* Social Proof - Minimalist */}
            <div className="w-full text-center space-y-3">
              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-2 text-lg font-bold text-gray-800">4.9/5</span>
              </div>
              
              <p className="text-gray-600 text-sm">
                Over 50,000+ men transformed their lives
              </p>
            </div>

            {/* Footer - Company Rights & Information */}
            <div className="w-full bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-red-600 text-sm font-bold mb-2">
                Copyright ©2025 Max Testorin. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default ThankYou;