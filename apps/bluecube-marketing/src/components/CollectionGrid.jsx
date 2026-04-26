import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import { useCollection } from '../hooks/useFirestore.js';

export default function CollectionGrid() {
  const { data: allProducts, loading } = useCollection('products', 'createdAt', 'desc');

  // Only show featured products, max 4
  const featuredProducts = allProducts.filter((p) => p.featured === true).slice(0, 4);

  return (
    <section id="collection" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 animate-fade-in">
          <div className="max-w-2xl">
            <div className="flex items-center gap-x-2 mb-4">
              <span className="w-8 h-px bg-accent-blue" />
              <span className="text-sm font-bold text-accent-blue uppercase tracking-[0.2em]">Featured Collection</span>
            </div>
            <h2 className="text-[32px] md:text-5xl font-bold text-primary-charcoal font-jakarta tracking-tight">
              The <span className="text-accent-blue">Summer 2026</span> <br />
              Series.
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-x-2 text-sm font-bold text-primary-charcoal border-b-2 border-accent-blue pb-1 hover:text-accent-blue transition-all group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Skeleton grid while loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="animate-pulse flex flex-col gap-4">
                <div className="bg-gray-100 aspect-[3/4] rounded-sm w-full" />
                <div className="bg-gray-100 h-4 w-3/4 rounded-sm" />
                <div className="bg-gray-100 h-4 w-1/4 rounded-sm" />
              </div>
            ))}
          </div>
        ) : featuredProducts.length === 0 ? (
          /* Empty state — shown when no products are marked featured */
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-sm">
            <Sparkles className="w-10 h-10 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">No featured products yet.</p>
            <p className="text-sm text-gray-300 mt-1">Mark products as featured in the management portal to display them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 animate-fade-in">
            {featuredProducts.map((product) => (
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
          <Link
            to="/products"
            className="inline-block w-full py-4 px-6 text-sm font-bold text-white bg-accent-blue rounded-sm hover:bg-primary-charcoal transition-all shadow-lg"
          >
            View Entire Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
