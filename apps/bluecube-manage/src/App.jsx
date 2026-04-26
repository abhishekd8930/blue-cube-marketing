import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './pages/DashboardHome';
import InventoryPage from './pages/InventoryPage';
import UploadPage from './pages/UploadPage';
import MarketingControlCenter from './pages/MarketingControlCenter';

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
        <Route index           element={<DashboardHome />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="upload"    element={<UploadPage />} />
        <Route path="marketing" element={<MarketingControlCenter />} />
      </Route>
    </Routes>
  );
}

export default App;
