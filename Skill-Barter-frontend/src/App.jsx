import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Messages from './components/Messages';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import './styles.css';
import Chat from './components/Chat';
import ChatWindow from './components/ChatWindow';
import SearchPage from './components/SearchPage';
import RequestPage from './components/RequestPage'
import SearchedProfile from './components/SearchedProfile';
import ExchangesPage from './components/ExchangesPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = async (email, password) => {
    try {
      // const response = await fetch('http://localhost:8080/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      const response = await fetch('https://resilient-enthusiasm-production.up.railway.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json(); // ✅ Get userId from response
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('email', email);
        localStorage.setItem('userId', data.userId); // ✅ Store userId
        return true;
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Something went wrong. Please try again later.');
      return false;
    }
  };


  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
  };

  return (
    <div className="app">
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/messages"
          element={isAuthenticated ? <Messages /> : <Navigate to="/" replace />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />}
        />
        <Route
          path="/search"
          element={isAuthenticated ? <SearchPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/request"
          element={isAuthenticated ? <RequestPage /> : <Navigate to="/" replace />}
        />

        <Route
          path="/searched-profile/:userId"
          element={isAuthenticated ? <SearchedProfile /> : <Navigate to="/" replace />}
        />


        <Route
          path="/chat/:receiverId"
          element={isAuthenticated ? <ChatWindow /> : <Navigate to="/" replace />}
        />
      
      <Route
          path="/exchanges"
          element={isAuthenticated ? <ExchangesPage/> : <Navigate to="/" replace />}
        />
      

      </Routes>
    </div>
  );
}

export default App;
