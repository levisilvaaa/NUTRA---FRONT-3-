import React from 'react';

const ThreeBottleDownsell1Copyright = () => {
  return (
    <div className="mt-4 w-full max-w-md mx-auto">
      {/* Combined Copyright and FDA Disclaimer Section */}
      <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
        
        {/* Content */}
        <div className="relative z-10 text-center space-y-3">
          {/* Copyright Text */}
          <p className="text-red-600 text-sm font-medium">
            Copyright ©2025 | Max Testorin
          </p>
          <p className="text-red-600 text-sm font-medium mt-1">
            All Rights Reserved
          </p>

          {/* Separator Line */}
          <div className="w-full h-px bg-gray-200 my-3"></div>

          {/* FDA Disclaimer Text */}
          <p className="text-gray-500 text-sm leading-relaxed">
            These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThreeBottleDownsell1Copyright;