import React, { useState } from 'react';
import { useCollection, useDocument } from '../hooks/useFirestore.js';
import { db } from '../../../../packages/shared/firebase.js';
import {
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  Zap, Tag, Star, Plus, Trash2, ShoppingBag, PackageOpen
} from 'lucide-react';

/* ─────────────────────────────────────────
   Sale config — maps UI label ↔ Firestore field
───────────────────────────────────────── */
const SALE_CONFIG = [
  { key: 'summerSale',            label: 'Summer Sale',             description: 'Site-wide 20% off summer essentials'       },
  { key: 'festiveDiscounts',      label: 'Festive Discounts',        description: 'Seasonal festival offers across catalog'    },
  { key: 'endOfSeasonClearance',  label: 'End-of-Season Clearance',  description: 'Clearance on outgoing collection lines'     },
  { key: 'newArrivalsLaunch',     label: 'New Arrivals Launch',      description: 'Spotlight pricing on new trouser range'     },
];

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */
function SectionCard({ icon: Icon, iconColor, title, subtitle, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05)] overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-montserrat font-bold text-gray-900 text-base leading-tight">{title}</h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 w-40 bg-gray-100 rounded" />
        <div className="h-3 w-56 bg-gray-100 rounded" />
      </div>
      <div className="w-10 h-6 bg-gray-100 rounded-full" />
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function MarketingControlCenter() {
  /* ── Firestore listeners ── */
  const { data: siteSettingsData, loading: settingsLoading } = useDocument('site_settings', 'marketing_config');
  const { data: offers, loading: offersLoading } = useCollection('offers', 'createdAt', 'desc');
  const { data: products, loading: productsLoading } = useCollection('products', 'createdAt', 'desc');

  /* ── Local UI state ── */
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [newOffer, setNewOffer] = useState({ code: '', type: 'Percentage', discount: '', expiry: '' });
  const [savingOffer, setSavingOffer] = useState(false);

  // Merge Firestore data with defaults
  const settings = siteSettingsData || {};
  const activeSalesCount = SALE_CONFIG.filter(s => settings[s.key] === true).length;

  /* ── Handlers ── */
  const toggleSale = async (key) => {
    const current = settings[key] ?? false;
    await setDoc(
      doc(db, 'site_settings', 'marketing_config'),
      { [key]: !current },
      { merge: true }
    );
  };

  const addOffer = async (e) => {
    e.preventDefault();
    if (!newOffer.code || !newOffer.discount) return;
    setSavingOffer(true);
    try {
      await addDoc(collection(db, 'offers'), {
        ...newOffer,
        code: newOffer.code.toUpperCase(),
        createdAt: serverTimestamp(),
      });
      setNewOffer({ code: '', type: 'Percentage', discount: '', expiry: '' });
      setShowOfferForm(false);
    } finally {
      setSavingOffer(false);
    }
  };

  const deleteOffer = async (id) => {
    await deleteDoc(doc(db, 'offers', id));
  };

  const toggleFeatured = async (productId, currentFeatured) => {
    await updateDoc(doc(db, 'products', productId), { featured: !currentFeatured });
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Marketing Control Center</h1>
        <p className="text-sm text-gray-400 font-medium mt-1">
          Manage seasonal promotions, discount codes, and homepage product placement — all changes sync instantly.
        </p>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Active Sales',      value: activeSalesCount,                         color: 'text-emerald-600' },
          { label: 'Live Offers',       value: offersLoading ? '—' : offers.length,      color: 'text-sky-600'     },
          { label: 'Featured Products', value: productsLoading ? '—' : products.filter(p => p.featured).length, color: 'text-violet-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05)] px-6 py-4 flex items-center gap-4">
            <span className={`text-3xl font-bold font-montserrat ${stat.color}`}>{stat.value}</span>
            <span className="text-sm font-medium text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── A: Seasonal Sales Toggles ─── */}
        <SectionCard
          icon={Zap}
          iconColor="bg-amber-50 text-amber-500"
          title="Seasonal Sales"
          subtitle="Changes sync instantly to the marketing site"
        >
          {settingsLoading ? (
            <>
              <SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow />
            </>
          ) : (
            SALE_CONFIG.map((sale) => {
              const isActive = settings[sale.key] === true;
              return (
                <div key={sale.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 py-4 border-b border-gray-50 last:border-0">
                  <div className="flex-1 w-full min-w-0 pr-4">
                    <p className="text-sm font-semibold text-gray-800">{sale.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{sale.description}</p>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto gap-3 shrink-0">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full transition-all ${
                      isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                    <label className="toggle-switch" title={`Toggle ${sale.label}`}>
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => toggleSale(sale.key)}
                      />
                      <span className="toggle-track" />
                    </label>
                  </div>
                </div>
              );
            })
          )}
        </SectionCard>

        {/* ── B: Offer Manager ─── */}
        <SectionCard
          icon={Tag}
          iconColor="bg-sky-50 text-sky-500"
          title="Offer Manager"
          subtitle="Add or remove discount codes and BOGO deals"
        >
          {offersLoading ? (
            <div className="space-y-3 animate-pulse">
              {[1,2,3].map(i => <div key={i} className="h-10 bg-gray-100 rounded-xl" />)}
            </div>
          ) : (
            <div className="overflow-x-auto w-full pb-2">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold border-b border-gray-50">
                    <th className="text-left pb-3 px-1">Code</th>
                    <th className="text-left pb-3 px-1">Type</th>
                    <th className="text-left pb-3 px-1">Value</th>
                    <th className="text-left pb-3 px-1">Expiry</th>
                    <th className="pb-3 px-1" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {offers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-sm text-gray-400">
                        No offers yet. Add your first one below.
                      </td>
                    </tr>
                  ) : offers.map(offer => (
                    <tr key={offer.id} className="group hover:bg-gray-50/60 transition-colors">
                      <td className="py-3 px-1">
                        <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                          {offer.code}
                        </span>
                      </td>
                      <td className="py-3 px-1 text-gray-500 text-xs">{offer.type}</td>
                      <td className="py-3 px-1 font-semibold text-gray-700 text-xs">{offer.discount}</td>
                      <td className="py-3 px-1 text-gray-400 text-xs">{offer.expiry || '—'}</td>
                      <td className="py-3 px-1 text-right">
                        <button
                          onClick={() => deleteOffer(offer.id)}
                          className="p-1.5 rounded-lg text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                          aria-label={`Delete ${offer.code}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {showOfferForm ? (
            <form onSubmit={addOffer} className="mt-5 p-4 bg-sky-50/60 rounded-xl border border-sky-100 animate-slide-down space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500 block mb-1">Code</label>
                  <input
                    type="text"
                    value={newOffer.code}
                    onChange={e => setNewOffer(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
                    placeholder="DISCOUNT10"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500 block mb-1">Type</label>
                  <select
                    value={newOffer.type}
                    onChange={e => setNewOffer(p => ({ ...p, type: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
                  >
                    <option>Percentage</option>
                    <option>Flat Amount</option>
                    <option>Buy 1 Get 1</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500 block mb-1">Discount Value</label>
                  <input
                    type="text"
                    value={newOffer.discount}
                    onChange={e => setNewOffer(p => ({ ...p, discount: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
                    placeholder="20% or ₹500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500 block mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={newOffer.expiry}
                    onChange={e => setNewOffer(p => ({ ...p, expiry: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-1">
                <button type="button" onClick={() => setShowOfferForm(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors rounded-lg">Cancel</button>
                <button type="submit" disabled={savingOffer} className="px-4 py-2 text-sm font-semibold bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-60">
                  {savingOffer ? 'Saving…' : 'Save Offer'}
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowOfferForm(true)}
              className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-sky-300 rounded-xl text-sky-500 text-sm font-semibold hover:bg-sky-50 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Offer
            </button>
          )}
        </SectionCard>
      </div>

      {/* ── C: Featured Product Grid ─── */}
      <div className="mt-6">
        <SectionCard
          icon={Star}
          iconColor="bg-violet-50 text-violet-500"
          title="Featured Product Grid"
          subtitle="Click a product to toggle it on the marketing site homepage"
        >
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="p-4 rounded-xl border-2 border-gray-100 animate-pulse">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl mb-3" />
                  <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
                  <div className="h-3 w-20 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center">
              <PackageOpen className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400 font-medium">No products in Firestore yet.</p>
              <p className="text-xs text-gray-300 mt-1">Upload a product first to feature it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(product => (
                <div
                  key={product.id}
                  onClick={() => toggleFeatured(product.id, product.featured)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer select-none transition-all duration-200 ${
                    product.featured
                      ? 'border-emerald-400 bg-emerald-50/40 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-10 h-10 rounded-xl object-cover mb-3 border border-gray-100"
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${product.featured ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                      <ShoppingBag className={`w-5 h-5 ${product.featured ? 'text-emerald-600' : 'text-gray-400'}`} />
                    </div>
                  )}
                  <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-1">{product.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                  {product.featured && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <Star className="w-2.5 h-2.5 fill-emerald-500" /> Featured
                    </span>
                  )}
                  <span className="mt-2 inline-block text-[10px] font-mono text-gray-400">
                    ₹{product.price?.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-400 text-center mt-5 font-medium">
            Click any card to toggle it on / off the homepage spotlight. Changes are instant.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
