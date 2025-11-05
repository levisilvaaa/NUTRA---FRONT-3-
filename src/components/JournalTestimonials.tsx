import React, { useState, useRef, useEffect } from 'react';

interface JournalTestimonial {
  id: number;
  logo: string;
  title: string;
  subtitle: string;
  text: string;
}

const journalTestimonials: JournalTestimonial[] = [
  {
    id: 1,
    logo: "/CNN-logo copy.png",
    title: "CNN",
    subtitle: "A Surprising Natural Solution to Men's Performance Issues",
    text: "CNN reveals the growing demand for natural solutions among men over 40. Products like Max Testorin are gaining ground as alternatives to traditional treatments."
  },
  {
    id: 2,
    logo: "/newyork-logo.png",
    title: "The New York Times",
    subtitle: "Natural Solutions Gain Traction in Men's Health Market",
    text: "The New York Times explores the growing trend of natural supplements in men's health, with products like Max Testorin leading the charge in alternative wellness solutions."
  },
  {
    id: 3,
    logo: "/bbc-logo.png",
    title: "BBC Health",
    subtitle: "Natural Ingredients Show Promise for Men's Wellness",
    text: "BBC Health investigates the science behind natural male enhancement supplements, highlighting Max Testorin as a leading example of effective herbal formulations."
  }
];

const JournalTestimonials = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setActiveTab((prev) => (prev + 1) % journalTestimonials.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const newCurrentX = e.touches[0].clientX;
    const diff = newCurrentX - startX;
    setCurrentX(newCurrentX);
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const diffX = currentX - startX;
    const threshold = 80;
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && activeTab > 0) {
        setActiveTab(activeTab - 1);
      } else if (diffX < 0 && activeTab < journalTestimonials.length - 1) {
        setActiveTab(activeTab + 1);
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseStart = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const newCurrentX = e.clientX;
    const diff = newCurrentX - startX;
    setCurrentX(newCurrentX);
    setDragOffset(diff);
  };

  const handleMouseEnd = () => {
    if (!isDragging) return;
    
    const diffX = currentX - startX;
    const threshold = 80;
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && activeTab > 0) {
        setActiveTab(activeTab - 1);
      } else if (diffX < 0 && activeTab < journalTestimonials.length - 1) {
        setActiveTab(activeTab + 1);
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <div className="mt-8 w-full max-w-sm mx-auto">
      {/* Floating Journal Carousel */}
      <div className="relative h-[320px] perspective-1000 p-2">
        <div
          ref={containerRef}
          className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseStart}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseEnd}
          onMouseLeave={handleMouseEnd}
        >
          {journalTestimonials.map((testimonial, index) => {
            const isActive = index === activeTab;
            const isPrev = index === activeTab - 1;
            const isNext = index === activeTab + 1;
            
            let transform = '';
            let opacity = 0;
            let zIndex = 0;
            let scale = 0.8;
            
            if (isActive) {
              transform = `translateX(${dragOffset}px) translateY(-10px) rotateY(0deg)`;
              opacity = 1;
              zIndex = 30;
              scale = 1;
            } else if (isPrev) {
              transform = `translateX(${-120 + dragOffset}px) translateY(20px) rotateY(25deg)`;
              opacity = 0.6;
              zIndex = 20;
              scale = 0.85;
            } else if (isNext) {
              transform = `translateX(${120 + dragOffset}px) translateY(20px) rotateY(-25deg)`;
              opacity = 0.6;
              zIndex = 20;
              scale = 0.85;
            } else {
              transform = `translateX(${index < activeTab ? -200 : 200}px) translateY(40px) rotateY(${index < activeTab ? 45 : -45}deg)`;
              opacity = 0;
              zIndex = 10;
              scale = 0.7;
            }

            return (
              <div
                key={testimonial.id}
                className="absolute top-2 left-2 right-2 bottom-2 transition-all duration-500 ease-out transform-gpu"
                style={{
                  transform: `${transform} scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Journal Card */}
                <div className="bg-white rounded-3xl border-2 border-red-300 p-4 relative overflow-hidden backdrop-blur-sm h-full">
                  
                  {/* Header with logo and title */}
                  <div className="flex flex-col items-center text-center mb-3 relative z-10">
                    {/* Logo */}
                    <div className="mb-2">
                      <img 
                        src={testimonial.logo}
                        alt={testimonial.title}
                        className={`object-contain ${testimonial.id === 1 ? 'h-12' : testimonial.id === 3 ? 'h-20' : 'h-16'}`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.parentElement?.querySelector('.fallback-logo');
                          if (fallback) {
                            (fallback as HTMLElement).style.display = 'block';
                          }
                        }}
                      />
                      <div className="fallback-logo hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg font-bold text-sm">
                        {testimonial.title}
                      </div>
                    </div>
                    
                    {/* Title */}
                    {testimonial.id !== 1 && testimonial.id !== 2 && testimonial.id !== 3 && (
                      <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent mb-1 drop-shadow-sm">
                        {testimonial.title}
                      </h3>
                    )}
                  </div>

                  {/* Subtitle */}
                  <h4 className="text-lg font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent text-center mb-3 leading-tight relative z-10">
                    {testimonial.subtitle}
                  </h4>

                  {/* Article Text */}
                  <p className="text-gray-600 text-center leading-relaxed text-sm relative z-10 mb-2">
                    {testimonial.text}
                  </p>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern Tab Navigation */}
      <div className="flex justify-center space-x-4 mt-6">
        {journalTestimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`relative w-12 h-12 rounded-full font-bold text-lg transition-all duration-500 transform hover:scale-110 ${
              index === activeTab
                ? 'bg-gradient-to-r from-red-500 to-red-700 text-white scale-110'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {index + 1}
            {index === activeTab && (
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full blur-lg opacity-50 -z-10 animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Progress Indicator */}
      <div className="flex justify-center mt-4">
        <div className="flex space-x-3">
          {journalTestimonials.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === activeTab
                  ? 'w-12 bg-gradient-to-r from-red-500 to-red-700'
                  : 'w-3 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalTestimonials;