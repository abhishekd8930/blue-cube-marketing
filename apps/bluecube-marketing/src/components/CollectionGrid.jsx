import React, { useState, useEffect } from 'react';
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
    <section id="collection" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
          <div>
            <h2 className="text-sm font-semibold text-blue-900 uppercase tracking-widest mb-2">Summer 2026</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Latest Collections</h3>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-900 transition-colors">
            View All Products &rarr;
          </a>
        </div>

        {products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="animate-pulse flex flex-col gap-4">
                <div className="bg-gray-200 aspect-[3/4] rounded-sm w-full"></div>
                <div className="bg-gray-200 h-4 w-3/4 rounded-sm"></div>
                <div className="bg-gray-200 h-4 w-1/4 rounded-sm"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
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
        
        <div className="mt-12 text-center sm:hidden">
          <button className="w-full bg-gray-100 text-gray-900 py-4 font-medium rounded-sm hover:bg-gray-200">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
