import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/client";
import { ensureUserProfile } from "../utils/ensureUserProfile";

export default function useAuthSession() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession(session);
        ensureUserProfile(session.user);
      } else {
        setSession(null);
      }
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSession(session);
        ensureUserProfile(session.user);
        navigate("/"); // Redirect after login
      } else {
        setSession(null);
        navigate("/login"); // Redirect after logout
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  return { session };
}
