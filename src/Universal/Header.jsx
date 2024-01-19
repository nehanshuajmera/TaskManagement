import React from 'react'
// import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <div className='header'>
      <div className="navbar">
        <div className="myLogo-Heading">
          <h4><span style={{ color: '#F59E0B' }}>Task</span> Management</h4>
        </div>
        <div className="navUtility">
          <div className="utilities">
            {/* <Link to=''>Task List</Link> */}
            Task List
          </div>
          <div className="utilities">
            Create Task
          </div>
          <div className="utilities">
            Notifications
          </div>
          <div className="loginBtn">
            <button>Login</button>
          </div>
          <div className="signUpBtn">
            <button>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}
