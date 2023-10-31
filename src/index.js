import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Chart, Calendar } from './Components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/chart' element={<Chart />} />
        <Route path='/calendar' element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);