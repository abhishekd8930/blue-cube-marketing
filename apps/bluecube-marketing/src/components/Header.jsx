import React from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100/50 transition-all duration-300">
      <nav className="relative max-w-7xl w-full mx-auto px-4 md:flex md:items-center md:justify-between md:px-6 lg:px-8 py-3.5" aria-label="Global">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 transition-transform active:scale-95" aria-label="Blue Cube">
            <img src={logo} alt="Blue Cube Logo" className="w-9 h-9 object-contain" />
            <span className="font-jakarta font-bold text-xl tracking-tighter uppercase text-primary-charcoal">Blue Cube</span>
          </Link>
          <div className="md:hidden">
            <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-sm border border-gray-100 font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none transition-all text-sm" data-hs-collapse="#navbar-collapse-basic" aria-controls="navbar-collapse-basic" aria-label="Toggle navigation">
              <Menu className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4" />
              <X className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4" />
            </button>
          </div>
        </div>

        <div id="navbar-collapse-basic" className="hidden overflow-hidden transition-all duration-300 basis-full grow md:block">
          <div className="flex flex-col gap-8 mt-5 md:flex-row md:items-center md:justify-center md:mt-0">
            <Link to="/" className="text-[13px] font-bold text-accent-blue transition-colors focus:outline-none uppercase tracking-wider" aria-current="page">Home</Link>
            <Link to="/products" className="text-[13px] font-bold text-primary-charcoal hover:text-accent-blue transition-colors focus:outline-none uppercase tracking-wider">Collections</Link>
            <a href="/#about" className="text-[13px] font-bold text-primary-charcoal hover:text-accent-blue transition-colors focus:outline-none uppercase tracking-wider">About</a>
            <a href="/#contact" className="text-[13px] font-bold text-primary-charcoal hover:text-accent-blue transition-colors focus:outline-none uppercase tracking-wider">Contact</a>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-x-6">
           <button className="p-2 text-primary-charcoal hover:bg-gray-50 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-blue rounded-full border-2 border-white"></span>
           </button>
           <button className="inline-flex items-center gap-x-2 py-3.5 px-10 rounded-sm bg-primary-charcoal text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-accent-blue focus:outline-none transition-all shadow-xl shadow-blue-500/5">
             Wholesale Inquiry
           </button>
        </div>
      </nav>
    </header>
  );
}
