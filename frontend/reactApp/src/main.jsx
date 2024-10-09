import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Register from './components/Regitser.jsx';
import Login from './components/Login.jsx';
import Layout from './Layout.jsx';
import Home from './components/Home.jsx'
import Logout from './components/Logout.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='home' element={<Home />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login/>} />
      <Route path='logout' element={<Logout />} />
      
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
