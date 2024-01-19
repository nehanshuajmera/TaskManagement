import React from 'react'
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <h1 >Task Management System</h1>
      <p className='describePara'>
        Organize your tasks efficiently and collaborate seamlessly with our intuitive task management system.
      </p>
      <p className='describePara'>
        Get things done together, stay organized, and achieve your goals with ease.
      </p>
      <div className="buttons-container">
        <div>
          <button className='heroBtn'>Login</button>
        </div>
        <div>
          <button className='heroBtn'>Sign Up</button>
        </div>
      </div>
    </section>
  )
}
