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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/brewing" element={<BrewPage />} />
      </Routes>
    </>
  )
}

export default App
