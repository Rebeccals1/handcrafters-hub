// src/pages/LoginPage.jsx
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../utils/client';
import '../styles/pageStyles.css';

export default function LoginPage() {
  return (
    <div className="login-page">
      <h1 className="login-title">Welcome to Handcrafter's Hub</h1>
      <p className="login-subtitle">Please sign in with your preferred account</p>
      <div className="login-box">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#4B5563',
                  brandAccent: '#9CA3AF'
                }
              }
            }
          }}
          providers={['google', 'github']}
          redirectTo={`${window.location.origin}/`}
        />
      </div>
    </div>
  );
}
