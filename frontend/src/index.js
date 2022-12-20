import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import 'semantic-ui-css/semantic.min.css';
import store from './store/store';
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
  <Provider store={store}>
   <RouterProvider router={router} />
  </Provider>
 </React.StrictMode>,
);
