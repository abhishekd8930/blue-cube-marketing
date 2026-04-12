import React from 'react';

const ProductCard = ({ product }) => {
  // Extract main image (first in the array) or a default placeholder
  const mainImage = product.images?.length > 0 ? product.images[0] : '/placeholder.jpg';

  return (
    <div className="group flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
      {/* Product Image Showcase */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50 flex items-center justify-center">
        <img 
          src={mainImage} 
          alt={product.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        {/* Optional overlay tag */}
        <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 uppercase tracking-wider backdrop-blur-sm shadow-sm ring-1 ring-black/5">
          {product.category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-2 bg-white">
        <h3 className="text-lg font-medium text-slate-800 line-clamp-1 group-hover:text-cyan-800 transition-colors">
          {product.title}
        </h3>
        
        <p className="text-gray-500 text-sm text-balance line-clamp-2 leading-relaxed">
          {product.description || "Premium quality garment crafted with precision."}
        </p>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-slate-900">
            ${product.price?.toFixed(2)}
          </span>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
