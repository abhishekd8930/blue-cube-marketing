import React from 'react';

export default function ProductCard({ title, price, category, imageUrl }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 mb-4">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="object-cover w-full h-full object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-700 ease-out">
            No Image
          </div>
        )}
        
        {/* Overlay Action */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none flex items-end p-4">
          <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-full">
            <button className="w-full bg-white text-gray-900 font-medium py-3 rounded-sm shadow-lg pointer-events-auto hover:bg-gray-50">
              Quick View
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{category}</p>
          <h3 className="text-lg font-medium text-gray-900 tracking-tight">{title}</h3>
        </div>
        <p className="text-lg font-semibold text-blue-900">₹{price}</p>
      </div>
    </div>
  );
}
