import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
// import LoginForm from './components/Login/LoginForm';
import Footer from './components/Navigation/Footer/Footer'

function App() {
  return (
    <>
      <Dashboard />
      <Header />
      {/*<LoginForm />*/}
      <Footer />
      </>
  );
}

export default App;
