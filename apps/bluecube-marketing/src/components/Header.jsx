import React from 'react';
import { Menu, X, ShoppingBag, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white/70 backdrop-blur-md border-b border-gray-200/50">
      <nav className="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 py-3" aria-label="Global">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105" aria-label="Blue Cube">
            <img src={logo} alt="Blue Cube Logo" className="w-10 h-10 object-contain" />
            <span className="font-montserrat font-extrabold text-xl tracking-tighter uppercase text-primary-navy">Blue Cube</span>
          </Link>
          <div className="md:hidden">
            <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-navy transition-all text-sm" data-hs-collapse="#navbar-collapse-basic" aria-controls="navbar-collapse-basic" aria-label="Toggle navigation">
              <Menu className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4" />
              <X className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4" />
            </button>
          </div>
        </div>

        <div id="navbar-collapse-basic" className="hidden overflow-hidden transition-all duration-300 basis-full grow md:block">
          <div className="flex flex-col gap-5 mt-5 md:flex-row md:items-center md:justify-end md:mt-0 md:ps-5">
            <Link to="/" className="font-medium text-primary-navy hover:text-secondary-gold transition-colors focus:outline-none" aria-current="page">Home</Link>
            <Link to="/products" className="font-medium text-gray-600 hover:text-primary-navy transition-colors focus:outline-none">Collections</Link>
            <a href="/#about" className="font-medium text-gray-600 hover:text-primary-navy transition-colors focus:outline-none">About</a>
            <a href="/#contact" className="font-medium text-gray-600 hover:text-primary-navy transition-colors focus:outline-none">Contact</a>
            
            <div className="flex items-center gap-x-2 md:ms-5">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                 <ShoppingBag className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center gap-x-2 py-2.5 px-6 rounded-sm border border-transparent bg-primary-navy text-white text-sm font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all shadow-sm">
                Wholesale Inquiry
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
