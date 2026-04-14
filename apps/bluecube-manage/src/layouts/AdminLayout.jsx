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
  User,
  ExternalLink
} from 'lucide-react';
import logo from '../assets/logo.png';

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Inventory', path: '/inventory', icon: Package },
    { name: 'New Upload', path: '/upload', icon: Upload },
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Sidebar Navigation */}
      <div id="application-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-72 bg-[#1B365D] border-e border-white/5 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0">
        <div className="px-8 pt-10 pb-6 h-full flex flex-col">
          <Link to="/" className="flex items-center gap-3 mb-12 group">
            <img src={logo} alt="Blue Cube Logo" className="w-9 h-9 object-contain brightness-0 invert transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="font-montserrat font-black text-xl text-white uppercase tracking-tighter leading-none">Blue Cube</span>
              <span className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.3em] mt-1">Management</span>
            </div>
          </Link>

          <nav className="hs-accordion-group p-0 w-full flex flex-col flex-wrap flex-1" data-hs-accordion-always-open>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 ps-2">Main Menu</p>
            <ul className="space-y-1.5">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-x-3.5 py-3.5 px-4 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-200 group ${
                      location.pathname === item.path
                        ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${location.pathname === item.path ? 'text-white' : 'text-white/40 group-hover:text-white'}`} />
                    {item.name}
                    {location.pathname === item.path && <ChevronRight className="w-3 h-3 ms-auto" />}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
               <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 ps-2">System</p>
               <ul className="space-y-1.5">
                <li>
                  <Link
                    to="/settings"
                    className="flex items-center gap-x-3.5 py-3.5 px-4 text-xs font-bold uppercase tracking-widest text-white/60 rounded-sm hover:bg-white/5 hover:text-white transition-all group"
                  >
                    <Settings className="w-4 h-4 text-white/40 group-hover:text-white" />
                    Settings
                  </Link>
                </li>
                <li>
                  <a
                    href="http://localhost:5176"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-x-3.5 py-3.5 px-4 text-xs font-bold uppercase tracking-widest text-white/60 rounded-sm hover:bg-white/5 hover:text-white transition-all group"
                  >
                    <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white" />
                    Live Site
                  </a>
                </li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-white/5">
                <button
                  className="w-full flex items-center gap-x-3.5 py-4 px-4 text-xs font-bold uppercase tracking-widest text-red-400/80 rounded-sm hover:bg-red-500/10 hover:text-red-400 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:ps-72 transition-all duration-300">
        {/* Top Header */}
        <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[40] w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-4 lg:py-5">
          <nav className="flex basis-full items-center w-full mx-auto px-6 lg:px-10" aria-label="Global">
            <div className="me-5 lg:me-0 lg:hidden">
              <button type="button" className="p-2 inline-flex justify-center items-center gap-x-2 rounded-sm border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation">
                <Menu className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3">
              <div className="hidden sm:block flex-1 max-w-md">
                <div className="relative group">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400 group-focus-within:text-primary-navy transition-colors" />
                  </div>
                  <input type="text" className="py-2.5 px-4 ps-11 block w-full border-gray-200 bg-gray-50 rounded-sm text-sm focus:border-primary-navy focus:ring-0 focus:bg-white transition-all" placeholder="Search resources..." />
                </div>
              </div>

              <div className="flex flex-row items-center justify-end gap-3">
                <button type="button" className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-100 text-gray-800 hover:bg-gray-50 transition-colors relative">
                  <Bell className="w-4 h-4 text-gray-500" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div className="w-px h-6 bg-gray-200 mx-1"></div>

                <div className="hs-dropdown relative inline-flex">
                   <button id="hs-dropdown-custom-trigger" type="button" className="hs-dropdown-toggle flex items-center gap-3 p-1 ps-3 rounded-full border border-gray-100 hover:bg-gray-50 transition-all">
                      <div className="hidden sm:block text-right">
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Admin</p>
                         <p className="text-xs font-bold text-primary-navy">Blue Cube Staff</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary-navy flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-md">
                         <User className="w-4 h-4" />
                      </div>
                   </button>
                </div>
              </div>
            </div>
          </nav>
        </header>

          {/* Page Container */}
          <main className="p-6 lg:p-10 max-w-[1600px] mx-auto animate-fade-in">
            <Outlet />
          </main>
      </div>
    </div>
  );
}
