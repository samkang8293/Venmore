import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Payment from './pages/Payment.jsx'

function App() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const getUser = async (url) => {
        try {
            const res = await fetch(url)
            const status = await res.json()

            if (status) {
                setUser(status.user)
            }
        } catch (e) {
            console.error(e)
        }
    }
    getUser('/login')
}, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
