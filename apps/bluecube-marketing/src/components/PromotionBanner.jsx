import React, { useState } from 'react';
import { X, Tag, Zap } from 'lucide-react';

/**
 * Promotion banner driven by site_settings/marketing_config.
 * Renders between <Header> and <main> when any sale is active.
 *
 * Props:
 *   settings: { summerSale, festiveDiscounts, endOfSeasonClearance, newArrivalsLaunch } | null
 */

const BANNERS = [
  {
    key: 'summerSale',
    message: '☀️ Summer Sale is LIVE — enjoy 20% off all orders!',
    color: 'bg-sky-500',
    textColor: 'text-white',
  },
  {
    key: 'festiveDiscounts',
    message: '🎉 Festive Discounts are here — shop the celebration collection!',
    color: 'bg-amber-400',
    textColor: 'text-amber-900',
  },
  {
    key: 'endOfSeasonClearance',
    message: '🏷️ End-of-Season Clearance — up to 40% off outgoing lines.',
    color: 'bg-rose-500',
    textColor: 'text-white',
  },
  {
    key: 'newArrivalsLaunch',
    message: '✨ New Arrivals are in — explore the latest trouser collection.',
    color: 'bg-emerald-500',
    textColor: 'text-white',
  },
];

export default function PromotionBanner({ settings }) {
  const [dismissed, setDismissed] = useState([]);

  if (!settings) return null;

  const activeBanners = BANNERS.filter(
    (b) => settings[b.key] === true && !dismissed.includes(b.key)
  );

  if (activeBanners.length === 0) return null;

  // Show only the first active, un-dismissed banner
  const banner = activeBanners[0];

  return (
    <div
      className={`w-full ${banner.color} ${banner.textColor} py-2.5 px-4 flex items-center justify-center gap-3 relative text-sm font-semibold animate-slide-down`}
      role="alert"
    >
      <Tag className="w-4 h-4 shrink-0" />
      <span>{banner.message}</span>
      <button
        onClick={() => setDismissed((prev) => [...prev, banner.key])}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
