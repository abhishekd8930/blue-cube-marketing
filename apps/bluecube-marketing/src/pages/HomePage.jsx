import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import CollectionGrid from '../components/CollectionGrid';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CollectionGrid />
    </>
  );
}
