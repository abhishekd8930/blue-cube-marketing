import React from 'react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import heroImage from '../assets/hero.jpeg';

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Content */}
          <div className="relative z-10 transition-all duration-700 animate-fade-in">
            <div className="inline-flex items-center gap-x-2 py-1 px-3 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary-navy"></span>
              Heritage in every stitch
            </div>
            
            <h1 className="block text-5xl font-extrabold text-gray-900 sm:text-6xl lg:text-7xl lg:leading-tight font-montserrat tracking-tighter mb-8 italic">
              Crafting <br />
              <span className="text-primary-navy not-italic">Excellence</span> <br />
              Since 1998.
            </h1>
            
            <p className="text-lg text-gray-600 font-light leading-relaxed max-w-lg mb-10">
              Sri Raghavendra Fashions brings Bangalore's legacy of premium garment manufacturing to the modern era. Decades of precision, tailored for the discerning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#collection" className="inline-flex justify-center items-center gap-x-3 text-center bg-primary-navy hover:bg-blue-800 border border-transparent text-white text-sm font-semibold rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition-all py-4 px-10 shadow-lg shadow-blue-900/10 group">
                Explore Collection
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" className="inline-flex justify-center items-center gap-x-3 text-center bg-white border border-gray-200 text-gray-800 hover:border-primary-navy hover:bg-gray-50 text-sm font-semibold rounded-sm py-4 px-10 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                Our Heritage
              </a>
            </div>

            {/* Stats/Social Proof (Preline Style) */}
            <div className="mt-12 flex items-center gap-x-8 border-t border-gray-100 pt-8">
              <div>
                <h4 className="text-2xl font-bold text-primary-navy font-montserrat">25+</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Years Legacy</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-primary-navy font-montserrat">1M+</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Garments Made</p>
              </div>
              <div className="hidden sm:block">
                <h4 className="text-2xl font-bold text-primary-navy font-montserrat">0.1%</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Return Rate</p>
              </div>
            </div>
          </div>

          {/* Visual Piece */}
          <div className="relative isolate">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-secondary-gold/10 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary-navy/5 rounded-full blur-3xl opacity-50 -z-10"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white p-2 bg-white">
              <img 
                src={heroImage} 
                alt="Blue Cube Collection" 
                className="rounded-xl w-full h-[500px] object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
              />
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-sm shadow-xl border border-gray-100 max-w-[200px] animate-fade-in">
                 <p className="text-[10px] font-bold text-secondary-gold uppercase tracking-[0.2em] mb-1">Featured Item</p>
                 <h3 className="text-sm font-bold text-gray-900 mb-1">Signature Linen Series</h3>
                 <button className="text-[10px] font-semibold text-primary-navy flex items-center gap-1 group">
                   Details <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
