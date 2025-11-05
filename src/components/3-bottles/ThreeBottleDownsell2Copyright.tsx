import React from 'react';

const ThreeBottleDownsell2Copyright = () => {
  return (
    <div className="mt-8 w-full max-w-lg mx-auto">
      {/* Combined Copyright and FDA Disclaimer Section */}
      <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg relative overflow-hidden">
        
        {/* Content */}
        <div className="relative z-10 text-center space-y-4">
          {/* Copyright Text */}
          <p className="text-red-600 text-sm font-semibold">
            Copyright ©2025 | Max Testorin
          </p>
          <p className="text-red-600 text-sm font-semibold">
            All Rights Reserved
          </p>

          {/* Separator Line */}
          <div className="w-full h-px bg-gray-200 my-4"></div>

          {/* FDA Disclaimer Text */}
          <p className="text-gray-500 text-sm leading-relaxed">
            These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThreeBottleDownsell2Copyright;