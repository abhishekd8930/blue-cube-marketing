import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/hero.jpeg';

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-white pt-2 pb-12 md:pt-4 md:pb-8 lg:pt-4 lg:pb-12 md:h-[calc(100vh-64px)] md:max-h-[calc(100vh-64px)] flex flex-col justify-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start pt-6 md:pt-10">

          {/* Content Column */}
          <div className="relative z-10 animate-fade-in">
            <div className="inline-flex items-center py-2 px-5 rounded-full bg-gray-50 border border-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-12">
              The New Standard
            </div>

            <h1 className="block text-5xl font-bold text-primary-charcoal sm:text-6xl lg:text-[64px] leading-[1.1] font-jakarta tracking-tight mb-8">
              Crafting <br />
              <span className="text-accent-blue">Excellence</span> <br />
              Feel the Costume.
            </h1>

            <p className="text-[18px] text-gray-600 leading-[1.6] font-inter max-w-lg mb-10">
              Premium garment manufacturing blending heritage roots with <br className="hidden md:block" />
              modern precision. Tailored for those who demand absolute quality.
            </p>

            <div className="flex flex-wrap gap-5">
              <a href="#collection" className="inline-flex justify-center items-center gap-x-3 text-center bg-accent-blue hover:bg-primary-charcoal text-white text-[12px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all py-5 px-12 shadow-2xl shadow-blue-500/20 group">
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" className="inline-flex justify-center items-center text-center bg-transparent border border-gray-200 text-primary-charcoal hover:border-accent-blue hover:bg-gray-50 text-[12px] font-bold uppercase tracking-[0.2em] rounded-sm py-5 px-12 transition-all">
                Our Heritage
              </a>
            </div>
          </div>

          {/* Visual Column */}
          <div className="relative group">
            <div className="relative md:h-[500px] lg:h-[600px] overflow-hidden rounded-sm shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] transition-all duration-700">
              <img
                src={heroImage}
                alt="Blue Cube Signature Pieces"
                className="w-full h-full object-cover transition-all duration-1000 transform scale-105 group-hover:scale-100"
              />

              {/* Image Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute left-10 bottom-12 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-3 opacity-90 transition-all group-hover:tracking-[0.4em]">Summer 2026</p>
                <h3 className="text-3xl font-bold font-jakarta leading-tight tracking-tight">The Lightweight Series</h3>
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
