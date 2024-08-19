import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AkrivisHomeComponent } from './Home';

export const Router = () => (
  <Routes>
    <Route path="*" element={<AkrivisHomeComponent />} />
  </Routes>
);
