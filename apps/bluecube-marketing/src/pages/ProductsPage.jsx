import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const ALL_PRODUCTS = [
  { id: 1, title: 'Classic Tailored Suit', price: 8999, category: 'Formal Wear', imageUrl: 'https://images.unsplash.com/photo-1594938298596-12def69f2f83?w=800&auto=format&fit=crop&q=60' },
  { id: 2, title: 'Premium Cotton Shirt', price: 2499, category: 'Casual Wear', imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=60' },
  { id: 3, title: 'Structured Linen Blazer', price: 5499, category: 'Outerwear', imageUrl: 'https://images.unsplash.com/photo-1592878904946-b3ce8ae243ce?w=800&auto=format&fit=crop&q=60' },
  { id: 4, title: 'Signature Chinos', price: 2999, category: 'Bottoms', imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=60' },
  { id: 5, title: 'Evening Wool Overcoat', price: 12499, category: 'Outerwear', imageUrl: 'https://images.unsplash.com/photo-1539533113208-f6df8145741f?w=800&auto=format&fit=crop&q=60' },
  { id: 6, title: 'Minimalist Oxford Shoe', price: 6999, category: 'Footwear', imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=60' },
  { id: 7, title: 'Silk Knit Tie', price: 1499, category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1589756823851-41e5763cb3ce?w=800&auto=format&fit=crop&q=60' },
  { id: 8, title: 'Relaxed Merino Sweater', price: 4499, category: 'Knitwear', imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=60' },
];

const CATEGORIES = ['All', 'Formal Wear', 'Casual Wear', 'Outerwear', 'Bottoms', 'Footwear', 'Knitwear'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = selectedCategory === 'All' 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-16 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent-blue transition-colors mb-4 group font-inter">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-primary-charcoal tracking-tight font-jakarta">Full Collection</h1>
            <p className="text-gray-500 mt-2 font-inter leading-relaxed">Explore our complete range of premium garments.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors font-jakarta text-primary-charcoal">
              <SlidersHorizontal className="w-4 h-4" />
              Sort By
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-bold tracking-tight transition-all font-jakarta ${
                selectedCategory === category
                  ? 'bg-accent-blue text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-accent-blue shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="animate-pulse flex flex-col gap-4">
                <div className="bg-gray-200 aspect-[3/4] rounded-sm w-full"></div>
                <div className="bg-gray-200 h-4 w-3/4 rounded-sm"></div>
                <div className="bg-gray-200 h-4 w-1/4 rounded-sm"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or category selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 animate-fade-in">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                category={product.category}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
