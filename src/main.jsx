import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Admin from './pages/Admin'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='register' element={<Register />}/>
      <Route path='login' element={<Login />}/>
      <Route path='admin' element={<Admin />}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
