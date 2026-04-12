import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Tag, LogOut, Package } from 'lucide-react';
import logo from '../assets/logo.png';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app we'd clear auth state/tokens here
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

      {/* Sidebar */}
      <aside className="w-64 bg-[#0a192f] text-white flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Blue Cube Logo" className="w-8 h-8 object-contain invert" />
            <span className="font-bold text-lg tracking-tight">BC Manager</span>
          </div>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Tag className="w-5 h-5" />
            Products
          </NavLink>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:bg-white/5 hover:text-white rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-gray-800 font-semibold text-lg">Blue Cube Markrting team</h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 relative">
          {/* This renders the active child route component */}
          <div className="max-w-6xl mx-auto w-full animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <Outlet />
          </div>
        </div>
      </main>

    </div>
  );
}
