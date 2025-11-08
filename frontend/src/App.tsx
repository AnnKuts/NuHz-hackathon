import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserProvider, useUser } from './contexts/UserContext';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import UserStats from './components/UserStats/UserStats';
import Interview from './components/Interview/Interview';
import BuilderCV from './components/MasterCV/BuilderCV';
import Login from './components/Auth/Login';

const DashboardWithStats = () => {
  const { user } = useUser();
  
  return (
    <>
      <Dashboard />
      {user && <UserStats />}
    </>
  );
};

const AppRoutes = () => {
  const { isLoading } = useUser();

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#667eea'
      }}>
        Downloading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardWithStats />} />
        <Route path="login" element={<Login />} />
        <Route path="master-cv" element={<BuilderCV />} />
        <Route path="interview" element={<Interview />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
