// 🔧 components/ProfileForm.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../utils/client';
import { handleAvatarUpload } from '../utils/handleAvatarUpload';

export default function ProfileForm({ userId }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('name, username, avatar_url')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
      } else {
        setName(data.name || '');
        setUsername(data.username || '');
        setAvatarUrl(data.avatar_url || '');
      }
    };

    fetchProfile();
  }, [userId]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({ name, username })
      .eq('id', userId);

    if (error) {
      if (error.code === '23505') {
        alert('That username is already taken.');
      } else {
        console.error('Error updating profile:', error.message);
      }
      setSaving(false);
      return;
    }

    if (file) {
      const publicUrl = await handleAvatarUpload(file, userId);
      if (publicUrl) {
        setAvatarUrl(publicUrl);
        await supabase
          .from('profiles')
          .update({ avatar_url: publicUrl })
          .eq('id', userId);
      }
    }

    setSaving(false);
    alert('Profile updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Edit Profile</h2>

      {avatarUrl && (
        <img src={avatarUrl} alt="Avatar" className="avatar-preview" />
      )}

      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label>
        Upload Avatar:
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      <button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
