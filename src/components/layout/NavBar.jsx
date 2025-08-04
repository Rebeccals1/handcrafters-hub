// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/client';
import '../../styles/componentStyles.css';

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout failed:', error.message);
    } else {
      navigate('/login'); // redirect after successful logout
    }
  };

  return (
    <nav className="navbar">

      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/new">New Post +</Link>
      </div>

      <div className="nav-right">
        {user ? (
          <div className="user-info">
            <img
              src={user.user_metadata?.avatar_url || '/default-avatar.png'}
              alt="User Avatar"
              className="user-avatar"
            />
            <button onClick={handleLogout} className="logout-button">
              Sign out
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
