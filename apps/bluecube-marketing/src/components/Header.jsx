import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-gray-900">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="Blue Cube Logo" className="w-10 h-10 object-contain" />
            <span className="font-bold text-xl tracking-tight uppercase">Blue Cube</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium hover:text-blue-600 transition-colors">Home</a>
            <a href="#collection" className="text-sm font-medium hover:text-blue-600 transition-colors">Collections</a>
            <a href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100/50 rounded-full transition-colors hidden sm:block">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button 
              className="md:hidden p-2 hover:bg-gray-100/50 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button className="hidden md:block bg-blue-900 text-white px-6 py-2.5 text-sm font-medium rounded-sm hover:bg-blue-800 transition-all shadow-sm shrink-0">
              Wholesale Inquiry
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg transition-all duration-300 origin-top ${
        isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
      }`}>
        <div className="flex flex-col p-6 gap-4">
          <a href="#home" className="text-gray-900 hover:text-blue-600 font-medium">Home</a>
          <a href="#collection" className="text-gray-900 hover:text-blue-600 font-medium">Collections</a>
          <a href="#about" className="text-gray-900 hover:text-blue-600 font-medium">About</a>
          <a href="#contact" className="text-gray-900 hover:text-blue-600 font-medium">Contact</a>
          <button className="mt-4 bg-blue-900 text-white px-4 py-3 rounded-sm font-medium hover:bg-blue-800 transition-colors w-full">
            Wholesale Inquiry
          </button>
        </div>
      </div>
    </header>
  );
}
