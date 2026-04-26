import React from 'react';
import { PackageOpen, TrendingUp, Users, AlertCircle, ArrowUpRight } from 'lucide-react';

const stats = [
  {
    label: 'Total Products',
    value: '1,248',
    icon: PackageOpen,
    trend: '+12% from last month',
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
    value: '18',
    icon: AlertCircle,
    trend: 'Needs immediate action',
    trendUp: false,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
  },
];

const recentUploads = [
  { name: 'Summer Essential T-Shirt (Batch 400)', category: 'Casual Wear', sizes: 'S–XXL', time: 'Just now'     },
  { name: 'Summer Essential T-Shirt (Batch 401)', category: 'Casual Wear', sizes: 'S–XXL', time: '5 mins ago'   },
  { name: 'Summer Essential T-Shirt (Batch 402)', category: 'Casual Wear', sizes: 'S–XXL', time: '12 mins ago'  },
];

export default function DashboardHome() {
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
                <p className="text-3xl font-bold font-montserrat text-gray-900 tracking-tight">{stat.value}</p>
                <p className="text-sm font-medium text-gray-500 mt-0.5">{stat.label}</p>
                <p className={`text-xs font-semibold mt-2 ${stat.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.trend}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Uploads Panel */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05)] max-w-3xl">
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-montserrat font-bold text-gray-900 text-base">Recent Uploads</h3>
          <span className="text-xs font-semibold text-sky-500 hover:underline cursor-pointer">View all</span>
        </div>
        <div className="divide-y divide-gray-50">
          {recentUploads.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/60 transition-colors"
            >
              <div className="w-11 h-11 bg-sky-50 rounded-xl shrink-0 flex items-center justify-center">
                <PackageOpen className="w-5 h-5 text-sky-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  {item.category} · Sizes: {item.sizes}
                </p>
              </div>
              <span className="text-xs font-medium text-gray-400 shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
