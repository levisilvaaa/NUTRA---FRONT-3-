import React, { useState, useEffect } from 'react';
import { Star, Shield, Truck, Clock, MousePointer2 } from 'lucide-react';
import { preserveUTMParams } from '../../utils/urlUtils';
import OneBottleDownsell2OfferPopup from './OneBottleDownsell2OfferPopup';

const OneBottleDownsell2DTC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'1bottle' | '3bottle'>('1bottle');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos = 120 segundos
  const [isExpired, setIsExpired] = useState(false);
  const [showDeclineButton, setShowDeclineButton] = useState(false);
  
  // Base URL for all packages
  const baseURL = 'https://paymaxtestorin.com/checkout/190794031:1';
  
  // URLs for each package
  const sixBottleURL = 'https://paymaxtestorin.com/checkout/190794031:1';
  const threeBottleURL = 'https://paymaxtestorin.com/checkout/190794028:1';
  const oneBottleURL = 'https://paymaxtestorin.com/checkout/190794027:1';
  
  // Get URL with preserved UTM parameters
  const getPreservedURL = () => preserveUTMParams(baseURL);
  
  // Cronômetro de 3 minutos
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

  // Handle popup opening for 1 and 3 bottle packages
  const handleShowOfferPopup = (e: React.MouseEvent, packageType: '1bottle' | '3bottle') => {
    e.preventDefault();
    setSelectedPackage(packageType);
    setShowOfferPopup(true);
  };

  const scrollToDTC = () => {
    const dtcElement = document.getElementById('onebottle-downsell2-dtc-offers');
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
    <div className="mt-6 mb-8 w-full max-w-lg space-y-8" id="onebottle-downsell2-dtc-offers">
      
      {/* Main 9 Bottle Package - Modern White Design */}
      <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 relative">
        
        {/* Best Value Sticker */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="relative">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl px-6 py-3 shadow-xl border border-red-400/30 relative z-30">
              <div className="flex items-center justify-center">
                <span className="text-white font-black text-base tracking-wider whitespace-nowrap">
                  {isExpired ? 'OFFER EXPIRED' : `EXPIRES IN ${formatTime(timeLeft)}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modern White Card Design */}
        <div className="bg-gradient-to-br from-red-50 via-white to-red-50 rounded-3xl p-6 pb-8 shadow-2xl border-2 border-red-100 relative overflow-hidden z-10">
          
          {/* Product Image */}
          <div className="mt-4 mb-4 flex justify-center">
            <img
              src="/Design-sem-nome-3-Photoroom (1).png"
              alt="Max Testorin 4 Bottle Package"
              className="w-full max-w-[100px] h-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Savings */}
          <div className="text-center mb-3">
            <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 rounded-2xl px-6 py-3 shadow-lg" style={{ animation: 'pulse-scale 1s ease-in-out infinite' }}>
              <p className="font-black text-xl text-white tracking-wide whitespace-nowrap">YOU'RE SAVING $99</p>
            </div>
          </div>

          {/* Product Title */}
          <div className="text-center mb-6 space-y-2">
            <div className="h-1 w-32 bg-gradient-to-r from-red-400 to-red-500 mx-auto rounded-full mb-4"></div>
            <p className="text-red-700 font-bold text-lg tracking-wide">
              NO SUBSCRIPTION, ONE-TIME ONLY
            </p>
          </div>

          {/* Price Section */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-4 border border-red-200 shadow-lg">
              <div className="space-y-2">
                <p className="text-red-600 text-sm font-medium uppercase tracking-wider">Special Price</p>
                <p className="text-2xl font-black tracking-wide">
                  <span className="text-black">only</span> <span className="text-green-600">$49</span> <span className="text-black">per bottle</span>
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => window.open(preserveUTMParams('https://paymaxtestorin.com/ex-ocu/next-offer/MdYnrZlYOG?accepted=yes'), '_blank')}
            className="block w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white font-black text-lg py-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 text-center relative overflow-hidden group mb-4"
            style={{
              animation: 'pulse-scale 1s ease-in-out infinite'
            }}
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            
            {/* Button content */}
            <div className="relative z-10 space-y-1">
              <div className="text-xl font-black">ADD 1 BOTTLE WITH A SPECIAL DISCOUNT</div>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>

          {/* Confirmation Text */}
          <div className="text-center mb-4">
            <p className="text-black text-xs font-medium text-center">
              <span className="text-red-600">Attention:</span> By clicking, you confirm your purchase
            </p>
          </div>

          {/* Spacing above secondary button */}
          <div className="h-4"></div>

          {/* Secondary Button */}
          {showDeclineButton && (
            <button
              onClick={() => window.open(preserveUTMParams('https://paymaxtestorin.com/ex-ocu/next-offer/MdYnrZlYOG?accepted=no'), '_blank')}
              className="block w-full bg-transparent border-2 border-red-300 hover:border-red-400 text-red-700 hover:text-red-900 font-bold text-base py-4 rounded-2xl transition-all duration-300 hover:bg-red-50 mb-6 text-center"
            >
              <span className="uppercase tracking-wider">No, Thank You</span>
            </button>
          )}

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-4 left-4 w-16 h-16 bg-red-100 rounded-full blur-xl opacity-30"></div>
            <div className="absolute bottom-4 right-4 w-20 h-20 bg-red-100 rounded-full blur-xl opacity-30"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Offer Popup */}
      <OneBottleDownsell2OfferPopup
        isOpen={showOfferPopup}
        onClose={() => setShowOfferPopup(false)}
        sixBottleUrl={sixBottleURL}
        oneBottleUrl={selectedPackage === '3bottle' ? threeBottleURL : oneBottleURL}
        selectedPackage={selectedPackage}
      />
    </div>
  );
};

export default OneBottleDownsell2DTC;