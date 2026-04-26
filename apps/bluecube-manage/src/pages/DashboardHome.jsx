import React, { useState } from 'react';
import { useCollection } from '../hooks/useFirestore.js';
import { ArrowUpRight, PackageOpen, TrendingUp, Users, AlertCircle } from 'lucide-react';

export default function DashboardHome() {
  const { data: products, loading } = useCollection('products', 'createdAt', 'desc');

  // Derived live stats
  const totalProducts = products.length;
  const lowStockCount = products.filter(
    (p) => p.stockStatus === 'low_stock' || (p.stock !== undefined && p.stock > 0 && p.stock < 15)
  ).length;
  const recentUploads = products.slice(0, 3);

  const stats = [
    {
      label: 'Total Products',
      value: loading ? '—' : totalProducts.toLocaleString(),
      icon: PackageOpen,
      trend: loading ? 'Loading…' : `${totalProducts} items in catalog`,
      trendUp: true,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-500',
    },
    {
      label: 'Total Sales',
      value: '₹4.2M',
      icon: TrendingUp,
      trend: '+8% from last month',
      trendUp: true,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
    },
    {
      label: 'Active Retailers',
      value: '342',
      icon: Users,
      trend: '+4 new this week',
      trendUp: true,
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-500',
    },
    {
      label: 'Low Stock Alerts',
      value: loading ? '—' : String(lowStockCount),
      icon: AlertCircle,
      trend: loading ? 'Loading…' : lowStockCount > 0 ? 'Needs immediate action' : 'All items well-stocked',
      trendUp: lowStockCount === 0,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-gray-400 font-medium mt-1">
          Welcome back. Here is what's happening with Blue Cube today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05)] p-6 flex flex-col gap-4 hover:shadow-[0_8px_12px_-2px_rgb(0_0_0/0.08)] transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <ArrowUpRight className={`w-4 h-4 ${stat.trendUp ? 'text-emerald-400' : 'text-rose-400'}`} />
              </div>
              <div>
                {loading && (stat.label === 'Total Products' || stat.label === 'Low Stock Alerts') ? (
                  <div className="space-y-2">
                    <div className="h-8 w-16 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
                  </div>
                ) : (
                  <>
                    <p className="text-3xl font-bold font-montserrat text-gray-900 tracking-tight">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-500 mt-0.5">{stat.label}</p>
                    <p className={`text-xs font-semibold mt-2 ${stat.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {stat.trend}
                    </p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Uploads Panel */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05)] max-w-3xl">
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-montserrat font-bold text-gray-900 text-base">Recent Uploads</h3>
          <span className="text-xs font-semibold text-sky-500">Live from Firestore</span>
        </div>

        {loading ? (
          <div className="divide-y divide-gray-50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <div className="w-11 h-11 bg-gray-100 rounded-xl shrink-0 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 w-1/3 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : recentUploads.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <PackageOpen className="w-8 h-8 text-gray-200 mx-auto mb-2" />
            <p className="text-sm text-gray-400 font-medium">No products yet. Upload your first product!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentUploads.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/60 transition-colors"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-11 h-11 rounded-xl object-cover border border-gray-100 shrink-0"
                  />
                ) : (
                  <div className="w-11 h-11 bg-sky-50 rounded-xl shrink-0 flex items-center justify-center">
                    <PackageOpen className="w-5 h-5 text-sky-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {item.category} · ₹{item.price?.toLocaleString('en-IN')}
                  </p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  item.stockStatus === 'in_stock' ? 'bg-emerald-50 text-emerald-600' :
                  item.stockStatus === 'low_stock' ? 'bg-amber-50 text-amber-600' :
                  'bg-rose-50 text-rose-600'
                }`}>
                  {item.stockStatus === 'in_stock' ? 'In Stock' :
                   item.stockStatus === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
