import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/index';

export default function Routers() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}
