import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Upload, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Menu,
  Bell,
  Search,
  User
} from 'lucide-react';
import logo from '../assets/logo.png';

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Manage Products', path: '/inventory', icon: Package },
    { name: 'Upload New', path: '/upload', icon: Upload },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar Navigation */}
      <div id="application-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-primary-navy border-e border-white/10 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0">
        <div className="px-6 pt-8 pb-6 h-full flex flex-col">
          <Link to="/" className="flex items-center gap-3 mb-10 transition-transform hover:scale-105">
            <img src={logo} alt="Blue Cube Logo" className="w-8 h-8 object-contain brightness-0 invert" />
            <span className="font-montserrat font-extrabold text-lg text-white uppercase tracking-tighter">Blue Cube <span className="text-secondary-gold italic">Manage</span></span>
          </Link>

          <nav className="hs-accordion-group p-0 w-full flex flex-col flex-wrap flex-1" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-x-3.5 py-3 px-2.5 text-sm rounded-sm transition-all focus:outline-none ${
                      location.pathname === item.path
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                    {location.pathname === item.path && <ChevronRight className="w-4 h-4 ms-auto" />}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10 border-t border-white/10">
              <ul className="space-y-1.5">
                <li>
                  <Link
                    to="/settings"
                    className="flex items-center gap-x-3.5 py-3 px-2.5 text-sm text-white/70 rounded-sm hover:bg-white/5 hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    className="w-full flex items-center gap-x-3.5 py-3 px-2.5 text-sm text-white/70 rounded-sm hover:bg-red-500/10 hover:text-red-400 group"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:ps-64">
        {/* Top Header */}
        <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[40] w-full bg-white border-b py-2.5 sm:py-4">
          <nav className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
            <div className="me-5 lg:me-0 lg:hidden">
              <button type="button" className="text-gray-500 hover:text-gray-600" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation">
                <Menu className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3">
              <div className="hidden sm:block">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                  <input type="text" className="py-2 px-4 ps-11 block w-full border-gray-200 rounded-sm text-sm focus:border-primary-navy focus:ring-primary-navy disabled:opacity-50 disabled:pointer-events-none" placeholder="Search products..." />
                </div>
              </div>

              <div className="flex flex-row items-center justify-end gap-2">
                <button type="button" className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                  <Bell className="w-5 h-5" />
                </button>
                
                <div className="hs-dropdown relative inline-flex">
                   <button id="hs-dropdown-custom-trigger" type="button" className="hs-dropdown-toggle p-0.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100">
                     <div className="w-8 h-8 rounded-full bg-primary-navy/10 flex items-center justify-center text-primary-navy font-bold text-xs ring-2 ring-white">
                        <User className="w-4 h-4" />
                     </div>
                   </button>
                </div>
              </div>
            </div>
          </nav>
        </header>

          {/* This renders the active child route component */}
          <div className="max-w-6xl mx-auto w-full animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <Outlet />
          </div>
      </div>
    </div>
  );
}
