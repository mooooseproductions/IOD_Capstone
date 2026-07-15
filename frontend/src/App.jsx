import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import NavigationBar from './components/navigationBar'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import BrewPage from './pages/BrewPage';
import { Route, Routes } from 'react-router'

import './App.css'
import ProtectedRoute from './components/routeProtector'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/brewing" element={<ProtectedRoute><BrewPage /></ProtectedRoute>} />
        <Route path="/brewing/:brewId" element={<ProtectedRoute><BrewPage /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
