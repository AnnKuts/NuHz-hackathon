import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import type { GoogleAuthData } from '../../api/authApi';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleLoginProps {
  onSuccess?: () => void;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { googleLogin } = useUser();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '686465713965-vivkf1mbi6j79ritmaka4a6rjsljcids.apps.googleusercontent.com',
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'signin_with',
            locale: 'en'
          }
        );
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const googleData: GoogleAuthData = {
        googleId: payload.sub,
        email: payload.email,
        fullName: payload.name,
        profilePicture: payload.picture
      };

      await googleLogin(googleData);
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };



  return (
    <div>
      <div id="google-signin-button"></div>
    </div>
  );
};

export default GoogleLogin;