// src/components/Navbar.jsx
import { Link } from 'react-router-dom'
import { supabase } from '../utils/client'
import './style.css'

export default function Navbar({ user }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">🏠 Home</Link>
        <Link to="/new">➕ New Post</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={() => supabase.auth.signOut()}>Sign out</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}
