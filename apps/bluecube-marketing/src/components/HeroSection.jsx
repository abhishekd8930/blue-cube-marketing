import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center md:items-stretch flex-col md:flex-row pt-20">
      
      {/* Left Content Area */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 md:py-0 z-10 bg-white">
        <div className="max-w-xl animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold uppercase tracking-widest rounded-full mb-6">
            The New Standard
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Crafting <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
              Excellence
            </span><br />
            Since 1998.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-light">
            Premium garment manufacturing blending heritage roots with modern precision. Tailored for those who demand absolute quality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#collection" className="inline-flex justify-center items-center gap-2 bg-blue-900 text-white px-8 py-4 rounded-sm font-medium hover:bg-blue-800 hover:shadow-lg transition-all group">
              Explore Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="inline-flex justify-center items-center px-8 py-4 bg-transparent border border-gray-200 text-gray-900 font-medium hover:border-gray-900 hover:bg-gray-50 transition-colors rounded-sm">
              Our Heritage
            </a>
          </div>
        </div>
      </div>

      {/* Right Visual Area */}
      <div className="flex-1 relative min-h-[50vh] md:min-h-full w-full bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply z-10 transition-opacity hover:opacity-0 duration-700"></div>
        <img 
          src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2574&auto=format&fit=crop" 
          alt="Premium Garments" 
          className="absolute inset-0 w-full h-full object-cover object-center animate-fade-in opacity-0 scale-105"
          style={{ animationDuration: '1.2s' }}
        />
        {/* Placeholder overlay if image fails or before loading */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 flex items-end p-8">
           <div className="text-white">
             <p className="text-sm font-medium tracking-widest uppercase mb-2">Summer 2026</p>
             <h3 className="text-2xl font-light">The Lightweight Series</h3>
           </div>
        </div>
      </div>

    </section>
  );
}
