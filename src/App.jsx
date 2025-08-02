import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { supabase } from './utils/client';
import Navbar from './components/Navbar';
import { ensureUserProfile } from './utils/ensureUserProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession(session);
        setUser(session.user);
        ensureUserProfile(session.user);
      }
    });

    // Listen for login/logout
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSession(session);
        setUser(session.user);
        ensureUserProfile(session.user);
      } else {
        setSession(null);
        setUser(null);
        navigate('/login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <>
      <Navbar user={user} />
      <main className="container">
        <Outlet context={{ userId: user?.id }} />
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
