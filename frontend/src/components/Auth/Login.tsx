import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import './Login.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();



  const handleGoogleSuccess = () => {
    navigate('/');
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__content">
          <h1 className="login__title">Welcome to Traineefy</h1>
          <p className="login__subtitle">
            Create professional CVs and take interview training
          </p>

          <div className="login__google">
            <GoogleLogin onSuccess={handleGoogleSuccess} />
          </div>

          <p className="login__info">
            Sign in with Google to save your data and results
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;