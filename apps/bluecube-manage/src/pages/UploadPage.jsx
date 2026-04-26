import React, { useState } from 'react';
import { Upload, Trash2, CheckCircle2, Info, CloudUpload } from 'lucide-react';

function SectionBlock({ icon: Icon, iconColor, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05)] p-6 space-y-5">
      <div className="flex items-center gap-2.5 border-b border-gray-50 pb-4">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <h2 className="text-sm font-bold font-montserrat uppercase tracking-widest text-gray-700">{title}</h2>
      </div>
      {children}
    </div>
  );
}

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
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Upload New Collection</h1>
        <p className="text-sm text-gray-400 font-medium mt-1">Publish a new garment to your wholesale catalog.</p>
      </div>

      <form className="space-y-6">

        {/* Basic Information */}
        <SectionBlock icon={Info} iconColor="text-sky-500" title="Basic Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">
                Product Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all placeholder:text-gray-300"
                placeholder="e.g. Signature Linen Blazer"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">
                Category
              </label>
              <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all text-gray-700">
                <option>Formal Wear</option>
                <option>Casual Wear</option>
                <option>Outerwear</option>
                <option>Bottoms</option>
                <option>Knitwear</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">
                Base Price (₹)
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pl-9 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all"
                  placeholder="0.00"
                />
                <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 text-sm pointer-events-none">₹</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">
                Internal SKU
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                placeholder="BC-AUTO-GEN"
                disabled
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">
                Detailed Description
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all resize-none placeholder:text-gray-300"
                placeholder="Describe the fabric, fit, and heritage details..."
              />
            </div>
          </div>
        </SectionBlock>

        {/* Size & Inventory */}
        <SectionBlock icon={CheckCircle2} iconColor="text-emerald-500" title="Size & Inventory">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-2.5">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'].map((size) => (
                <label key={size} className="group cursor-pointer">
                  <input type="checkbox" className="hidden peer" />
                  <div className="py-2 px-5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 peer-checked:bg-sky-500 peer-checked:text-white peer-checked:border-sky-500 transition-all hover:border-sky-300 hover:text-sky-500">
                    {size}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </SectionBlock>

        {/* Media Upload */}
        <SectionBlock icon={Upload} iconColor="text-sky-500" title="Media & Visuals">
          <div className="relative group">
            <input
              type="file"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={handleFileChange}
            />
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center bg-gray-50/40 hover:bg-sky-50/30 hover:border-sky-300 transition-all duration-200">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mx-auto mb-4 group-hover:scale-105 transition-transform">
                <CloudUpload className="w-7 h-7 text-sky-400" />
              </div>
              <p className="text-sm font-bold text-gray-800 font-montserrat">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1.5 uppercase tracking-widest">
                PNG, JPG or MP4 (max. 50MB)
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square border border-gray-100 rounded-xl overflow-hidden bg-gray-50 group shadow-sm"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">
                    {file.type.includes('image') ? 'Image' : 'Video'}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    aria-label="Remove file"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <p className="absolute bottom-0 inset-x-0 bg-white/90 px-2 py-1.5 text-[9px] font-bold truncate border-t border-gray-100">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </SectionBlock>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-2 pb-8">
          <button
            type="button"
            className="py-3 px-8 text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors rounded-xl hover:bg-gray-100"
          >
            Save Draft
          </button>
          <button
            type="submit"
            id="upload-publish-btn"
            className="py-3 px-10 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-bold rounded-full shadow-sm shadow-emerald-200 hover:shadow-md hover:shadow-emerald-200 transition-all duration-200"
          >
            Publish to Catalog
          </button>
        </div>
      </form>
    </div>
  );
}
