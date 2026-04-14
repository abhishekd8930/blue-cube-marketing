import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical, Edit, Trash2 } from 'lucide-react';

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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-montserrat text-primary-navy uppercase tracking-tight italic">
            Product <span className="text-secondary-gold not-italic">Inventory</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage your catalog, stock levels, and pricing.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-x-2 py-2 px-4 rounded-sm border border-gray-200 bg-white text-gray-800 text-sm font-medium hover:bg-gray-50 transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="inline-flex items-center gap-x-2 py-2 px-4 rounded-sm bg-primary-navy text-white text-sm font-semibold hover:bg-blue-800 transition-all shadow-sm">
            Add New Product
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-sm border border-gray-100 shadow-sm transition-all">
        <div className="relative max-w-sm w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            className="py-2.5 px-4 ps-11 block w-full border-gray-200 rounded-sm text-sm focus:border-primary-navy focus:ring-primary-navy" 
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-x-2 px-3 py-2 rounded-sm border border-gray-200 text-sm font-medium text-gray-600">
            <Filter className="w-4 h-4" />
            Filter By Status
          </div>
          <select className="py-2 px-4 block w-full border-gray-200 rounded-sm text-sm focus:border-primary-navy focus:ring-primary-navy">
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Table Container (Preline Style) */}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-start text-xs font-bold text-gray-500 uppercase tracking-widest font-montserrat">Product</th>
                    <th scope="col" className="px-6 py-4 text-start text-xs font-bold text-gray-500 uppercase tracking-widest font-montserrat">Category</th>
                    <th scope="col" className="px-6 py-4 text-start text-xs font-bold text-gray-500 uppercase tracking-widest font-montserrat">Price</th>
                    <th scope="col" className="px-6 py-4 text-start text-xs font-bold text-gray-500 uppercase tracking-widest font-montserrat">Availability</th>
                    <th scope="col" className="px-6 py-4 text-start text-xs font-bold text-gray-500 uppercase tracking-widest font-montserrat">Status</th>
                    <th scope="col" className="px-6 py-4 text-end text-xs font-bold text-gray-500 uppercase tracking-widest font-montserrat">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-sm border border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">IMG</div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 font-montserrat">{p.name}</div>
                            <div className="text-xs text-gray-500">{p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{p.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900">₹{p.price.toLocaleString('en-IN')}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs text-gray-600 mb-1">{p.sizes}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{p.stock} units in warehouse</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${
                          p.status === 'In Stock' ? 'bg-green-100 text-green-800' : 
                          p.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                             p.status === 'In Stock' ? 'bg-green-600' : 
                             p.status === 'Low Stock' ? 'bg-yellow-600' : 'bg-red-600'
                          }`}></span>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <div className="inline-flex items-center gap-1">
                          <button className="p-2 text-gray-400 hover:text-primary-navy hover:bg-white rounded-sm transition-all border border-transparent hover:border-gray-200">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-sm transition-all border border-transparent hover:border-gray-200">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-900">
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

      {/* Pagination (Preline Style) */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-gray-600 font-light italic">
          Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> of <span className="font-bold text-gray-900">{MOCK_INVENTORY.length}</span> results
        </p>
        <div className="inline-flex gap-2">
          <button className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-sm border border-gray-200 bg-white text-gray-400 disabled:opacity-50 disabled:pointer-events-none" disabled>Previous</button>
          <button className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-sm border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-all">Next</button>
        </div>
      </div>
    </div>
  );
}
