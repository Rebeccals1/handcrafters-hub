// 🔧 utils/handleAvatarUpload.js
import { supabase } from './client';

export async function handleAvatarUpload(file, userId) {
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error('Upload failed:', uploadError.message);
    return null;
  }

  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
  const publicUrl = data?.publicUrl;

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', userId);

  if (updateError) {
    console.error('Failed to update profile with avatar URL:', updateError.message);
    return null;
  }

  return publicUrl;
}