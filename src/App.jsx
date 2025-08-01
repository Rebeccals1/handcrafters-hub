// src/App.jsx
import './index.css'
import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { supabase } from './utils/client'
import Navbar from './components/navbar'

export default function App() {
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (!session) navigate('/login')
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  if (!session) {
    return null // Wait until login page handles rendering
  }

  return (
    <div>
      <Navbar user={session.user} />
      <Outlet context={{ userId: session.user.id }} />
    </div>
  )
}
