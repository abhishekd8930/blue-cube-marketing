import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';

export default function ProductCard({ title, price, category, imageUrl }) {
  return (
    <div className="group flex flex-col h-full bg-white border border-gray-100 shadow-sm rounded-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-accent-blue/20">
      
      {/* Image Container with Zoom */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <button className="p-3 bg-white rounded-full text-primary-charcoal hover:bg-accent-blue hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white rounded-full text-primary-charcoal hover:bg-accent-blue hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-lg">
            <Eye className="w-5 h-5" />
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
