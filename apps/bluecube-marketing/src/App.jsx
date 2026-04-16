import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';

import 'preline';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);

  return (
    <div className="max-w-[1440px] mx-auto min-h-screen bg-white selection:bg-accent-blue/20 selection:text-accent-blue overflow-x-clip relative">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
