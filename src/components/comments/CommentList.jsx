// components/comments/CommentList.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/client';
import CommentForm from './CommentForm';

export default function CommentList({ comments, userId, postId, onCommentAdded }) {
  const [votes, setVotes] = useState({});
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    const fetchVotes = async () => {
      const { data, error } = await supabase
        .from('comment_votes')
        .select('comment_id, vote_type');

      if (!error && data) {
        const counts = {};
        data.forEach(({ comment_id, vote_type }) => {
          if (!counts[comment_id]) counts[comment_id] = { up: 0, down: 0 };
          counts[comment_id][vote_type]++;
        });
        setVotes(counts);
      }
    };
    fetchVotes();
  }, [comments]);

  const handleVote = async (commentId, type) => {
    const { error } = await supabase.rpc('toggle_comment_vote', {
      p_comment_id: commentId,
      p_user_id: userId,
      p_vote_type: type
    });

    if (error) {
      console.error('Vote failed:', error.message);
    } else {
      const { data, error: countError } = await supabase
        .from('comment_votes')
        .select('comment_id, vote_type');

      if (!countError && data) {
        const updated = {};
        data.forEach(({ comment_id, vote_type }) => {
          if (!updated[comment_id]) updated[comment_id] = { up: 0, down: 0 };
          updated[comment_id][vote_type]++;
        });
        setVotes(updated);
      }
    }
  };

  const renderComments = (comments, parentId = null, level = 0) =>
    comments
      .filter(c => c.parent_comment_id === parentId)
      .map(c => (
        <div key={c.id} className="comment" style={{ marginLeft: level * 20 }}>
          <img src={c.profiles?.avatar_url || '/default-avatar.png'} className="avatar" />
          <div className="comment-body">
            <div className="comment-author">{c.profiles?.name || 'Anonymous'}</div>
            <div className="comment-text">{c.content}</div>
            <div className="comment-timestamp">{new Date(c.created_at).toLocaleString()}</div>
            <div className="vote-controls">
              <button onClick={() => handleVote(c.id, 'up')}> ⬆ </button>
              <span>{votes[c.id]?.up || 0}</span>
              <button onClick={() => handleVote(c.id, 'down')}> ⬇ </button>
              <span>{votes[c.id]?.down || 0}</span>
            </div>
            {c.user_id === userId && (
              <div className="comment-actions">
                <button onClick={() => alert('Edit not implemented yet')}>Edit</button>
                <button onClick={async () => {
                  const { error } = await supabase.from('comments').delete().eq('id', c.id);
                  if (!error) window.location.reload();
                }}>Delete</button>
              </div>
            )}
            <button onClick={() => setReplyTo(c.id)}>Reply</button>
            {replyTo === c.id && (
              <CommentForm
                postId={postId}
                userId={userId}
                onCommentAdded={onCommentAdded}
                parentId={c.id}
              />
            )}
            {renderComments(comments, c.id, level + 1)}
          </div>
        </div>
      ));

  return <div className="comment-section">{renderComments(comments)}</div>;
}
