import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical, Edit, Trash2, Plus, ArrowRight, ChevronRight } from 'lucide-react';

const MOCK_INVENTORY = [
  { id: 'BC-001', name: 'Signature Linen Shirt', category: 'Formal Wear', price: 2499, status: 'In Stock', sizes: 'S, M, L, XL', stock: 45 },
  { id: 'BC-002', name: 'Classic Tailored Suit', category: 'Formal Wear', price: 12999, status: 'Low Stock', sizes: '40, 42, 44', stock: 8 },
  { id: 'BC-003', name: 'Straight Cut Denim', category: 'Bottoms', price: 3299, status: 'In Stock', sizes: '30, 32, 34, 36', stock: 120 },
  { id: 'BC-004', name: 'Merino Wool Sweater', category: 'Knitwear', price: 4599, status: 'Out of Stock', sizes: 'M, L', stock: 0 },
  { id: 'BC-005', name: 'Urban Cargo Pants', category: 'Bottoms', price: 2899, status: 'In Stock', sizes: 'S, M, L', stock: 64 },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = MOCK_INVENTORY.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-accent-blue"></span>
            <span className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.3em]">Operational Catalog</span>
          </div>
          <h1 className="text-3xl font-black font-montserrat text-primary-navy uppercase tracking-tighter leading-none">
            Product <span className="text-accent-blue italic">Inventory</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-x-2 py-3 px-6 rounded-sm border border-gray-200 bg-white text-gray-700 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="inline-flex items-center gap-x-2 py-3 px-8 rounded-sm bg-primary-navy text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/10">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters & Search - Glassmorphism style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-sm border border-gray-100 shadow-sm transition-all">
        <div className="relative max-w-md w-full group">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400 group-focus-within:text-primary-navy transition-colors" />
          </div>
          <input 
            type="text" 
            className="py-3 px-4 ps-11 block w-full border-gray-200 bg-gray-50/50 rounded-sm text-sm focus:border-primary-navy focus:ring-0 focus:bg-white transition-all" 
            placeholder="Search by name, category or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</span>
          </div>
          <select className="py-2.5 px-4 block border-gray-200 rounded-sm text-xs font-bold uppercase tracking-widest text-gray-700 focus:border-primary-navy focus:ring-0 cursor-pointer">
            <option>All Availability</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border border-gray-100 rounded-sm overflow-hidden bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th scope="col" className="px-8 py-5 text-start text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] font-montserrat">Product Identity</th>
                    <th scope="col" className="px-8 py-5 text-start text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] font-montserrat">Classification</th>
                    <th scope="col" className="px-8 py-5 text-start text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] font-montserrat">Valuation</th>
                    <th scope="col" className="px-8 py-5 text-start text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] font-montserrat">Inventory Details</th>
                    <th scope="col" className="px-8 py-5 text-start text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] font-montserrat">Lifecycle</th>
                    <th scope="col" className="px-8 py-5 text-end text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] font-montserrat">Options</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-50 rounded-sm border border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-300 uppercase tracking-tighter">No Img</div>
                          <div>
                            <div className="text-sm font-bold text-primary-navy font-montserrat group-hover:text-accent-blue transition-colors">{p.name}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{p.category}</span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-sm font-black text-primary-navy">₹{p.price.toLocaleString('en-IN')}</span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{p.sizes}</div>
                        <div className="flex items-center gap-2">
                           <div className="flex-1 h-1 w-24 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${p.stock > 50 ? 'bg-primary-navy' : p.stock > 0 ? 'bg-amber-500' : 'bg-red-400'}`} 
                                style={{ width: `${Math.min((p.stock/150)*100, 100)}%` }}
                              ></div>
                           </div>
                           <span className="text-[10px] font-black text-gray-500">{p.stock}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          p.status === 'In Stock' ? 'bg-green-50 text-green-700' : 
                          p.status === 'Low Stock' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                        }`}>
                          <span className={`w-1 h-1 rounded-full ${
                             p.status === 'In Stock' ? 'bg-green-500' : 
                             p.status === 'Low Stock' ? 'bg-amber-500' : 'bg-red-500'
                          }`}></span>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-end">
                        <div className="inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-400 hover:text-primary-navy hover:bg-gray-100 rounded-sm transition-all">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-900 rounded-sm transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Container */}
      <div className="flex items-center justify-between py-4 border-t border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
          Displaying <span className="text-primary-navy">{filteredProducts.length}</span> / {MOCK_INVENTORY.length} Units
        </p>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-sm border border-gray-100 bg-white text-gray-300 cursor-not-allowed" disabled>
             <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <button className="flex items-center gap-2 py-2.5 px-6 rounded-sm border border-gray-100 bg-white text-[10px] font-bold text-primary-navy uppercase tracking-widest hover:bg-gray-50 transition-all">
             Next Page <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
