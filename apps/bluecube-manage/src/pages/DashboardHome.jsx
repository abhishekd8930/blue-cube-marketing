import React from 'react';
import { PackageOpen, TrendingUp, Users, AlertCircle } from 'lucide-react';

export default function DashboardHome() {
  const stats = [
    { label: 'Total Products', value: '1,248', icon: <PackageOpen className="w-5 h-5" />, trend: '+12% from last month', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Sales', value: '₹4.2M', icon: <TrendingUp className="w-5 h-5" />, trend: '+8% from last month', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Retailers', value: '342', icon: <Users className="w-5 h-5" />, trend: '+4 new this week', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Low Stock Alerts', value: '18', icon: <AlertCircle className="w-5 h-5" />, trend: 'Needs immediate action', color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 font-medium mt-1 text-sm">Welcome back. Here is what's happening with Blue Cube today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-gray-500 mb-2">{stat.label}</p>
            <p className="text-xs text-gray-400 font-medium">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity Mock */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-3xl">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Uploads</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
             <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 bg-gray-100 rounded-md shrink-0 border border-gray-200 flex items-center justify-center">
                  <PackageOpen className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                   <p className="text-sm font-semibold text-gray-900">Summer Essential T-Shirt (Batch {400 + i})</p>
                   <p className="text-xs text-gray-500 font-medium">Added Category: Casual Wear • Size range: S-XXL</p>
                </div>
                <div className="ml-auto text-xs font-semibold text-gray-400">
                  Just now
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
