// src/pages/LoginPage.jsx
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../utils/client';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white text-black p-6">
      <h1 className="text-4xl font-extrabold mb-4 text-center">Welcome to Handcrafter's Hub</h1>
      <p className="text-lg mb-8 text-center text-gray-600">Please sign in with your preferred account</p>
      <div className="w-full max-w-md rounded-2xl shadow-lg bg-white p-6 border border-gray-200">
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