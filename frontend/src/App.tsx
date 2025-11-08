import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Navigation/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import UserStats from './components/UserStats/UserStats';
import Footer from './components/Navigation/Footer/Footer';
import Interview from './components/Interview/Interview';
import BuilderCV from './components/MasterCV/BuilderCV';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Dashboard />
            <UserStats />
            <Footer />
          </>
        } />
        <Route path="/master-cv" element={
          <>
            <Header />
            <BuilderCV />
            <Footer />
          </>
        } />
        <Route path="/interview" element={
          <>
            <Header />
            <Interview />
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
