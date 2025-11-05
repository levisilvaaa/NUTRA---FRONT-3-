import React, { useState } from 'react';
import { Shield, ChevronDown, ChevronUp } from 'lucide-react';

const GuaranteeSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-12 w-full max-w-md mx-auto">
      
      {/* Guarantee Header - Clickable */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-2 border-gray-200 rounded-2xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden"
      >
        {/* Header content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-2 shadow-md">
              <Shield className="w-6 h-6 text-white" />
            </div>
            
            <div>
              <h3 className="text-xl font-black text-gray-800 tracking-wide">
                180 Days Guarantee
              </h3>
              <p className="text-gray-600 font-semibold text-sm">
                100% money-back guarantee
              </p>
            </div>
          </div>
          
          {/* Toggle Icon */}
          <div className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-2 relative">
          
          <div className="space-y-4">
            
            {/* Main guarantee text - Simplified */}
            <div className="text-center">
              <p className="text-gray-600 leading-relaxed text-base">
                We're so sure you'll experience remarkable results that we back Max Testorin with a 100% satisfaction guarantee for 180 days. Within days of starting, you may notice improved energy levels, enhanced mental clarity, and better overall well-being. Many users report reduced sugar cravings and easier weight management. If after several weeks or even months you're not satisfied, we'll refund your money entirely. You're in control of your health this time.
              </p>
            </div>

            {/* Simple brand signature */}
            <div className="text-center pt-4 border-t border-gray-100">
              <img 
                src="/guarantee-seal.png" 
                alt="180-Day Money Back Guarantee Seal" 
                className="mx-auto h-24 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeSection;