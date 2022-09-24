import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Customer from '../pages/customer/Customer';
import Login from '../pages/login';
import Register from '../pages/register';

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" replace /> } />
        <Route path="/login" element={ <Login /> } />

        <Route path="/register" element={ <Register /> } />

        <Route path="/customer/*" element={ <Customer /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
