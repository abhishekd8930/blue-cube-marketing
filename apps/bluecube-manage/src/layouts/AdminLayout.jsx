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
} from 'lucide-react';
import logo from '../assets/logo.png';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
        <nav className="max-w-screen-2xl mx-auto px-6 lg:px-10 flex items-center h-16 gap-6">

          {/* ── Brand (far left) ─────────────────── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group mr-4">
            <img
              src={logo}
              alt="Blue Cube"
              className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="font-montserrat font-black text-[17px] text-gray-900 uppercase tracking-tight">
                BlueCube
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-sky-400 mt-0.5">
                Manage
              </span>
            </div>
          </Link>

          {/* ── Divider ──────────────────────────── */}
          <div className="w-px h-6 bg-gray-100 shrink-0" />

          {/* ── Nav Links (center) ───────────────── */}
          <div className="flex items-center gap-1 flex-1">
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
                {/* Active underline pip */}
                {isActive(path) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-sky-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* ── Right Controls ───────────────────── */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Live Site link */}
            <a
              href="http://localhost:5176"
              target="_blank"
              rel="noreferrer"
              id="header-live-site"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Site
            </a>

            {/* Bell */}
            <button
              id="header-notifications"
              type="button"
              className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all"
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-400 rounded-full border-2 border-white" />
            </button>

            {/* ── Upload Product Button (green, far right) ── */}
            <button
              id="header-upload-btn"
              type="button"
              onClick={handleUploadClick}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-bold rounded-full shadow-sm shadow-emerald-200 transition-all duration-200 hover:shadow-md hover:shadow-emerald-200"
            >
              <Upload className="w-4 h-4" />
              Upload Product
            </button>

            {/* User avatar chip */}
            <div className="relative">
              <button
                id="header-user-menu"
                type="button"
                onClick={() => setUserMenuOpen(v => !v)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white shadow-sm">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="hidden sm:block text-xs font-bold text-gray-700">Admin</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-200/60 py-1.5 z-50 animate-slide-down">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Signed in as</p>
                    <p className="text-xs font-bold text-gray-800">Blue Cube Staff</p>
                  </div>
                  <button
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 transition-colors font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* ─────────────────────────────────────────
          Page Content
      ───────────────────────────────────────── */}
      <main className="max-w-screen-2xl mx-auto px-6 lg:px-10 pt-10 pb-12 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}
