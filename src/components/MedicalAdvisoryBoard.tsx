import React from 'react';
import { Shield, CheckCircle, MousePointer2 } from 'lucide-react';

interface MedicalAdvisoryBoardProps {
  onStartTreatment?: () => void;
}

const MedicalAdvisoryBoard: React.FC<MedicalAdvisoryBoardProps> = ({ onStartTreatment }) => {
  return (
    <div className="mt-32 w-full max-w-md mx-auto">
      
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-full p-3 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-red-800 via-red-600 to-red-400 bg-clip-text text-transparent leading-tight mb-2">
          Medical Advisory Board
        </h2>
        
        <p className="text-lg font-semibold bg-gradient-to-r from-red-700 via-red-600 to-red-500 bg-clip-text text-transparent mb-4">
          Reviewed and approved by licensed medical professionals
        </p>
        
        {/* Certification Badge */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-full px-6 py-3 shadow-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-bold text-sm">CLINICALLY APPROVED</span>
        </div>
      </div>

      {/* Treatment Button */}
      <div className="mt-16 text-center">
        {/* Red shadow behind button */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-red-400/30 rounded-xl blur-md transform scale-105 animate-bounce"></div>
          
          <button
            onClick={onStartTreatment}
            className="relative group bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-bold text-base py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-red-400/30 overflow-hidden animate-bounce max-w-sm"
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-700/20"></div>
            
            {/* Button text */}
            <span className="relative z-10 tracking-wide flex items-center justify-center space-x-2">
              <MousePointer2 className="w-5 h-5" />
              <span className="whitespace-nowrap">TAP TO START YOUR TREATMENT</span>
            </span>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>

    </div>
  );
};

export default MedicalAdvisoryBoard;