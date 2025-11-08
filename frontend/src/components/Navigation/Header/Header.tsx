import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

interface NavLink {
  href: string;
  label: string;
}

const Header: React.FC = () => {
  const navLinks: NavLink[] = [
    { href: '/master-cv', label: 'CV-Master' },
    { href: '/interview', label: 'Interview Simulator' },
    { href: '/login', label: 'Log In' },

  ];

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__wrapper">
          <div className="header__logo">
            <div className="header__logo">
              <Link to="/" className="header__title">
                Traineefy
              </Link>
            </div>
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
        </div>
      </div>
    </header>
  );
};

export default Header;