import { supabase } from './client.js';

export async function ensureUserProfile(user) {
  if (!user || !user.id) return;

  const { id, email, user_metadata } = user;

  const name =
    user_metadata?.name ||
    user_metadata?.full_name ||
    email ||
    'Unnamed User';

  const avatar_url = user_metadata?.avatar_url || '';

  const { error } = await supabase.from('profiles')
    .upsert(
      { id, email, name, avatar_url },
      { onConflict: 'id' }
    );

  if (error) {
    console.error('Failed to create/update user profile:', error.message);
    return false;
  }

  return true;
}
