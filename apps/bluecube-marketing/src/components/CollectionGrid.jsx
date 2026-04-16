import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

// In a real app we'd fetch these from Firestore, mocking for now.
const MOCK_PRODUCTS = [
  { id: 1, title: 'Classic Tailored Suit', price: 8999, category: 'Formal Wear', imageUrl: 'https://images.unsplash.com/photo-1594938298596-12def69f2f83?w=800&auto=format&fit=crop&q=60' },
  { id: 2, title: 'Premium Cotton Shirt', price: 2499, category: 'Casual Wear', imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=60' },
  { id: 3, title: 'Structured Linen Blazer', price: 5499, category: 'Outerwear', imageUrl: 'https://images.unsplash.com/photo-1592878904946-b3ce8ae243ce?w=800&auto=format&fit=crop&q=60' },
  { id: 4, title: 'Signature Chinos', price: 2999, category: 'Bottoms', imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=60' },
];

export default function CollectionGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate fetching from Firestore
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
    }, 500);
  }, []);

  return (
    <section id="collection" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 transition-all duration-700 animate-fade-in">
          <div className="max-w-2xl">
            <div className="flex items-center gap-x-2 mb-4">
              <span className="w-8 h-px bg-accent-blue"></span>
              <span className="text-sm font-bold text-accent-blue uppercase tracking-[0.2em]">Our Collections</span>
            </div>
            <h2 className="text-[32px] md:text-5xl font-bold text-primary-charcoal font-jakarta tracking-tight">
              The <span className="text-accent-blue">Summer 2026</span> <br />
              Series.
            </h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-x-2 text-sm font-bold text-primary-charcoal border-b-2 border-accent-blue pb-1 hover:text-accent-blue transition-all group">
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="animate-pulse flex flex-col gap-4">
                <div className="bg-gray-100 aspect-[3/4] rounded-sm w-full"></div>
                <div className="bg-gray-100 h-4 w-3/4 rounded-sm"></div>
                <div className="bg-gray-100 h-4 w-1/4 rounded-sm"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 animate-fade-in">
            {products.map((product) => (
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
        
        <div className="mt-16 text-center md:hidden">
          <Link to="/products" className="inline-block w-full py-4 px-6 text-sm font-bold text-white bg-primary-navy rounded-sm hover:bg-blue-800 transition-all shadow-lg">
            View Entire Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
