import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CollectionGrid from './components/CollectionGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-200">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <CollectionGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;
