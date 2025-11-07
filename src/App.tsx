import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
// import LoginForm from './components/Login/LoginForm';
import Footer from './components/Navigation/Footer/Footer';
import Interview from './components/Interview/Interview';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <Dashboard />
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
            {
              /* <Route path="/login" element={<LoginForm />} /> */}
          </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;