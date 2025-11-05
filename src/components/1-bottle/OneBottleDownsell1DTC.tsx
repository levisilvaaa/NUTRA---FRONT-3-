import React, { useState, useEffect } from 'react';
import { Star, Shield, Truck, Clock, MousePointer2 } from 'lucide-react';
import { preserveUTMParams } from '../../utils/urlUtils';
import OneBottleDownsell1OfferPopup from './OneBottleDownsell1OfferPopup';
import OneBottleDownsell1CommentsChat from './OneBottleDownsell1CommentsChat';

const OneBottleDownsell1DTC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'1bottle' | '3bottle'>('1bottle');
  const [showDeclineButton, setShowDeclineButton] = useState(false);
  
  // Base URL for all packages
  const baseURL = 'https://paymaxtestorin.com/checkout/190794031:1';
  
  // URLs for each package
  const sixBottleURL = 'https://paymaxtestorin.com/checkout/190794031:1';
  const threeBottleURL = 'https://paymaxtestorin.com/checkout/190794028:1';
  const oneBottleURL = 'https://paymaxtestorin.com/checkout/190794027:1';
  
  // Get URL with preserved UTM parameters
  const getPreservedURL = () => preserveUTMParams(baseURL);
  
  // Handle accept offer (ADD 8 MORE BOTTLES)
  const handleAcceptOffer = () => {
    window.open(preserveUTMParams('https://paymaxtestorin.com/ex-ocu/next-offer/MdYnrZlYOG?accepted=yes'), '_blank');
  };

  // Handle decline offer (DO NOT COMPLETE TREATMENT)
  const handleDeclineOffer = () => {
    window.open(preserveUTMParams('https://paymaxtestorin.com/ex-ocu/next-offer/MdYnrZlYOG?accepted=no'), '_blank');
  };

  // Handle popup opening for 1 and 3 bottle packages
  const handleShowOfferPopup = (e: React.MouseEvent, packageType: '1bottle' | '3bottle') => {
    e.preventDefault();
    setSelectedPackage(packageType);
    setShowOfferPopup(true);
  };

  const scrollToDTC = () => {
    const dtcElement = document.getElementById('onebottle-downsell1-dtc-offers');
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
    <div className="mt-6 mb-8 w-full max-w-sm space-y-4" id="onebottle-downsell1-dtc-offers">
      
      {/* Main 6 Bottle Package - Downsell1 with Golden Background */}
      <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 relative">
        
        {/* Best Value Sticker - Positioned over the golden design */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="relative">
            {/* Main sticker body */}
            <div className="bg-gradient-to-br from-[#ee2a2a] via-[#ee2a2a] to-[#ee2a2a] rounded-2xl px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-3 border-[#ee2a2a] relative z-30 animate-[pulse_1s_ease-in-out_infinite]" style={{ animation: 'pulse-scale 1s ease-in-out infinite' }}>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-white font-black text-base tracking-wider whitespace-nowrap">LAST CHANCE</span>
              </div>
            </div>
            
            {/* Sticker shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl pointer-events-none z-40"></div>
            
            {/* Enhanced shadow layer */}
            <div className="absolute inset-0 bg-black/20 rounded-2xl blur-md transform translate-y-1 -z-10"></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl p-6 pb-8 shadow-2xl border-4 border-blue-200/30 relative overflow-hidden z-10">
          
          {/* Product Image */}
          <div className="mt-4 mb-4 flex justify-center">
            <img
              src="/Design-sem-nome-4-1.png"
              alt="Max Testorin 9 Bottle Package"
              className="w-full max-w-[200px] h-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Savings */}
          <div className="text-center mb-3">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl px-6 py-3 shadow-lg">
              <p className="font-black text-xl text-black tracking-wide whitespace-nowrap">YOU'RE SAVING $142</p>
            </div>
          </div>

          {/* Product Title */}
          <div className="text-center mb-3">
            <h2 className="text-3xl font-black text-gray-900 mb-1 tracking-wide">MAX TESTORIN</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-700 font-bold text-sm tracking-wide mb-4">NO SUBSCRIPTION, ONE-TIME ONLY</p>
          </div>

          {/* Price Info - Moved above CTA */}
          <div className="text-center mb-10 mt-10">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200 shadow-lg">
              <div className="space-y-2">
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Special Price</p>
                <p className="text-gray-900 text-xl font-black tracking-wide">
                  only $49 per bottle
                </p>
                <p className="text-xl font-bold">
                  Total <span className="text-red-600 line-through">$240</span> for just <span className="text-green-600">$98</span>
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleAcceptOffer}
            className="w-full bg-gradient-to-br from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white font-bold text-base py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200 mb-4 text-center animate-[pulse_1s_ease-in-out_infinite]"
            style={{
              animation: 'pulse-scale 1s ease-in-out infinite'
            }}
          >
            ADD 2 MORE BOTTLES FOR $98
          </button>

          {/* Confirmation Text */}
          <div className="text-center mb-4">
            <p className="text-black text-xs font-medium text-center">
              <span className="text-red-600">Attention:</span> By clicking, you confirm your purchase
            </p>
          </div>

          {/* Spacing above secondary button */}
          <div className="h-4"></div>

          {/* Secondary Button - DO NOT COMPLETE TREATMENT */}
          {showDeclineButton && (
            <div className="text-center mb-4">
              <button
                onClick={handleDeclineOffer}
               className="w-full bg-transparent border-2 hover:border-[#ff1919] text-[#ff1919] hover:text-[#ff1919] font-bold text-sm py-4 rounded-2xl transition-all duration-200 hover:bg-red-50"
               style={{ borderColor: '#ff1919', color: '#ff1919' }}
              >
                DO NOT COMPLETE TREATMENT
              </button>
            </div>
          )}

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-4 left-4 w-16 h-16 bg-red-100 rounded-full blur-xl opacity-30"></div>
            <div className="absolute bottom-4 right-4 w-20 h-20 bg-yellow-100 rounded-full blur-xl opacity-30"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gray-100 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Comments Chat Section */}
      <div className="mt-12">
        <OneBottleDownsell1CommentsChat />
      </div>

      {/* Offer Popup */}
      <OneBottleDownsell1OfferPopup
        isOpen={showOfferPopup}
        onClose={() => setShowOfferPopup(false)}
        sixBottleUrl={sixBottleURL}
        oneBottleUrl={selectedPackage === '3bottle' ? threeBottleURL : oneBottleURL}
        selectedPackage={selectedPackage}
      />
    </div>
  );
};

export default OneBottleDownsell1DTC;