  import React from 'react';
  import { Link, useLocation, useNavigate } from 'react-router-dom';
  import { Home, MessageCircle, User, LogOut, Sparkles,Bell,Search,ArrowLeftRight } from 'lucide-react';

  function Navbar({ onLogout }) {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
      // Call the logout function passed via props
      onLogout();
      // Redirect to the login page after logging out
      navigate('/');
    };

    return (
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/home" className="nav-logo">
            <span>SkillBarter</span>
            <Sparkles size={20} />
          </Link>

          <div className="nav-links">
            {[
              { path: '/home', icon: Home, label: 'Home' },
              { path: '/messages', icon: MessageCircle, label: 'Messages' },
              { path: '/profile', icon: User, label: 'Profile' },
              { path: '/search', icon: Search, label: 'Search' },
              { path: '/request', icon: Bell, label: 'Requests' },
              {path: '/exchanges', icon: ArrowLeftRight, label: 'exchanges'}
            ].map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${isActive(path) ? 'active' : ''}`}
              >
                <Icon size={20} />
                {label}
              </Link>
            ))}

            {/* Logout button */}
            <Link className='nav-link' onClick={handleLogout}>
            
              <LogOut size={20} />
              Logout
          </Link>
            
          </div>
        </div>
      </nav>
    );
  }

  export default Navbar;
