import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Play from './pages/Play';
import Auth from './pages/Auth';
import 'semantic-ui-css/semantic.min.css';

const router = createBrowserRouter([
 {
  path: '/',
  element: <Home />,
 },
 {
  path: '/play',
  element: <Play />,
 },
 {
  path: '/auth',
  element: <Auth />,
 },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
  <RouterProvider router={router} />
 </React.StrictMode>,
);
