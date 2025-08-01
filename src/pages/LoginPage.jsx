// src/pages/LoginPage.jsx
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../utils/client'

export default function LoginPage() {
  return (
    <div className="login-container">
      <h1>Login to Handcrafter's Hub</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['github', 'google']} // 👈 Only show these
      />
    </div>
  )
}
