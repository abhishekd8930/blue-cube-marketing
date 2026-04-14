import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/hero.jpeg';

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-white pt-16 pb-12 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content Column */}
          <div className="relative z-10 animate-fade-in">
            <div className="inline-flex items-center py-2 px-5 rounded-full bg-gray-50 border border-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-12">
              The New Standard
            </div>
            
            <h1 className="block text-6xl font-black text-gray-900 sm:text-7xl lg:text-[85px] leading-[1.05] font-montserrat tracking-tighter mb-10">
              Crafting <br />
              <span className="text-accent-blue">Excellence</span> <br />
              Since 1998.
            </h1>
            
            <p className="text-[17px] text-gray-500 font-medium leading-[1.7] max-w-lg mb-12">
              Premium garment manufacturing blending heritage roots with <br className="hidden md:block" />
              modern precision. Tailored for those who demand absolute quality.
            </p>
            
            <div className="flex flex-wrap gap-5">
              <a href="#collection" className="inline-flex justify-center items-center gap-x-3 text-center bg-primary-navy hover:bg-accent-blue text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all py-5 px-12 shadow-2xl shadow-blue-900/10 group">
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" className="inline-flex justify-center items-center text-center bg-transparent border border-gray-100 text-gray-900 hover:border-primary-navy hover:bg-gray-50 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm py-5 px-12 transition-all">
                Our Heritage
              </a>
            </div>
          </div>

          {/* Visual Column */}
          <div className="relative group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] transition-all duration-700">
               <img 
                src={heroImage} 
                alt="Blue Cube Signature Pieces" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 transform scale-105 group-hover:scale-100 group-hover:grayscale-0"
              />
              
              {/* Image Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute left-10 bottom-12 text-white">
                 <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-3 opacity-90 transition-all group-hover:tracking-[0.4em]">Summer 2026</p>
                 <h3 className="text-3xl font-bold font-montserrat leading-tight tracking-tight">The Lightweight Series</h3>
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-blue/5 rounded-full blur-3xl -z-10 group-hover:bg-accent-blue/10 transition-colors"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
