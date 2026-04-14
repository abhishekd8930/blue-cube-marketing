import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import InventoryPage from './pages/InventoryPage';
import UploadPage from './pages/UploadPage';

import 'preline';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={
          <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold font-montserrat text-primary-navy uppercase tracking-tight italic">
              Dashboard <span className="text-secondary-gold not-italic">Overview</span>
            </h1>
            <p className="text-gray-500 mt-2">Welcome to the Blue Cube administration portal.</p>
          </div>
        } />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="upload" element={<UploadPage />} />
      </Route>
    </Routes>
  );
}

export default App;
