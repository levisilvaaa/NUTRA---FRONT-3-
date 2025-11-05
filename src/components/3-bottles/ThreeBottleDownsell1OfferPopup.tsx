import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Clock } from 'lucide-react';
import { preserveUTMParams } from '../../utils/urlUtils';

interface ThreeBottleDownsell1OfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
  sixBottleUrl: string;
  oneBottleUrl: string;
  selectedPackage: '1bottle' | '3bottle';
}

const ThreeBottleDownsell1OfferPopup: React.FC<ThreeBottleDownsell1OfferPopupProps> = ({
  isOpen,
  onClose,
  sixBottleUrl,
  oneBottleUrl,
  selectedPackage
}) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const redirectExecutedRef = useRef(false);

  // Dynamic text based on selected package
  const getPopupTexts = () => {
    if (selectedPackage === '3bottle') {
      return {
        savingsAmount: '$102',
        headline: "Wait! You're Leaving $102 Behind...",
        offerTitle: "Choose the 6 Bottle Pack now and save an extra $102!",
        ctaButton: "GET $102 EXTRA DISCOUNT"
      };
    } else {
      return {
        savingsAmount: '$240',
        headline: "Wait! You're Leaving $240 Behind...",
        offerTitle: "Choose the 6 Bottle Pack now and save an extra $240!",
        ctaButton: "GET $240 EXTRA DISCOUNT"
      };
    }
  };

  const popupTexts = getPopupTexts();

  // Robust redirect function with multiple fallbacks
  const executeRedirect = useCallback(() => {
    if (redirectExecutedRef.current) return; // Prevent multiple redirects
    
    redirectExecutedRef.current = true;
    
    try {
      const targetUrl = preserveUTMParams(oneBottleUrl);
      
      // Primary method: window.open
      const newWindow = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      
      // Fallback 1: If popup blocked, try window.location
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        setTimeout(() => {
          try {
            window.location.href = targetUrl;
          } catch (error) {
            console.error('Redirect fallback 1 failed:', error);
            // Fallback 2: Create and click a link
            try {
              const link = document.createElement('a');
              link.href = targetUrl;
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } catch (linkError) {
              console.error('Redirect fallback 2 failed:', linkError);
              // Final fallback: Alert user
              alert(`Please visit: ${targetUrl}`);
            }
          }
        }, 100);
      }
      
      // Close popup after redirect attempt
      setTimeout(() => {
        onClose();
      }, 500);
      
    } catch (error) {
      console.error('Redirect failed:', error);
      // Emergency fallback
      try {
        window.location.href = oneBottleUrl;
      } catch (emergencyError) {
        console.error('Emergency redirect failed:', emergencyError);
        alert(`Please visit: ${oneBottleUrl}`);
      }
      onClose();
    }
  }, [oneBottleUrl, onClose]);

  useEffect(() => {
    // Reset redirect flag when popup opens
    if (isOpen) {
      redirectExecutedRef.current = false;
    }
    
    if (!isOpen) {
      setTimeLeft(20);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Execute robust redirect
          executeRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen, executeRedirect]);
  
  // Additional cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleAcceptOffer = () => {
    // Clear timer when user accepts offer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    window.open(preserveUTMParams(sixBottleUrl), '_blank');
    onClose();
  };

  const handleRefuseOffer = () => {
    // Clear timer when user refuses offer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    window.open(preserveUTMParams(oneBottleUrl), '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 p-2 sm:p-4 min-h-screen w-full">
      {/* Backdrop */}
      <div className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-sm" onClick={executeRedirect} />
      
      {/* Popup Content */}
      <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-2 sm:border-4 border-red-400/30 max-w-sm sm:max-w-md w-full mx-2 sm:mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={executeRedirect}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-white/20 hover:bg-white/30 rounded-full p-1.5 sm:p-2 transition-all duration-200 z-10"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        {/* Timer Section */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <span className="text-yellow-300 font-black text-base sm:text-xl">
              This offer expires in {timeLeft} seconds
            </span>
          </div>
          
          <p className="text-white/80 text-xs sm:text-sm font-medium leading-relaxed">
            If no action is taken, you'll be redirected to your original selection
          </p>
        </div>

        {/* Main Offer Content */}
        <div className="text-center mb-4 sm:mb-6">
          {/* Main Alert Message */}
          <div className="mb-3 sm:mb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2 sm:mb-3">
              {popupTexts.headline}
            </h2>
          </div>
          
          {/* Offer Details */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 border border-white/20">
            <h3 className="text-lg sm:text-xl font-black text-yellow-300 mb-2 sm:mb-3 leading-tight">
              {popupTexts.offerTitle}
            </h3>
            
            <p className="text-white font-medium text-sm sm:text-base leading-relaxed">
              It's the most popular choice for long-term results — and it includes free shipping + a 180-day guarantee.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          {/* Primary Button */}
          <button
            onClick={handleAcceptOffer}
            className="w-full bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-yellow-900 font-black text-lg sm:text-xl py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-yellow-200 relative overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10">{popupTexts.ctaButton}</span>
          </button>

          {/* Secondary Button */}
          <button
            onClick={handleRefuseOffer}
            className="w-full bg-transparent border-2 border-white/40 hover:border-white/60 text-white font-bold text-base sm:text-lg py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-200 hover:bg-white/10"
          >
            Refuse Offer
          </button>
        </div>

        {/* Bottom Message */}
        <div className="text-center mb-3">
          <p className="text-white/60 text-xs">
            No action needed - we'll redirect you automatically
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-4 sm:top-8 left-2 sm:left-3 w-8 sm:w-12 h-8 sm:h-12 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 sm:bottom-8 right-2 sm:right-3 w-12 sm:w-16 h-12 sm:h-16 bg-yellow-400/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-24 sm:h-32 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Timer Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 sm:h-2 bg-white/20 rounded-b-2xl sm:rounded-b-3xl overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ease-linear relative"
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          >
            {/* Progress bar glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 blur-sm opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeBottleDownsell1OfferPopup;