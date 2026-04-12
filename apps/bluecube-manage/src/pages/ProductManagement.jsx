import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Image as ImageIcon } from 'lucide-react';

export default function ProductManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mocked state
  const products = [
    { id: 'PRD-001', title: 'Classic Tailored Suit', price: 8999, category: 'Formal Wear', stock: 45, status: 'Active' },
    { id: 'PRD-002', title: 'Premium Cotton Shirt', price: 2499, category: 'Casual Wear', stock: 120, status: 'Active' },
    { id: 'PRD-003', title: 'Structured Linen Blazer', price: 5499, category: 'Outerwear', stock: 12, status: 'Low Stock' },
    { id: 'PRD-004', title: 'Signature Chinos', price: 2999, category: 'Bottoms', stock: 0, status: 'Out of Stock' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Product Management</h1>
          <p className="text-gray-500 font-medium mt-1 text-sm">Manage inventory, prices, and catalogs.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      {/* Table Actions */}
      <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0 flex gap-4 items-center shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search products by ID or Title..." 
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none transition-shadow"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden shadow-sm shadow-gray-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider font-semibold text-gray-500">
                <th className="px-6 py-4">Product ID</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-gray-600">{product.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{product.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">₹{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">{product.stock} units</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold leading-none
                      ${product.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 
                        product.status === 'Low Stock' ? 'bg-amber-100 text-amber-800' : 
                        'bg-rose-100 text-rose-800'}
                    `}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h3 className="text-lg font-bold text-gray-900">Add New Product</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none font-light"
              >&times;</button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Product Title</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" placeholder="e.g. Classic Tailored Suit" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
                    <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none">
                      <option>Formal Wear</option>
                      <option>Casual Wear</option>
                      <option>Outerwear</option>
                      <option>Bottoms</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available Sizes</label>
                  <div className="flex gap-3">
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <label key={size} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Media Upload</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-blue-600">Click to upload <span className="text-gray-500">or drag and drop</span></p>
                    <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or MP4 (max. 10MB)</p>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-gray-50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 bg-white rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                Save Product
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
