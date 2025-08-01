import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignIn({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogIn = async (e) => { 
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }), 
    });

    if (res.ok) {
      setIsLoggedIn(true);
      navigate('/vocabulary');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form 
        onSubmit={handleLogIn} 
        className="p-4 p-md-5 bg-white rounded shadow" 
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h2 className="mb-4 text-center fw-bold">Sign In</h2>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            type="text" 
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">Sign In</button>

        <div className="text-center">
          <p className="mb-1">Don’t have an account?</p>
          <Link to="/signup" >Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
