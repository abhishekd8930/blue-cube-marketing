import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import CollectionGrid from '../components/CollectionGrid';
import { useDocument } from '../hooks/useFirestore.js';

export default function HomePage() {
  // Fetch site settings — drives featured grid & promotion banners
  // siteSettings is passed as a prop so PromotionBanner (in App.jsx) can
  // also consume it without a second Firestore read.
  const { data: siteSettings } = useDocument('site_settings', 'marketing_config');

  return (
    <>
      <HeroSection siteSettings={siteSettings} />
      <AboutSection />
      <CollectionGrid />
    </>
  );
}
