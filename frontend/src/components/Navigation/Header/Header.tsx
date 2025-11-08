import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContext';
import './Header.scss';

interface NavLink {
  href: string;
  label: string;
}

const Header: React.FC = () => {
  const { user, logout } = useUser();

  const navLinks: NavLink[] = [
    { href: '/master-cv', label: 'CV-Master' },
    { href: '/interview', label: 'Interview Simulator' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__wrapper">
          <div className="header__logo">
            <Link to="/" className="header__title">
              Traineefy
            </Link>
          </div>

          <nav className="header__nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="header__link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header__user">
            {user ? (
              <>
                <span className="header__username">
                  Hello, {user.name}!
                </span>
                <button 
                  onClick={handleLogout}
                  className="header__logout"
                >
                  Exit
                </button>
              </>
            ) : (
              <Link to="/login" className="header__login">
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;