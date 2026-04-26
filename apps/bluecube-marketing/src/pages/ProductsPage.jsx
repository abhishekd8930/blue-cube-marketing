import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useCollection } from '../hooks/useFirestore.js';
import { ArrowLeft, Filter, SlidersHorizontal, PackageSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductsPage() {
  const { data: products, loading } = useCollection('products', 'createdAt', 'desc');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Derive category list dynamically from Firestore data
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean))).sort()];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-12 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent-blue transition-colors mb-4 group font-inter"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-primary-charcoal tracking-tight font-jakarta">Full Collection</h1>
            <p className="text-gray-500 mt-2 font-inter leading-relaxed">
              {loading
                ? 'Loading products…'
                : `Explore our complete range of ${products.length} premium garment${products.length !== 1 ? 's' : ''}.`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors font-jakarta text-primary-charcoal">
              <SlidersHorizontal className="w-4 h-4" />
              Sort By
            </button>
          </div>
        </div>

        {/* Category Filters — derived from live data */}
        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-2">
            {categories.map((category) => (
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
                {category !== 'All' && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    {products.filter((p) => p.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array(8).fill(0).map((_, n) => (
              <div key={n} className="animate-pulse flex flex-col gap-4">
                <div className="bg-gray-200 aspect-[3/4] rounded-sm w-full" />
                <div className="bg-gray-200 h-4 w-3/4 rounded-sm" />
                <div className="bg-gray-200 h-4 w-1/4 rounded-sm" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            {products.length === 0 ? (
              <>
                <PackageSearch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900">Catalog is empty</h3>
                <p className="text-gray-500 mt-2">Products will appear here once they're uploaded to the management portal.</p>
              </>
            ) : (
              <>
                <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900">No products found</h3>
                <p className="text-gray-500">Try a different category filter.</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 animate-fade-in">
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
