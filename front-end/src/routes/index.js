import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Admin from '../pages/admin';
import Customer from '../pages/customer/Customer';
import Login from '../pages/login';
import Register from '../pages/register';
import SellerOrderDetails from '../pages/seller/OrderDetails';
import SellerOrders from '../pages/seller/Orders';

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" replace /> } />
        <Route path="/login" element={ <Login /> } />

        <Route path="/register" element={ <Register /> } />

        <Route path="/customer/*" element={ <Customer /> } />

        <Route path="/admin/manage" element={ <Admin /> } />
        <Route path="seller/orders" element={ <SellerOrders /> } />
        <Route path="seller/orders/:id" element={ <SellerOrderDetails /> } />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
