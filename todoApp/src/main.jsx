import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  // {
  //   path: "/home",
  //   element: <App></App>,
  // },
  // {
  //   path: "/login",
  //   element: <Login></Login>
  // },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
