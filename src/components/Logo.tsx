import React from 'react';
import { Crown } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      {/* Horse Crown Icon with gradient background */}
      <div className="relative">
        <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-xl p-3 shadow-lg transform -rotate-12">
          <Crown className="w-8 h-8 text-white fill-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-pulse delay-500"></div>
      </div>
      
      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-black bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent tracking-tight transform hover:scale-105 transition-transform duration-300">
            MAX
          </span>
          <span className="text-3xl font-black bg-gradient-to-r from-red-700 via-red-800 to-red-900 bg-clip-text text-transparent tracking-tight transform hover:scale-105 transition-transform duration-300">
            TESTORIN
          </span>
        </div>
        <div className="h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-full mt-1 shadow-sm animate-pulse"></div>
        <div className="text-xs font-bold text-red-600/70 tracking-widest mt-1 text-center">
          ADVANCED FORMULA
        </div>
      </div>
    </div>
  );
};

export default Logo;