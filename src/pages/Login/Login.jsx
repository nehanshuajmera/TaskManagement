import React, {useState} from 'react'
import './Login.css'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your authentication logic here
    // For simplicity, just displaying a message
    setMessage(`Logging in with email: ${email} and password: ${password}`);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Implement your registration logic here
    // For simplicity, just displaying a message
    setMessage(`Registering with email: ${email} and password: ${password}`);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Implement your password reset logic here
    // For simplicity, just displaying a message
    setMessage(`Password reset request for email: ${resetEmail}`);
  };

  return (
    <div>
      {isRegistered ? (
        <form className='loginForm' onSubmit={handleLogin}>
          <h2>Login</h2>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className='loginButton' type="submit">Login</button>
          <p>
            Don't have an account?{' '}
            <span onClick={() => setIsRegistered(false)} style={{ cursor: 'pointer', color: 'blue' }}>
              Register here
            </span>
          </p>
          <p>
            Forgot your password?{' '}
            <span onClick={() => setIsRegistered(true)} style={{ cursor: 'pointer', color: 'blue' }}>
              Reset it here
            </span>
          </p>
        </form>
      ) : (
        <form className='loginForm' onSubmit={handleRegister}>
          <h2>Register</h2>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className='loginButton' type="submit">Register</button>
          <p>
            Already have an account?{' '}
            <span onClick={() => setIsRegistered(true)} style={{ cursor: 'pointer', color: 'blue' }}>
              Login here
            </span>
          </p>
        </form>
      )}

      {!isRegistered && (
        <form className='loginForm' onSubmit={handleResetPassword}>
          <h2>Reset Password</h2>
          <label>Email:</label>
          <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
          <button className='loginButton' type="submit">Reset Password</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  )
}
