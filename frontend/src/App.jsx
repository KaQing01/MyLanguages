import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './pages/Profile';
import Vocabulary from './pages/Vocabulary';
import Favorites from './pages/Favorites';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontSize, setFontSize] = useState(16); 

  const increaseFont = () => setFontSize((size) => Math.min(size + 2, 32));
  const decreaseFont = () => setFontSize((size) => Math.max(size - 2, 12));

  return (
    <Router>
      <div style={{ fontSize: `${fontSize}px` }}>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} increaseFont={increaseFont} decreaseFont={decreaseFont}/>
        <Routes>
          <Route path="/" element={<Home fontSize={fontSize}/>} />
          <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/signin" />} />
          <Route path="/vocabulary" element={isLoggedIn ? <Vocabulary fontSize={fontSize} /> : <Navigate to="/signin" />} />
          <Route path="/favorites" element={isLoggedIn ? <Favorites fontSize={fontSize}/> : <Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
