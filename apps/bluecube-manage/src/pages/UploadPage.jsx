import React, { useState } from 'react';
import { Upload, Trash2, CheckCircle2, Info, CloudUpload, CheckCircle } from 'lucide-react';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../../packages/shared/firebase.js';

const CLOUDINARY_CLOUD_NAME = 'dl23lkcus';
const CLOUDINARY_UPLOAD_PRESET = 'bluecube marketing';

const INITIAL_FORM = {
  title: '',
  category: 'Formal Wear',
  price: '',
  description: '',
  sizes: [],
  stock: '',
};

const STATUS_FROM_STOCK = (stock) => {
  const n = parseInt(stock, 10);
  if (isNaN(n) || n === 0) return 'out_of_stock';
  if (n < 15) return 'low_stock';
  return 'in_stock';
};

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
  const [form, setForm] = useState(INITIAL_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | uploading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  /* ── Field helpers ── */
  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleSize = (size) =>
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return;

    setStatus('uploading');
    setUploadProgress(0);
    setErrorMsg('');

    try {
      let imageUrl = '';

      if (imageFile) {
        // Step 1: Upload image to Cloudinary
        imageUrl = await new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('file', imageFile);
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const pct = Math.round((event.loaded / event.total) * 100);
              setUploadProgress(pct);
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              resolve(response.secure_url);
            } else {
              const response = JSON.parse(xhr.responseText);
              reject(new Error(response.error?.message || 'Cloudinary upload failed'));
            }
          };

          xhr.onerror = () => reject(new Error('Network error during upload'));
          xhr.send(formData);
        });
      }

      // Step 2: Save product document to Firestore
      await addDoc(collection(db, 'products'), {
        title: form.title,
        category: form.category,
        price: parseFloat(form.price),
        description: form.description,
        sizes: form.sizes,
        stock: parseInt(form.stock, 10) || 0,
        stockStatus: STATUS_FROM_STOCK(form.stock),
        imageUrl,
        featured: false,
        createdAt: serverTimestamp(),
      });

      setStatus('success');
      setForm(INITIAL_FORM);
      setImageFile(null);
      setImagePreview(null);
      setUploadProgress(0);

      // Reset to idle after 3s
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Upload failed:', err);
      setErrorMsg(err.message || 'Upload failed. Please try again.');
      setStatus('error');
    }
  };

  const isUploading = status === 'uploading';

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Upload New Collection</h1>
        <p className="text-sm text-gray-400 font-medium mt-1">Publish a new garment to your wholesale catalog and website.</p>
      </div>

      {/* Success Toast */}
      {status === 'success' && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 font-semibold text-sm animate-slide-down">
          <CheckCircle className="w-5 h-5 shrink-0" />
          Product published successfully! It will appear on the website shortly.
        </div>
      )}

      {/* Error Toast */}
      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 font-semibold text-sm animate-slide-down">
          {errorMsg}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>

        {/* Basic Information */}
        <SectionBlock icon={Info} iconColor="text-sky-500" title="Basic Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">
                Product Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all placeholder:text-gray-300"
                placeholder="e.g. Signature Linen Blazer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all text-gray-700"
              >
                {['Formal Wear', 'Casual Wear', 'Outerwear', 'Bottoms', 'Knitwear', 'Accessories', 'Footwear'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">
                Base Price (₹) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pl-9 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all"
                  placeholder="0.00"
                />
                <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 text-sm pointer-events-none">₹</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">Stock Quantity</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all"
                placeholder="e.g. 50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">Internal SKU</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                placeholder="BC-AUTO-GEN"
                disabled
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">Detailed Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all resize-none placeholder:text-gray-300"
                placeholder="Describe the fabric, fit, and heritage details..."
              />
            </div>
          </div>
        </SectionBlock>

        {/* Size & Inventory */}
        <SectionBlock icon={CheckCircle2} iconColor="text-emerald-500" title="Size & Inventory">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-600 font-montserrat uppercase tracking-wider">Available Sizes</label>
            <div className="flex flex-wrap gap-2.5">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`py-2 px-5 border rounded-xl text-sm font-semibold transition-all ${
                    form.sizes.includes(size)
                      ? 'bg-sky-500 text-white border-sky-500'
                      : 'border-gray-200 text-gray-500 hover:border-sky-300 hover:text-sky-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </SectionBlock>

        {/* Media Upload */}
        <SectionBlock icon={Upload} iconColor="text-sky-500" title="Product Image">
          {imagePreview ? (
            <div className="relative w-40 h-52 rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={handleImageSelect}
              />
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center bg-gray-50/40 hover:bg-sky-50/30 hover:border-sky-300 transition-all duration-200">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <CloudUpload className="w-7 h-7 text-sky-400" />
                </div>
                <p className="text-sm font-bold text-gray-800 font-montserrat">Click to upload product image</p>
                <p className="text-xs text-gray-400 mt-1.5 uppercase tracking-widest">PNG or JPG (max. 10MB)</p>
              </div>
            </div>
          )}

          {/* Upload progress bar */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-500">
                <span>Uploading to Cloudinary…</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-400 rounded-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </SectionBlock>

        {/* Submit Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-2 pb-8">
          <button
            type="button"
            onClick={() => { setForm(INITIAL_FORM); setImageFile(null); setImagePreview(null); }}
            className="w-full sm:w-auto py-3 px-8 text-sm font-bold text-gray-400 hover:text-gray-700 active:bg-gray-200 transition-colors rounded-xl hover:bg-gray-100"
            disabled={isUploading}
          >
            Reset Form
          </button>
          <button
            type="submit"
            id="upload-publish-btn"
            disabled={isUploading || !form.title || !form.price}
            className="w-full sm:w-auto py-3 px-10 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-full shadow-sm shadow-emerald-200 transition-all duration-200 sm:min-w-[180px] text-center"
          >
            {isUploading ? `Uploading… ${uploadProgress}%` : 'Publish to Catalog'}
          </button>
        </div>
      </form>
    </div>
  );
}
