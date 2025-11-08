import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Navigation/Header/Header';
import Footer from '../Navigation/Footer/Footer';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;