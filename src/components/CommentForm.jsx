import { useState } from 'react';
import { supabase } from '../utils/client';

export default function CommentForm({ postId, onCommentAdded, userId }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          content,
          post_id: postId,
          user_id: userId,
        },
      ])
      .select('*, profiles(name, avatar_url)')
      .single();

    setLoading(false);

    if (error) {
      alert('Error posting comment: ' + error.message);
    } else {
      onCommentAdded(data); // Optimistically update the UI
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}
