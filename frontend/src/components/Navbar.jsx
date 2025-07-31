import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function Navbar({ isLoggedIn, setIsLoggedIn, increaseFont, decreaseFont }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await fetch('http://localhost:5050/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('Logout failed');
      }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <Link className="navbar-brand fw-bold" to="/">📘 MyLanguages</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vocabulary">Vocabulary</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/favorites">Favorites</Link>
          </li>
        </ul>

        <div className="d-flex align-items-center gap-2">
          {isLoggedIn ? (
            <>
              {/* <Link to="/profile" className="btn btn-light border rounded-circle">
                <FaUserCircle size={20} />
              </Link> */}
              <button className="btn btn-outline-primary" onClick={handleLogout}>
                🔒 Logout  
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-outline-secondary">Sign In</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-center px-4 py-2 bg-light border-bottom">
        <button className="btn btn-sm btn-outline-secondary me-2" onClick={decreaseFont}>A−</button>
        <button className="btn btn-sm btn-outline-secondary" onClick={increaseFont}>A+</button>
      </div>
    </nav>
  );
}

export default Navbar;
