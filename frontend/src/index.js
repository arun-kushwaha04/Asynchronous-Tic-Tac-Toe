import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import 'semantic-ui-css/semantic.min.css';
import Home from './pages/Home';
import Play from './pages/Play';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewGame from './pages/NewGame';

const router = createBrowserRouter([
 {
  path: '/',
  element: <Home />,
 },
 {
  path: '/play/:gameId',
  element: <Play />,
 },
 {
  path: '/register',
  element: <Register />,
 },
 {
  path: '/login',
  element: <Login />,
 },
 {
  path: '/dashboard',
  element: <Dashboard />,
 },
 { path: '/newGame', element: <NewGame /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
  <RouterProvider router={router} />
 </React.StrictMode>,
);
