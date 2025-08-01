import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [message, setMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, username, email, password }),  
    });

    const data = await res.json();
    alert(data.message || data.error);

    if (res.status === 409) {
      setMessage('Username or email already exists.');
      alert(message);
    } else {
      setMessage('Signup successful!');
      navigate('/signin');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form 
        onSubmit={handleSubmit} 
        className="p-4 p-md-5 bg-white rounded shadow" 
        style={{ width: '100%', maxWidth: '500px' }} // wider for side by side
      >
        <h2 className="mb-4 text-center fw-bold">Sign Up</h2>

        {/** Each label and input in a flex row with spacing **/}
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="firstName" className="form-label me-3" style={{minWidth: '120px'}}>
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="lastName" className="form-label me-3" style={{minWidth: '120px'}}>
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="username" className="form-label me-3" style={{minWidth: '120px'}}>
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="email" className="form-label me-3" style={{minWidth: '120px'}}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-4 d-flex align-items-center">
          <label htmlFor="password" className="form-label me-3" style={{minWidth: '120px'}}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>

        <div className="text-center">
          <p className="mb-1">Already have an account?</p>
          <Link to="/signin" className="text-decoration-none">Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
