import React, { useState } from 'react';
import { useCollection } from '../hooks/useFirestore.js';
import { db } from '../../../../packages/shared/firebase.js';
import { deleteDoc, doc } from 'firebase/firestore';
import {
  Search, Filter, Download, MoreVertical, Edit, Trash2,
  Plus, ArrowRight, ChevronRight, PackageOpen
} from 'lucide-react';

/* ── Skeleton Row ── */
function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-100 rounded" />
            <div className="h-3 w-20 bg-gray-100 rounded" />
          </div>
        </div>
      </td>
      <td className="px-8 py-6"><div className="h-4 w-24 bg-gray-100 rounded" /></td>
      <td className="px-8 py-6"><div className="h-4 w-16 bg-gray-100 rounded" /></td>
      <td className="px-8 py-6"><div className="h-3 w-28 bg-gray-100 rounded" /></td>
      <td className="px-8 py-6"><div className="h-6 w-20 bg-gray-100 rounded-full" /></td>
      <td className="px-8 py-6" />
    </tr>
  );
}

const STATUS_LABEL = { in_stock: 'In Stock', low_stock: 'Low Stock', out_of_stock: 'Out of Stock' };
const STATUS_COLOR = {
  in_stock: 'bg-green-50 text-green-700',
  low_stock: 'bg-amber-50 text-amber-700',
  out_of_stock: 'bg-red-50 text-red-700',
};
const STATUS_DOT = {
  in_stock: 'bg-green-500',
  low_stock: 'bg-amber-500',
  out_of_stock: 'bg-red-500',
};

export default function InventoryPage() {
  const { data: products, loading } = useCollection('products', 'createdAt', 'desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Availability');

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All Availability' ||
      STATUS_LABEL[p.stockStatus] === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deleteDoc(doc(db, 'products', id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-sky-400" />
            <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.3em]">Live from Firestore</span>
          </div>
          <h1 className="text-3xl font-black font-montserrat text-gray-900 uppercase tracking-tighter leading-none">
            Product <span className="text-sky-500 italic">Inventory</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-x-2 py-3 px-6 rounded-xl border border-gray-200 bg-white text-gray-700 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05)]">
        <div className="relative max-w-md w-full group">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400 group-focus-within:text-sky-500 transition-colors" />
          </div>
          <input
            type="text"
            className="py-3 px-4 ps-11 block w-full border-gray-200 bg-gray-50/50 rounded-xl text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all"
            placeholder="Search by name or category…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2.5 px-4 block border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none cursor-pointer"
          >
            <option>All Availability</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05)]">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  {['Product', 'Category', 'Price', 'Stock', 'Status', ''].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className={`px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] font-montserrat ${h === '' ? 'text-end' : 'text-start'}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-16 text-center">
                      <PackageOpen className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                      <p className="text-sm text-gray-400 font-medium">
                        {products.length === 0 ? 'No products yet. Upload your first product!' : 'No products match your search.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          {p.imageUrl ? (
                            <img
                              src={p.imageUrl}
                              alt={p.title}
                              className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-300 uppercase tracking-tighter shrink-0">
                              No Img
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-bold text-gray-800 font-montserrat group-hover:text-sky-500 transition-colors line-clamp-1">
                              {p.title}
                            </div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                              {p.id?.substring(0, 8)}…
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{p.category}</span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-sm font-black text-gray-900">₹{p.price?.toLocaleString('en-IN')}</span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 w-24 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${(p.stock || 0) > 50 ? 'bg-sky-400' : (p.stock || 0) > 0 ? 'bg-amber-400' : 'bg-rose-400'}`}
                              style={{ width: `${Math.min(((p.stock || 0) / 150) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-gray-500">{p.stock ?? 0}</span>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1">{(p.sizes || []).join(', ') || '—'}</div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-[10px] font-bold uppercase tracking-widest ${STATUS_COLOR[p.stockStatus] || 'bg-gray-50 text-gray-500'}`}>
                          <span className={`w-1 h-1 rounded-full ${STATUS_DOT[p.stockStatus] || 'bg-gray-400'}`} />
                          {STATUS_LABEL[p.stockStatus] || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-end">
                        <div className="inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-xl transition-all">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between py-4 border-t border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
          Showing <span className="text-gray-600">{filtered.length}</span> / {products.length} products
        </p>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl border border-gray-100 bg-white text-gray-300 cursor-not-allowed" disabled>
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <button className="flex items-center gap-2 py-2.5 px-6 rounded-xl border border-gray-100 bg-white text-[10px] font-bold text-gray-700 uppercase tracking-widest hover:bg-gray-50 transition-all">
            Next Page <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
