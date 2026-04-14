import React, { useState } from 'react';
import { Upload, X, Trash2, CheckCircle2, Info } from 'lucide-react';

export default function UploadPage() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-montserrat text-primary-navy uppercase tracking-tight italic">
          Upload <span className="text-secondary-gold not-italic">New Collection</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Publish a new garment to your wholesale catalog.</p>
      </div>

      <form className="space-y-8">
        {/* Basic Information Section */}
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-x-2 text-primary-navy font-bold text-sm uppercase tracking-widest border-b border-gray-50 pb-4">
             <Info className="w-4 h-4" />
             Basic Details
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 font-montserrat uppercase tracking-wider">Product Name</label>
              <input type="text" className="py-3 px-4 block w-full border-gray-200 rounded-sm text-sm focus:border-primary-navy focus:ring-primary-navy placeholder:text-gray-300" placeholder="e.g. Signature Linen Blazer" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 font-montserrat uppercase tracking-wider">Category</label>
              <select className="py-3 px-4 block w-full border-gray-200 rounded-sm text-sm focus:border-primary-navy focus:ring-primary-navy">
                <option>Formal Wear</option>
                <option>Casual Wear</option>
                <option>Outerwear</option>
                <option>Bottoms</option>
                <option>Knitwear</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 font-montserrat uppercase tracking-wider">Base Price (₹)</label>
              <div className="relative">
                <input type="number" className="py-3 px-4 ps-10 block w-full border-gray-200 rounded-sm text-sm focus:border-primary-navy focus:ring-primary-navy" placeholder="0.00" />
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">₹</div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 font-montserrat uppercase tracking-wider">Internal SKU</label>
              <input type="text" className="py-3 px-4 block w-full border-gray-200 rounded-sm text-sm focus:border-primary-navy focus:ring-primary-navy" placeholder="BC-AUTO-GEN" disabled />
            </div>
          </div>

          <div className="space-y-2">
             <label className="block text-sm font-bold text-gray-700 font-montserrat uppercase tracking-wider">Detailed Description</label>
             <textarea className="py-3 px-4 block w-full border-gray-200 rounded-sm text-sm focus:border-primary-navy focus:ring-primary-navy placeholder:text-gray-300" rows="4" placeholder="Describe the fabric, fit, and heritage details..."></textarea>
          </div>
        </div>

        {/* Variations Section */}
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-x-2 text-primary-navy font-bold text-sm uppercase tracking-widest border-b border-gray-50 pb-4">
             <CheckCircle2 className="w-4 h-4 text-secondary-gold" />
             Size & Inventory
          </div>

          <div className="space-y-4">
             <label className="block text-sm font-bold text-gray-700 font-montserrat uppercase tracking-wider">Standard Sizes Available</label>
             <div className="flex flex-wrap gap-3">
               {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'].map((size) => (
                 <label key={size} className="group cursor-pointer">
                   <input type="checkbox" className="hidden peer" />
                   <div className="py-2 px-6 border border-gray-200 rounded-sm text-sm font-semibold text-gray-600 peer-checked:bg-primary-navy peer-checked:text-white peer-checked:border-primary-navy transition-all">
                     {size}
                   </div>
                 </label>
               ))}
             </div>
          </div>
        </div>

        {/* Media Upload Section */}
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-x-2 text-primary-navy font-bold text-sm uppercase tracking-widest border-b border-gray-50 pb-4">
             <Upload className="w-4 h-4 text-secondary-gold" />
             Media & Visuals
          </div>

          <div className="space-y-2">
            <div className="p-12 border-2 border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-100 transition-all cursor-pointer relative group">
              <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-primary-navy" />
              </div>
              <p className="text-sm font-bold text-gray-900 font-montserrat">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">PNG, JPG or MP4 (MAX. 50MB)</p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {files.map((file, idx) => (
                <div key={idx} className="relative aspect-square border border-gray-200 rounded-sm overflow-hidden bg-gray-50 group">
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">
                    {file.type.includes('image') ? 'Image' : 'Video'}
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <p className="absolute bottom-0 inset-x-0 bg-white/90 p-2 text-[8px] font-bold truncate border-t border-gray-100">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button type="button" className="py-3 px-8 text-sm font-bold text-gray-500 hover:text-primary-navy transition-colors">
            Save Draft
          </button>
          <button 
            type="submit" 
            className="py-4 px-12 bg-primary-navy text-white text-sm font-bold rounded-sm hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10 focus:ring-2 focus:ring-offset-2 focus:ring-primary-navy"
          >
            Publish to Catalog
          </button>
        </div>
      </form>
    </div>
  );
}
