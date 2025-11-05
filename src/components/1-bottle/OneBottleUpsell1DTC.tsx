import React, { useState, useEffect } from 'react';
import { Star, Shield, Truck, Clock, MousePointer2, AlertTriangle } from 'lucide-react';
import { preserveUTMParams } from '../../utils/urlUtils';
import OneBottleUpsell1OfferPopup from './OneBottleUpsell1OfferPopup';

const OneBottleUpsell1DTC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'1bottle' | '3bottle'>('1bottle');
  const [showDeclineButton, setShowDeclineButton] = useState(false);
  
  // One-Click Upsell URLs
  const acceptedURL = 'https://paymaxtestorin.com/ex-ocu/next-offer/MdYnrZlYOG?accepted=yes';
  const declinedURL = 'https://paymaxtestorin.com/ex-ocu/next-offer/MdYnrZlYOG?accepted=no';
  
  // Get URLs with preserved UTM parameters for one-click functionality
  const getAcceptedURL = () => preserveUTMParams(acceptedURL);
  const getDeclinedURL = () => preserveUTMParams(declinedURL);
  
  // Handle popup opening for 1 and 3 bottle packages
  const handleShowOfferPopup = (e: React.MouseEvent, packageType: '1bottle' | '3bottle') => {
    e.preventDefault();
    setSelectedPackage(packageType);
    setShowOfferPopup(true);
  };

  // Handle accept offer (ADD 8 MORE BOTTLES)
  const handleAcceptOffer = () => {
    window.open(getAcceptedURL(), '_blank');
  };

  // Handle decline offer (DO NOT COMPLETE TREATMENT)
  const handleDeclineOffer = () => {
    window.open(getDeclinedURL(), '_blank');
  };
  const scrollToDTC = () => {
    const dtcElement = document.getElementById('onebottle-dtc-offers');
    if (dtcElement) {
      dtcElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDeclineButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="mt-6 w-full max-w-sm space-y-4" id="onebottle-dtc-offers">
      
      {/* Subscription Package - Optimized for Conversion */}
      <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 relative">

        {/* Discount Badge */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="relative">
            <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-3 border-green-300 relative z-30">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-white font-black text-base tracking-wider whitespace-nowrap">GET 22% OFF FOR LIFE</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl pointer-events-none z-40"></div>
            <div className="absolute inset-0 bg-black/20 rounded-2xl blur-md transform translate-y-1 -z-10"></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-3xl p-8 pb-8 shadow-2xl border-4 border-red-400/30 relative overflow-hidden z-10">

          {/* Product Image and Pricing Section */}
          <div className="mt-8 mb-6 flex items-center gap-2">
            {/* Product Image */}
            <div className="flex-shrink-0 -ml-2">
              <img
                src="/Design-sem-nome-3-Photoroom.png"
                alt="Max Testorin Monthly Subscription"
                className="w-[80px] h-auto object-contain drop-shadow-lg"
              />
            </div>

            {/* Pricing Comparison */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex-1 -mr-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 text-sm">Regular Price:</span>
                <span className="text-white/60 line-through text-lg font-bold">$89</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/20 pt-2">
                <span className="text-white font-bold text-base">Subscription Price:</span>
                <span className="text-green-300 text-2xl font-black">$69</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-yellow-300 font-bold text-xs">You save $20 every month!</span>
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <p className="text-white text-sm">Never run out of Max Testorin</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <p className="text-white text-sm">Delivered monthly to your door</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <p className="text-white text-sm">Cancel anytime, no questions asked</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <p className="text-white text-sm">22% discount locked in forever</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleAcceptOffer}
            className="relative w-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white font-black text-xl py-6 rounded-2xl shadow-2xl mb-4 overflow-hidden group"
            style={{
              animation: 'pulse-scale 1s ease-in-out infinite'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="relative z-10">
              <span className="block tracking-wide drop-shadow-lg">JOIN THE MAX</span>
              <span className="block tracking-wide drop-shadow-lg">TESTORIN CLUB</span>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-300/0 to-green-800/0 group-hover:from-green-300/10 group-hover:to-green-800/10 transition-all duration-300"></div>
          </button>

          {/* Confirmation Text with Warning Icon */}
          <div className="bg-yellow-500/20 border border-yellow-400/40 rounded-xl p-4 mb-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
              <p className="text-white text-xs leading-relaxed">
                By clicking, you confirm your subscription and authorize monthly renewals.
              </p>
            </div>
          </div>

          {/* Spacing above secondary button */}
          <div className="h-2"></div>

          {/* Secondary Button */}
          {showDeclineButton && (
            <div className="text-center mb-4">
              <button
                onClick={handleDeclineOffer}
                className="w-full bg-transparent border-2 border-white/60 hover:border-white/80 text-white font-bold text-sm py-4 px-4 rounded-2xl transition-all duration-200 hover:bg-white/10"
              >
                NO THANKS, I'LL PASS ON JOINING THE CLUB
              </button>
            </div>
          )}

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-8 left-3 w-12 h-12 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 right-3 w-16 h-16 bg-green-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Offer Popup */}
      <OneBottleUpsell1OfferPopup
        isOpen={showOfferPopup}
        onClose={() => setShowOfferPopup(false)}
        sixBottleUrl={acceptedURL}
        oneBottleUrl={declinedURL}
        selectedPackage={selectedPackage}
      />
    </div>
  );
};

export default OneBottleUpsell1DTC;