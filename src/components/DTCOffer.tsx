import React, { useState, useEffect } from 'react';
import { Star, Shield, Truck, Clock, MousePointer2, ChevronDown, ChevronUp, Plane, Pill, FileText } from 'lucide-react';
import { preserveUTMParams } from '../utils/urlUtils';
import OfferPopup from './OfferPopup';
import TestimonialTabs from './TestimonialTabs';
import DoctorTestimonials from './DoctorTestimonials';
import MedicalAdvisoryBoard from './MedicalAdvisoryBoard';
import JournalTestimonials from './JournalTestimonials';
import GuaranteeSection from './GuaranteeSection';
import FAQSection from './FAQSection';

const DTCOffer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'1bottle' | '3bottle'>('1bottle');
  const [isBonusOpen, setIsBonusOpen] = useState(false);
  const [isBonus2Open, setIsBonus2Open] = useState(false);
  const [isBonus3Open, setIsBonus3Open] = useState(false);
  const [availableBottles, setAvailableBottles] = useState(87);
  const [isDecreasing, setIsDecreasing] = useState(false);

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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isBonusOpen) return;

    let timeoutId: NodeJS.Timeout;

    const scheduleNextUpdate = () => {
      // Intervalos mais variados e dinâmicos: 1.5s a 6s
      const intervalOptions = [1500, 2000, 2500, 3000, 4000, 5000, 6000];
      const randomInterval = intervalOptions[Math.floor(Math.random() * intervalOptions.length)];

      timeoutId = setTimeout(() => {
        setIsDecreasing(true);

        setAvailableBottles(prev => {
          if (prev <= 10) return prev;

          // Diminuição mais agressiva baseada na quantidade atual
          let decreaseOptions;
          if (prev > 50) {
            // Acima de 50: diminui de 2-7 bottles
            decreaseOptions = [2, 3, 4, 5, 6, 7];
          } else if (prev > 30) {
            // Entre 30-50: diminui de 1-5 bottles
            decreaseOptions = [1, 2, 3, 4, 5];
          } else if (prev > 20) {
            // Entre 20-30: diminui de 1-3 bottles
            decreaseOptions = [1, 2, 3];
          } else {
            // Abaixo de 20: diminui de 1-2 bottles (mais devagar para manter tensão)
            decreaseOptions = [1, 1, 2];
          }

          const randomDecrease = decreaseOptions[Math.floor(Math.random() * decreaseOptions.length)];
          return Math.max(10, prev - randomDecrease);
        });

        // Remove animação após 600ms
        setTimeout(() => setIsDecreasing(false), 600);
        scheduleNextUpdate();
      }, randomInterval);
    };

    scheduleNextUpdate();

    return () => clearTimeout(timeoutId);
  }, [isBonusOpen]);

  const scrollToDTC = () => {
    const dtcElement = document.getElementById('dtc-offers');
    if (dtcElement) {
      dtcElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="mt-6 w-full max-w-sm space-y-4" id="dtc-offers">
      
      {/* Main 6 Bottle Package */}
      <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 relative">
        
        {/* Best Value Sticker - Positioned over the red design */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="relative">
            {/* Main sticker body */}
            <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-3 border-yellow-300 relative z-30">
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-4 h-4 text-yellow-900 fill-yellow-900 animate-pulse flex-shrink-0" />
                <span className="text-yellow-900 font-black text-sm tracking-wider whitespace-nowrap">BEST VALUE</span>
                <Star className="w-4 h-4 text-yellow-900 fill-yellow-900 animate-pulse flex-shrink-0" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            
            {/* Sticker shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl pointer-events-none z-40"></div>
            
            {/* Enhanced shadow layer */}
            <div className="absolute inset-0 bg-black/20 rounded-2xl blur-md transform translate-y-1 -z-10"></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-3xl p-6 shadow-2xl border-4 border-red-400/30 relative overflow-hidden z-10">
          
          {/* Product Image */}
          <div className="mt-4 mb-4 flex justify-center">
            <img
              src="/MAX-6-BOTTLE.png"
              alt="Max Testorin 6 Bottle Package"
              className="w-full max-w-[320px] h-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Product Title */}
          <div className="text-center mb-3">
            <h2 className="text-3xl font-black text-white mb-1 tracking-wide">MAX TESTORIN</h2>
            <p className="text-white/90 font-bold text-lg tracking-wide">6 BOTTLE PACKAGE</p>
          </div>

          {/* Savings */}
          <div className="text-center mb-4">
            <p className="text-yellow-300 font-bold text-lg">YOU'RE SAVING $900</p>
          </div>

          {/* CTA Button */}
          <a 
            href={getPreservedURL()}
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-yellow-900 font-black text-xl py-5 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200 mb-4 border-2 border-yellow-200 text-center"
          >
            CLAIM OFFER NOW
          </a>

          {/* Price Info */}
          <div className="text-center mb-4">
            <p className="text-white/90 text-sm">only $49 per bottle, $294 total</p>
          </div>

          {/* Features */}
          <div className="flex justify-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <div className="bg-white/20 rounded-full p-1">
                <Clock className="w-3 h-3 text-white" />
              </div>
              <span className="text-white text-xs font-medium">180-Day</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="bg-white/20 rounded-full p-1">
                <Truck className="w-3 h-3 text-white" />
              </div>
              <span className="text-white text-xs font-medium">Free Ship</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="bg-white/20 rounded-full p-1">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <span className="text-white text-xs font-medium">Secure</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl p-3 flex justify-center">
            <img 
              src="https://i.postimg.cc/JnFP3y0p/1in1oo5.png" 
              alt="Payment Methods" 
              className="h-12 object-contain"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-8 left-3 w-12 h-12 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 right-3 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* 3 Bottle and 1 Bottle Packages - Side by Side */}
      <div className="flex justify-center space-x-3">
        
        {/* 3 Bottle Package */}
        <div className="bg-gradient-to-br from-red-400 via-red-500 to-red-700 rounded-2xl p-3 pb-2 shadow-2xl border-4 border-red-300/30 relative overflow-hidden w-44 flex flex-col h-72">
          
          {/* Product Image */}
          <div className="mb-2 flex justify-center flex-shrink-0">
            <img
              src="/MAX-3-BOTTLE (1).png"
              alt="Max Testorin 3 Bottle Package"
              className="w-28 h-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Product Title */}
          <div className="text-center mb-3 flex-shrink-0">
            <h2 className="text-base font-black text-white mb-0.5 tracking-wide">MAX TESTORIN</h2>
            <p className="text-white/90 font-bold text-xs tracking-wide">3 BOTTLE PACKAGE</p>
          </div>

          {/* Savings */}
          <div className="text-center mb-4 flex-shrink-0">
            <p className="text-yellow-300 font-bold text-sm">SAVE $398</p>
          </div>

          {/* CTA Button */}
          <a 
            href={getPreservedURL()}
            onClick={(e) => handleShowOfferPopup(e, '3bottle')}
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-black font-black text-sm py-3 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-200 mb-4 border-2 border-yellow-200 flex-shrink-0 text-center"
          >
            BUY NOW
          </a>

          {/* Price Info */}
          <div className="text-center flex-shrink-0">
            <p className="text-white/90 text-xs">$66 per bottle</p>
            <p className="text-white/90 text-xs">$198 total</p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-4 left-2 w-8 h-8 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 right-2 w-10 h-10 bg-yellow-400/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* 1 Bottle Package */}
        <div className="bg-gradient-to-br from-red-400 via-red-500 to-red-700 rounded-2xl p-3 pb-2 shadow-2xl border-4 border-red-300/30 relative overflow-hidden w-44 flex flex-col h-72">
          
          {/* Product Image */}
          <div className="mb-2 flex justify-center flex-shrink-0">
            <img
              src="/MAX-1-BOTTLE (1).png"
              alt="Max Testorin 1 Bottle Package"
              className="w-16 h-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Product Title */}
          <div className="text-center mb-3 flex-shrink-0">
            <h2 className="text-base font-black text-white mb-0.5 tracking-wide">MAX TESTORIN</h2>
            <p className="text-white/90 font-bold text-xs tracking-wide">1 BOTTLE PACKAGE</p>
          </div>

          {/* Savings */}
          <div className="text-center mb-4 flex-shrink-0">
            <p className="text-yellow-300 font-bold text-sm">SAVE $309</p>
          </div>

          {/* CTA Button */}
          <a 
            href={getPreservedURL()}
            onClick={(e) => handleShowOfferPopup(e, '1bottle')}
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-black font-black text-sm py-3 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-200 mb-4 border-2 border-yellow-200 flex-shrink-0 text-center"
          >
            BUY NOW
          </a>

          {/* Price Info */}
          <div className="text-center flex-shrink-0">
            <p className="text-white/90 text-xs">$79 + $9.99 ship</p>
            <p className="text-white/90 text-xs">$89 total</p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-4 left-2 w-8 h-8 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 right-2 w-10 h-10 bg-yellow-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Headline Section Below DTCs */}
      <div className="mt-8 w-full max-w-md text-center space-y-4">
        {/* Small white spacing above headline */}
        <div className="h-16 bg-white"></div>
        
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-red-800 via-red-600 to-red-400 bg-clip-text text-transparent leading-tight drop-shadow-sm">
            Clinically Reviewed.
          </h1>
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-700 via-red-500 to-red-300 bg-clip-text text-transparent leading-tight drop-shadow-sm">
            Doctor Approved.
          </h3>
          <h3 className="text-xl md:text-2xl font-bold text-red-600 leading-tight">
            What Doctors Say About <span className="font-black">Max Testorin</span>
          </h3>
        </div>

        {/* Small white spacing below header */}
        <div className="h-4 bg-white"></div>

        {/* Doctor Testimonials */}
        <DoctorTestimonials />
        {/* Additional White Space */}
        <div className="my-8 w-full">
          <div className="h-12 bg-white"></div>
        </div>

        {/* Treatment Button Above Clinically Reviewed */}
        <div className="mt-8 mb-12 text-center">
          {/* Red shadow behind button */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-red-400/30 rounded-xl blur-md transform scale-105 animate-bounce"></div>
            
            <button
              onClick={scrollToDTC}
              className="relative group bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-bold text-base py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-red-400/30 overflow-hidden animate-bounce max-w-sm"
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-700/20"></div>
              
              {/* Button text */}
              <span className="relative z-10 tracking-wide flex items-center justify-center space-x-2">
                <MousePointer2 className="w-5 h-5" />
                <span className="whitespace-nowrap">START MY TREATMENT NOW</span>
              </span>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>

        {/* Headline Medica - Moved from below */}
        <div className="mt-8 w-full max-w-md mx-auto text-center space-y-4">
          {/* Small white spacing above Clinically Reviewed */}
          <div className="h-6 bg-white"></div>
          
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-red-800 via-red-600 to-red-400 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              No empty promises.
            </h1>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-700 via-red-500 to-red-300 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              See the real results.
            </h3>
            <h3 className="text-xl md:text-2xl font-bold text-red-600 leading-tight">
              Hear what real men are saying about <span className="font-black">Max Testorin.</span>
            </h3>
          </div>
        </div>

        {/* Testimonial Tabs Section */}

        {/* White spacing */}
        <div className="my-12 w-full">
          <div className="h-6 bg-white"></div>
        </div>

        <TestimonialTabs />

        {/* Additional White Space After Second Testimonial */}
        <div className="my-8 w-full">
          <div className="h-8 bg-white"></div>
        </div>

        {/* Medical Advisory Board Section */}
        <MedicalAdvisoryBoard onStartTreatment={scrollToDTC} />

        {/* Headline Jornal - Below Tap to button */}
        <div className="mt-16 w-full max-w-md mx-auto text-center space-y-4">
          {/* Small white spacing above Headline Jornal */}
          <div className="h-6 bg-white"></div>
          
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-800 via-red-600 to-red-400 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              Featured In
            </h1>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-700 via-red-500 to-red-300 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              Major News Networks
            </h3>
            <h3 className="text-xl md:text-2xl font-bold text-red-600 leading-tight">
              Leading Health Publications Cover <span className="font-black">Max Testorin</span>
            </h3>
          </div>
        </div>

        {/* Journal Testimonials Section */}
        <div className="my-8 w-full">
          <div className="h-6 bg-white"></div>
        </div>

        <JournalTestimonials />

        {/* Guarantee Section */}
        <div className="my-8 w-full">
          <div className="h-6 bg-white"></div>
        </div>

        <GuaranteeSection />

        {/* Bonus Section - 6 Bottle Package */}
        <div className="mt-16 w-full max-w-2xl mx-auto">
          {/* Small white spacing above Exclusive Bonuses */}
          <div className="h-6 bg-white"></div>

          {/* Title above the bonus section */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-800 via-red-600 to-red-400 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              Exclusive Bonuses
            </h1>
            <div className="h-4"></div>
            <h3 className="text-xl md:text-2xl font-bold text-red-600 leading-tight">
              When You Secure the 6-Bottle Package Today
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Collapsible Header */}
            <button
              onClick={() => {
                setIsBonusOpen(!isBonusOpen);
                if (!isBonusOpen) {
                  setIsBonus2Open(false);
                  setIsBonus3Open(false);
                }
              }}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full p-2">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    BONUS #1
                  </p>
                  <p className="text-sm text-gray-600">
                    Trip to Fernando de Noronha
                  </p>
                </div>
              </div>
              {isBonusOpen ? (
                <ChevronUp className="w-6 h-6 text-gray-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-500" />
              )}
            </button>

            {/* Collapsible Content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isBonusOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Bonus Image */}
                <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg">
                  <img
                    src="https://i.postimg.cc/3Nbc1GQT/onde-ficar-em-fernando-de-noronha.jpg"
                    alt="Fernando de Noronha"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* White spacing below image */}
                <div className="h-4"></div>

                <div className="flex flex-col items-center justify-center space-y-3">
                  {availableBottles > 30 ? (
                    <div className={`relative bg-gradient-to-br from-white to-gray-50 rounded-xl px-6 py-4 shadow-md border border-gray-200 transition-all duration-300 ${
                      isDecreasing ? 'scale-105 shadow-lg' : 'scale-100'
                    }`}>
                      {/* Live Badge */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 px-3 py-1 rounded-full shadow-lg flex items-center space-x-1.5">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-xs font-bold uppercase tracking-wide">Live</span>
                      </div>

                      <div className="flex items-center justify-center space-x-3 mt-2">
                        <div className="flex flex-col items-center">
                          <span className={`text-4xl font-black text-gray-800 transition-all duration-300 ${
                            isDecreasing ? 'scale-110' : ''
                          }`}>{availableBottles}</span>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Bottles Available</span>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  ) : availableBottles > 20 ? (
                    <div className={`relative bg-gradient-to-br from-orange-50 to-white rounded-xl px-6 py-4 shadow-lg border-2 border-orange-300 transition-all duration-300 ${
                      isDecreasing ? 'scale-105 shadow-xl' : 'scale-100'
                    }`}>
                      {/* Live Badge - Orange */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full shadow-lg flex items-center space-x-1.5">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-xs font-bold uppercase tracking-wide">Live</span>
                      </div>

                      <div className="flex items-center justify-center space-x-3 mt-2">
                        <div className="flex flex-col items-center">
                          <span className={`text-4xl font-black bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent transition-all duration-300 ${
                            isDecreasing ? 'scale-110' : ''
                          }`}>{availableBottles}</span>
                          <span className="text-xs font-semibold text-orange-700 uppercase tracking-wider mt-1">Bottles Left</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent rounded-xl pointer-events-none"></div>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  ) : availableBottles > 15 ? (
                    <div className={`relative bg-gradient-to-br from-yellow-50 via-white to-yellow-50 rounded-xl px-8 py-5 shadow-xl border-2 border-yellow-400 transition-all duration-300 ${
                      isDecreasing ? 'scale-105 shadow-2xl' : 'scale-100'
                    }`}>
                      {/* Live Badge - Yellow/Warning */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-yellow-500 px-3 py-1 rounded-full shadow-xl flex items-center space-x-1.5 animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-xs font-bold uppercase tracking-wide">Live</span>
                      </div>

                      <div className="flex items-center justify-center space-x-3 mt-2">
                        <div className="flex flex-col items-center">
                          <div className="flex items-baseline space-x-2">
                            <span className={`text-5xl font-black bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent transition-all duration-300 ${
                              isDecreasing ? 'scale-110' : ''
                            }`}>{availableBottles}</span>
                            <span className="text-lg font-bold text-yellow-700">only</span>
                          </div>
                          <span className="text-xs font-bold text-yellow-800 uppercase tracking-wider mt-1.5">Limited Stock</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10 rounded-xl pointer-events-none animate-pulse"></div>
                      <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50"></div>
                    </div>
                  ) : (
                    <div className="relative">
                      {/* Live Badge - Critical Red with Ping - OUTSIDE the box */}
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-30">
                        <div className="relative">
                          <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-75"></div>
                          <div className="relative bg-gradient-to-r from-red-600 to-red-500 px-3 py-1 rounded-full shadow-2xl flex items-center space-x-1.5">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="text-white text-xs font-bold uppercase tracking-wide">Live</span>
                          </div>
                        </div>
                      </div>

                      <div className={`bg-gradient-to-br from-red-50 via-white to-amber-50 rounded-xl px-8 py-6 shadow-2xl border-2 border-red-400 transition-all duration-300 overflow-hidden ${
                        isDecreasing ? 'scale-105' : 'scale-100'
                      }`}>
                        <div className="relative z-10 flex items-center justify-center space-x-4 mt-2">
                          <div className="flex flex-col items-center">
                            <div className="flex items-baseline space-x-2 mb-1">
                              <span className={`text-5xl font-black bg-gradient-to-r from-red-600 via-red-500 to-amber-600 bg-clip-text text-transparent transition-all duration-300 ${
                                isDecreasing ? 'scale-110' : ''
                              }`}>{availableBottles}</span>
                            </div>
                            <span className="text-sm font-bold text-red-700 uppercase tracking-wider">Final Units</span>
                            <span className="text-xs font-semibold text-gray-600 mt-1">Act now before stock runs out</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-amber-500/10 rounded-xl pointer-events-none animate-pulse"></div>
                        <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 text-center font-semibold">
                  Exclusive for the first 100 buyers of the 6-bottle package
                </p>

                <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                  <p>
                    Crystal-clear waters, paradise beaches… and by your side, your woman can't keep her hands off you. Not because of the scenery, but because of <span className="font-semibold text-gray-900">the man you've become</span>.
                  </p>

                  <p>
                    The man who, not long ago, was called <span className="font-semibold text-red-600">"impotent"</span> — and now is the very <span className="font-semibold text-emerald-600">embodiment of virility</span>.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="font-semibold text-gray-800 text-center text-sm">
                      This isn't just any prize.
                    </p>
                    <p className="text-gray-700 text-center mt-2 text-sm">
                      It's the celebration of your new masculinity — living proof that you've destroyed the <span className="font-semibold text-red-600">"Erection Thief"</span> and regained full control of your body and your pleasure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BONUS #2 - Red Pill */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-4">
            {/* Collapsible Header */}
            <button
              onClick={() => {
                setIsBonus2Open(!isBonus2Open);
                if (!isBonus2Open) {
                  setIsBonusOpen(false);
                  setIsBonus3Open(false);
                }
              }}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-full p-2">
                  <Pill className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    BONUS #2
                  </p>
                  <p className="text-sm text-gray-600">
                    Red Pill
                  </p>
                </div>
              </div>
              {isBonus2Open ? (
                <ChevronUp className="w-6 h-6 text-gray-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-500" />
              )}
            </button>

            {/* Collapsible Content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isBonus2Open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Bonus Image */}
                <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg bg-white flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/d0BCXkJc/redwhite-capsules-isolated-on-white-260nw-1696358266-Photoroom.png"
                    alt="Red Pill"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 text-center text-sm">
                      3x the power of other Max Testosterin pills — with prolonged hours of performance like a true virile man who can rise to the occasion anytime he wants, defying biology and age itself.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bonus #3 - PDF Power Protocol */}
          <div className="border-2 border-gray-200 rounded-lg bg-white shadow-md overflow-hidden mt-6">
            <button
              onClick={() => {
                setIsBonus3Open(!isBonus3Open);
                if (!isBonus3Open) {
                  setIsBonusOpen(false);
                  setIsBonus2Open(false);
                }
              }}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-full p-2">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                    BONUS #3
                  </p>
                  <p className="text-sm text-gray-600">
                    PDF – The Full Potency Protocol
                  </p>
                </div>
              </div>
              {isBonus3Open ? (
                <ChevronUp className="w-6 h-6 text-gray-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-500" />
              )}
            </button>

            {/* Collapsible Content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isBonus3Open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Bonus Image */}
                <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg bg-white flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/FsCNP9tf/pngtree-pdf-file-icon-png-png-image-4899509-Photoroom.png"
                    alt="PDF Power Protocol"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>

                <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 text-center text-sm">
                      Imagine waking up overflowing with energy… with the same fire and drive you had at 20. The Total Power Protocol is a confidential PDF created by Dr. Diego — revealing the step-by-step daily routine that enhances the effects of Max Testorin by up to 3x.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Segunda Headline Featured In - Abaixo da GuaranteeSection */}
        <div className="mt-16 w-full max-w-md mx-auto text-center space-y-4">
          {/* Small white spacing above second Featured In */}
          <div className="h-8 bg-white"></div>
          
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-800 via-red-600 to-red-400 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              Your new version starts now
            </h1>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-700 via-red-500 to-red-300 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              Let's go?
            </h3>
            
            {/* Small white spacing between Let's go? and Choose your package */}
            <div className="h-4 bg-white"></div>
            
            <h3 className="text-xl md:text-2xl font-bold text-red-600 leading-tight">
              Choose your <span className="font-black">Max Testorin</span> package below
            </h3>
            
            {/* Small white spacing below Choose your package text */}
            <div className="h-4 bg-white"></div>
          </div>
        </div>

        {/* Segunda seção de DTCs - Duplicada */}
        <div className="mt-8 w-full max-w-sm space-y-4">
          
          {/* Main 6 Bottle Package - Duplicado */}
          <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 relative">
            
            {/* Best Value Sticker - Positioned over the red design */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="relative">
                {/* Main sticker body */}
                <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-3 border-yellow-300 relative z-30">
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-900 fill-yellow-900 animate-pulse flex-shrink-0" />
                    <span className="text-yellow-900 font-black text-sm tracking-wider whitespace-nowrap">BEST VALUE</span>
                    <Star className="w-4 h-4 text-yellow-900 fill-yellow-900 animate-pulse flex-shrink-0" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
                
                {/* Sticker shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl pointer-events-none z-40"></div>
                
                {/* Enhanced shadow layer */}
                <div className="absolute inset-0 bg-black/20 rounded-2xl blur-md transform translate-y-1 -z-10"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-3xl p-6 shadow-2xl border-4 border-red-400/30 relative overflow-hidden z-10">
              
              {/* Product Image */}
              <div className="mt-4 mb-4 flex justify-center">
                <img
                  src="/MAX-6-BOTTLE.png"
                  alt="Max Testorin 6 Bottle Package"
                  className="w-full max-w-[320px] h-auto object-contain drop-shadow-lg"
                />
              </div>

              {/* Product Title */}
              <div className="text-center mb-3">
                <h2 className="text-3xl font-black text-white mb-1 tracking-wide">MAX TESTORIN</h2>
                <p className="text-white/90 font-bold text-lg tracking-wide">6 BOTTLE PACKAGE</p>
              </div>

              {/* Savings */}
              <div className="text-center mb-4">
                <p className="text-yellow-300 font-bold text-lg">YOU'RE SAVING $900</p>
              </div>

              {/* CTA Button */}
              <a 
                href={getPreservedURL()}
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-yellow-900 font-black text-xl py-5 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200 mb-4 border-2 border-yellow-200 text-center"
              >
                CLAIM OFFER NOW
              </a>

              {/* Price Info */}
              <div className="text-center mb-4">
                <p className="text-white/90 text-sm">only $49 per bottle, $294 total</p>
              </div>

              {/* Features */}
              <div className="flex justify-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="bg-white/20 rounded-full p-1">
                    <Clock className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white text-xs font-medium">180-Day</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="bg-white/20 rounded-full p-1">
                    <Truck className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white text-xs font-medium">Free Ship</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="bg-white/20 rounded-full p-1">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white text-xs font-medium">Secure</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-xl p-3 flex justify-center">
                <img 
                  src="https://i.postimg.cc/JnFP3y0p/1in1oo5.png" 
                  alt="Payment Methods" 
                  className="h-12 object-contain"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-8 left-3 w-12 h-12 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-8 right-3 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>

          {/* 3 Bottle and 1 Bottle Packages - Side by Side - Duplicado */}
          <div className="flex justify-center space-x-3">
            
            {/* 3 Bottle Package - Duplicado */}
            <div className="bg-gradient-to-br from-red-400 via-red-500 to-red-700 rounded-2xl p-3 pb-2 shadow-2xl border-4 border-red-300/30 relative overflow-hidden w-44 flex flex-col h-72">
              
              {/* Product Image */}
              <div className="mb-2 flex justify-center flex-shrink-0">
                <img
                  src="/MAX-3-BOTTLE (1).png"
                  alt="Max Testorin 3 Bottle Package"
                 className="w-28 h-auto object-contain drop-shadow-lg"
                />
              </div>

              {/* Product Title */}
              <div className="text-center mb-3 flex-shrink-0">
                <h2 className="text-base font-black text-white mb-0.5 tracking-wide">MAX TESTORIN</h2>
                <p className="text-white/90 font-bold text-xs tracking-wide">3 BOTTLE PACKAGE</p>
              </div>

              {/* Savings */}
              <div className="text-center mb-4 flex-shrink-0">
                <p className="text-yellow-300 font-bold text-sm">SAVE $398</p>
              </div>

              {/* CTA Button */}
              <a 
                href={getPreservedURL()}
                onClick={(e) => handleShowOfferPopup(e, '3bottle')}
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-black font-black text-sm py-3 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-200 mb-4 border-2 border-yellow-200 flex-shrink-0 text-center"
              >
                BUY NOW
              </a>

              {/* Price Info */}
              <div className="text-center flex-shrink-0">
                <p className="text-white/90 text-xs">$66 per bottle</p>
                <p className="text-white/90 text-xs">$198 total</p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-4 left-2 w-8 h-8 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 right-2 w-10 h-10 bg-yellow-400/20 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* 1 Bottle Package - Duplicado */}
            <div className="bg-gradient-to-br from-red-400 via-red-500 to-red-700 rounded-2xl p-3 pb-2 shadow-2xl border-4 border-red-300/30 relative overflow-hidden w-44 flex flex-col h-72">
              
              {/* Product Image */}
              <div className="mb-2 flex justify-center flex-shrink-0">
                <img
                  src="/MAX-1-BOTTLE (1).png"
                  alt="Max Testorin 1 Bottle Package"
                  className="w-16 h-auto object-contain drop-shadow-lg"
                />
              </div>

              {/* Product Title */}
              <div className="text-center mb-3 flex-shrink-0">
                <h2 className="text-base font-black text-white mb-0.5 tracking-wide">MAX TESTORIN</h2>
                <p className="text-white/90 font-bold text-xs tracking-wide">1 BOTTLE PACKAGE</p>
              </div>

              {/* Savings */}
              <div className="text-center mb-4 flex-shrink-0">
                <p className="text-yellow-300 font-bold text-sm">SAVE $309</p>
              </div>

              {/* CTA Button */}
              <a 
                href={getPreservedURL()}
                onClick={(e) => handleShowOfferPopup(e, '1bottle')}
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-black font-black text-sm py-3 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-200 mb-4 border-2 border-yellow-200 flex-shrink-0 text-center"
              >
                BUY NOW
              </a>

              {/* Price Info */}
              <div className="text-center flex-shrink-0">
                <p className="text-white/90 text-xs">$79 + $9.99 ship</p>
                <p className="text-white/90 text-xs">$89 total</p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-4 left-2 w-8 h-8 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 right-2 w-10 h-10 bg-yellow-400/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Small white spacing below last DTCs */}
        <div className="h-6 bg-white"></div>
        
        {/* Offer Popup */}
        <OfferPopup
          isOpen={showOfferPopup}
          onClose={() => setShowOfferPopup(false)}
          sixBottleUrl={sixBottleURL}
          oneBottleUrl={selectedPackage === '3bottle' ? threeBottleURL : oneBottleURL}
          selectedPackage={selectedPackage}
        />

        {/* Transformation Section - Minimalista */}
        <div className="mt-12 w-full max-w-md mx-auto">
          <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 shadow-lg relative overflow-hidden">
            
            {/* Content */}
            <div className="relative z-10 text-center space-y-4">
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-red-800 via-red-600 to-red-400 bg-clip-text text-transparent leading-tight">
                Today is the day your transformation begins
              </h1>
              
              <p className="text-gray-600 leading-relaxed text-base">
                They trusted, tried, and approved. Join the thousands of men who chose Max Testorin with total confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Additional spacing above FAQ */}
        <div className="h-10 bg-white"></div>
        <div className="h-1 bg-white"></div>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
};

export default DTCOffer;