import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';

export default function ProductCard({ title, price, category, imageUrl }) {
  // Helper to optimize Cloudinary images
  const getOptimizedUrl = (url) => {
    if (!url || !url.includes('cloudinary.com') || url.endsWith('/upload/')) return null;
    // Use c_fill to ensure it fits the 3:4 aspect ratio perfectly and stays sharp
    return url.replace('/upload/', '/upload/q_auto:best,f_auto,w_800,h_1067,c_fill,g_auto/');
  };

  const optimizedUrl = getOptimizedUrl(imageUrl);

  return (
    <div className="group flex flex-col h-full bg-white border border-gray-100 shadow-sm rounded-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-accent-blue/20">
      
      {/* Image Container with Zoom */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        {optimizedUrl ? (
          <img 
            src={optimizedUrl} 
            alt={title} 
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50">
            <Eye className="w-8 h-8 mb-2 opacity-20" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">No Image</span>
          </div>
        )}
        
        {/* Hover Overlay / Touch overlay */}
        <div className="absolute inset-0 bg-transparent md:group-hover:bg-primary-charcoal/20 transition-colors duration-300 z-10 pointer-events-none md:backdrop-blur-[2px]"></div>
        
        {/* Actions (Always visible on mobile bottom, centered on desktop hover) */}
        <div className="absolute inset-x-0 bottom-3 md:inset-0 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20">
          <button className="p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm md:bg-white rounded-full text-primary-charcoal hover:bg-accent-blue hover:text-white active:bg-accent-blue active:text-white active:scale-90 transition-all transform md:translate-y-4 md:group-hover:translate-y-0 shadow-lg border border-gray-200/50">
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm md:bg-white rounded-full text-primary-charcoal hover:bg-accent-blue hover:text-white active:bg-accent-blue active:text-white active:scale-90 transition-all transform md:translate-y-4 md:group-hover:translate-y-0 md:delay-75 shadow-lg border border-gray-200/50">
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.2em]">{category}</span>
          <h3 className="text-lg font-bold text-primary-charcoal font-jakarta tracking-tight mt-1 line-clamp-1 group-hover:text-accent-blue transition-colors">
            {title}
          </h3>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xl font-bold text-primary-charcoal font-jakarta">
            ₹{price.toLocaleString('en-IN')}
          </p>
          <button className="text-xs font-semibold text-gray-500 hover:text-accent-blue transition-all underline-offset-4 hover:underline">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
