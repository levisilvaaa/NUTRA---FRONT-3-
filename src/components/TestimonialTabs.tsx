import React, { useState, useRef, useEffect } from 'react';
import { Star, Play } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  verified: boolean;
  image: string;
  videoUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Robert S.",
    location: "California",
    rating: 5,
    text: "I didn't even tell my wife I was taking it, but after two weeks she asked me.",
    verified: true,
    image: "https://i.postimg.cc/rFygthtS/PERFIL-VELHOOOO.png",
    videoUrl: "https://scripts.converteai.net/f5ab9e88-cc1b-4dce-a537-c7de7e019d8b/players/68e5b317fce7ac01b365d3ed/v4/embed.html"
  },
  {
    id: 2,
    name: "Marcus J.",
    location: "Washington",
    rating: 5,
    text: "I'm 44, wake up early for work, and used to come home drained. After starting Max Testorin.",
    verified: true,
    image: "https://i.postimg.cc/wMwXVps6/perfil-40-ANOS.png",
    videoUrl: "https://scripts.converteai.net/f5ab9e88-cc1b-4dce-a537-c7de7e019d8b/players/68e5b31fa991bccb20553af9/v4/embed.html"
  },
  {
    id: 3,
    name: "David R.",
    location: "Florida",
    rating: 5,
    text: "I never liked those artificial pills. But when I saw Max Testorin was natural, I gave it a shot.",
    verified: true,
    image: "https://i.postimg.cc/fTg7SMsh/PERFIL-AFRICAN.png",
    videoUrl: "https://scripts.converteai.net/f5ab9e88-cc1b-4dce-a537-c7de7e019d8b/players/68e5b31b1b6ca578321ddf4f/v4/embed.html"
  }
];

const TestimonialTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
      } else if (diffX < 0 && activeTab < testimonials.length - 1) {
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
      } else if (diffX < 0 && activeTab < testimonials.length - 1) {
        setActiveTab(activeTab + 1);
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <div className="mt-8 w-full max-w-sm mx-auto">
      {/* Floating Testimonial Carousel */}
      <div className="relative h-[470px] perspective-1000 p-2">
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
          {testimonials.map((testimonial, index) => {
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
                {/* Floating Card with Enhanced Shadow */}
                <div className="bg-white rounded-3xl border-2 border-red-300 p-5 pb-2 relative overflow-hidden backdrop-blur-sm h-full">
                  
                  {/* Header with name and location */}
                  <div className="flex items-start space-x-4 mb-2 relative z-10">
                    {/* Profile Image with Floating Effect */}
                    <div className="relative flex-shrink-0">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-3 border-green-400 relative z-10"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center z-20">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Name, Location and Verified Badge */}
                    <div className="flex-1">
                      <div className="flex flex-col justify-start text-left">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent mb-1 drop-shadow-sm">
                          {testimonial.name}
                        </h3>
                        <p className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent font-medium text-sm leading-none mb-2">
                          {testimonial.location}
                        </p>
                        
                        {/* Verified Badge - Now below credentials */}
                        {testimonial.verified && (
                          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 w-fit">
                            <div className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                            </div>
                            <span>VERIFIED</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Text with Enhanced Styling */}
                  <blockquote className="text-left italic font-medium leading-relaxed mb-6 mt-4 text-base relative z-10 drop-shadow-sm" style={{ color: '#dc2626' }}>
                    "{testimonial.text}"
                  </blockquote>

                  {/* Video Placeholder with Modern Design */}
                  <div className="bg-gray-900 rounded-2xl overflow-hidden relative mb-4" style={{ aspectRatio: '16/9' }}>
                    {isActive && (
                      <>
                        <div id={`ifr_wrapper_testimonial_${testimonial.id}`} style={{ margin: '0 auto', width: '100%' }}>
                          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }} id={`ifr_aspect_testimonial_${testimonial.id}`}>
                            <iframe 
                              frameBorder="0" 
                              allowFullScreen 
                              src={testimonial.videoUrl}
                              id={`ifr_testimonial_${testimonial.id}`}
                              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                              referrerPolicy="origin"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Fallback for non-active testimonials */}
                    {!isActive && (
                      <>
                        <img 
                          src={testimonial.image}
                          alt={`${testimonial.name} video testimonial`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Video overlay with enhanced effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all duration-300">
                            <Play className="w-8 h-8 text-white fill-white drop-shadow-lg" />
                          </div>
                        </div>
                        
                        {/* Video indicators */}
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          LIVE
                        </div>
                      </>
                    )}
                  </div>

                  {/* Rating with Glow Effect - Moved to bottom */}
                  <div className="flex items-center justify-center space-x-1 mb-0 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                    ))}
                    <span className="ml-2 text-lg font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">
                      {testimonial.rating}.0
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern Tab Navigation */}
      <div className="flex justify-center space-x-6 mt-4 mb-4">
        {testimonials.map((_, index) => (
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
      <div className="flex justify-center mt-2">
        <div className="flex space-x-3">
          {testimonials.map((_, index) => (
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

export default TestimonialTabs;