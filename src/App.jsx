import React from 'react'
import Header from './Universal/Header'
import HeroSection from './pages/HeroSection/HeroSection'
import Login from './pages/Login/Login'
import CreateTask from './pages/CreateTask/CreateTask'

export default function App() {
  return (
    <div>
      <Header />
      {/* <HeroSection /> */}
      {/* <Login/> */}
      <CreateTask/>
    </div>
  )
}
