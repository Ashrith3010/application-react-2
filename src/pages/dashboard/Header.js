import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Apple, 
  Building2, 
  Heart, 
  Share2, 
  MessageCircle, 
  LogOut 
} from 'lucide-react';
import '../styles/header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');

  const isActiveLink = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <nav className="header-nav">
          <div className="nav-links">
            <Link to="/dashboard" className={isActiveLink('/dashboard')}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            
            <Link to="/available-food" className={isActiveLink('/available-food')}>
              <Apple size={20} />
              <span>Available Food</span>
            </Link>
            
            <Link to="/ngo-directory" className={isActiveLink('/ngo-directory')}>
              <Building2 size={20} />
              <span>NGO Directory</span>
            </Link>
            
            {userType === 'donor' && (
              <Link to="/donate" className={isActiveLink('/donate')}>
                <Heart size={20} />
                <span>Donate</span>
              </Link>
            )}
            
            {userType === 'ngo' && (
              <Link to="/donate" className={isActiveLink('/donate')}>
                <Share2 size={20} />
                <span>Share Food</span>
              </Link>
            )}
            
            <Link to="/contact" className={isActiveLink('/contact')}>
              <MessageCircle size={20} />
              <span>Contact</span>
            </Link>
            
            <button onClick={handleLogout} className="logout-button">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;