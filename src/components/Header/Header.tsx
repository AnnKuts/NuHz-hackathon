import React from 'react';
import './Header.scss';

interface NavLink {
  href: string;
  label: string;
}

 const Header: React.FC = () => {
  const navLinks: NavLink[] = [
    { href: '#cv-master', label: 'CV-Master' },
    { href: '#login', label: 'Log In' },
    { href: '#interview-simulator', label: 'Interview Simulator' },
  ];

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__wrapper">
          <div className="header__logo">
            <h1 className="header__title">Traineefy</h1>
          </div>

          <nav className="header__nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="header__link"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;