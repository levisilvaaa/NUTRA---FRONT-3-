import React, { useState, useEffect } from 'react';
import { Star, Shield, Truck, Clock, MousePointer2 } from 'lucide-react';
import { preserveUTMParams } from '../../utils/urlUtils';
import OfferPopup from '../OfferPopup';

const OneBottleDTCOffer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'1bottle' | '3bottle'>('1bottle');
  
  // Base URL for all packages
  const baseURL = 'https://paymaxtestorin.com/checkout/190794031:1';
  
  // URLs for each package
  const sixBottleURL = 'https://paymaxtestorin.com/checkout/190794031:1';
  const threeBottleURL = 'https://paymaxtestorin.com/checkout/190794028:1';
  const oneBottleURL = 'https://paymaxtestorin.com/checkout/190794027:1';
  
  // Get URL with preserved UTM parameters
  const getPreservedURL = () => preserveUTMParams(baseURL);
  
  // Handle popup opening for 1 and 3 bottle packages
  const handleShowOfferPopup = (e: React.MouseEvent, packageType: '1bottle' | '3bottle') => {
    e.preventDefault();
    setSelectedPackage(packageType);
    setShowOfferPopup(true);
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

  if (!isVisible) return null;

  return (
    <div className="mt-6 w-full max-w-sm space-y-4" id="onebottle-dtc-offers">
      
      {/* Main 6 Bottle Package */}
      <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 relative">
        
        {/* Best Value Sticker - Positioned over the red design */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="relative">
            {/* Main sticker body */}
            <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-3 border-green-300 relative z-30">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-white font-black text-base tracking-wider whitespace-nowrap">FINAL CHANCE</span>
              </div>
            </div>
            
            {/* Sticker shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl pointer-events-none z-40"></div>
            
            {/* Enhanced shadow layer */}
            <div className="absolute inset-0 bg-black/20 rounded-2xl blur-md transform translate-y-1 -z-10"></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-3xl p-6 pb-8 shadow-2xl border-4 border-red-400/30 relative overflow-hidden z-10">
          
          {/* Product Image */}
          <div className="mt-8 mb-8 flex justify-center">
            <img 
              src="/MAX-9-BOTTLE.png" 
              alt="Max Testorin 9 Bottle Package" 
              className="w-full max-w-[320px] h-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Savings */}
          <div className="text-center mb-3">
            <p className="text-yellow-300 font-bold text-xl">YOU'RE SAVING $975</p>
          </div>

          {/* Product Title */}
          <div className="text-center mb-3">
            <h2 className="text-3xl font-black text-white mb-1 tracking-wide">MAX TESTORIN</h2>
            <p className="text-white/90 font-bold text-sm tracking-wide mb-4">COMPLETE 9-MONTHS OF TREATMENT</p>
          </div>

          {/* Price Info - Moved above CTA */}
          <div className="text-center mb-4 mt-10">
            <p className="text-white/90 text-base font-normal">only $40 per bottle, $320 total</p>
          </div>

          {/* CTA Button */}
          <a 
            href={getPreservedURL()}
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-base py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200 mb-4 text-center animate-[pulse_1s_ease-in-out_infinite]"
            style={{
              animation: 'pulse-scale 1s ease-in-out infinite'
            }}
          >
            ADD 8 MORE BOTTLES AND COMPLETE TREATMENT
          </a>

          {/* Secondary Button - DO NOT COMPLETE TREATMENT */}
          <div className="text-center mb-4">
            <button className="w-full bg-transparent border-2 border-white/60 hover:border-white/80 text-white font-bold text-sm py-4 rounded-2xl transition-all duration-200 hover:bg-white/10">
              DO NOT COMPLETE TREATMENT
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-8 left-3 w-12 h-12 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 right-3 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Offer Popup */}
      <OfferPopup
        isOpen={showOfferPopup}
        onClose={() => setShowOfferPopup(false)}
        sixBottleUrl={sixBottleURL}
        oneBottleUrl={selectedPackage === '3bottle' ? threeBottleURL : oneBottleURL}
        selectedPackage={selectedPackage}
      />
    </div>
  );
};

export default OneBottleDTCOffer;