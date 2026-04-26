import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Upload,
  Megaphone,
  Bell,
  User,
  ExternalLink,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import logo from '../assets/logo.png';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard',  path: '/',          icon: LayoutDashboard },
    { name: 'Inventory',  path: '/inventory',  icon: Package         },
    { name: 'Marketing',  path: '/marketing',  icon: Megaphone       },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleUploadClick = () => navigate('/upload');

  return (
    <div className="min-h-screen bg-[#F9FAFB]">

      {/* ─────────────────────────────────────────
          Sticky Top Header
      ───────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-[0_1px_3px_0_rgb(0_0_0/0.04)]">
        <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between lg:justify-start h-16 gap-4 lg:gap-6">
          
          {/* ── Left Side: Hamburger (Mobile) + Brand ── */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src={logo}
                alt="Blue Cube"
                className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col leading-none">
                <span className="font-montserrat font-black text-[15px] sm:text-[17px] text-gray-900 uppercase tracking-tight">
                  BlueCube
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] text-sky-400 mt-0.5">
                  Manage
                </span>
              </div>
            </Link>
          </div>

          {/* ── Divider (Desktop only) ──────────────────────────── */}
          <div className="hidden lg:block w-px h-6 bg-gray-100 shrink-0" />

          {/* ── Nav Links (Desktop center) ───────────────── */}
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {navItems.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                id={`nav-${name.toLowerCase()}`}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(path)
                    ? 'text-sky-500 bg-sky-50'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {name}
                {isActive(path) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-sky-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* ── Right Controls ───────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Site link */}
            <a
              href="http://localhost:5176"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Site
            </a>

            {/* Bell (Hidden on very small screens, responsive touch target minimum 44px) */}
            <button
              type="button"
              className="hidden sm:flex relative w-11 h-11 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-400 rounded-full border-2 border-white" />
            </button>

            {/* ── Upload Product Button ── */}
            <button
              onClick={handleUploadClick}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] px-3 sm:px-4 py-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 active:scale-95 text-white text-sm font-bold rounded-full shadow-sm shadow-emerald-200 transition-all duration-200"
            >
              <Upload className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Upload Product</span>
            </button>

            {/* User avatar chip */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(v => !v)}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] sm:px-3 rounded-full border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white shadow-sm shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <span className="hidden sm:block text-xs font-bold text-gray-700 ml-2">Admin</span>
                <ChevronDown className={`hidden sm:block w-3.5 h-3.5 text-gray-400 ml-2 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-200/60 py-1.5 z-50 animate-slide-down">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Signed in as</p>
                    <p className="text-xs font-bold text-gray-800">Blue Cube Staff</p>
                  </div>
                  <button className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-rose-500 hover:bg-rose-50 transition-colors font-semibold">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* ── Mobile Menu Dropdown ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-3 space-y-1 animate-slide-down shadow-sm">
            {navItems.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive(path) ? 'text-sky-500 bg-sky-50' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────
          Page Content
      ───────────────────────────────────────── */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10 pb-12 animate-fade-in w-full">
        <Outlet />
      </main>
    </div>
  );
}
