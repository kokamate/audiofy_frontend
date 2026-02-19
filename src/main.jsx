import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Logged from './pages/Logged.jsx'
import Register from './pages/Register.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Home />} />
      <Route path='/logged' element={<Logged />} />
    </Routes>
  </BrowserRouter>,
)
