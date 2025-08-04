// Updated PostDetail.jsx
import { useOutletContext, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/client';
import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostDetail = () => {
  const { userId } = useOutletContext();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voteCount, setVoteCount] = useState(0);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('*, profiles(name, avatar_url), post_categories(name)')
          .eq('id', id)
          .single();

        const { data: commentData, error: commentError } = await supabase
          .from('comments')
          .select('*, profiles(name, avatar_url)')
          .eq('post_id', id)
          .order('created_at', { ascending: true });

        if (postError || commentError) {
          throw new Error(postError?.message || commentError?.message);
        }

        setPost(postData);
        setComments(commentData);
        setVoteCount(postData.upvotes || 0);
        setCategoryName(postData.post_categories?.name || '');
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentAdded = async (newComment) => {
    setComments((prev) => [...prev, newComment]);
    toast.success('Comment added!');
  };

  const handleVote = async (direction) => {
    const newCount = direction === 'up' ? voteCount + 1 : voteCount - 1;
    setVoteCount(newCount);

    const { error } = await supabase
      .from('posts')
      .update({ upvotes: newCount })
      .eq('id', post.id);

    if (error) {
      setVoteCount(voteCount);
      toast.error('Failed to update vote.');
    } else {
      toast.success(`Voted ${direction}!`);
    }
  };

  if (loading) return <div className="skeleton-loader">Loading post...</div>;

  return (
    <div className="post-card">
      <div className="post-author">
        <img
          src={post.profiles?.avatar_url || "/default-avatar.png"}
          alt={post.profiles?.name || "Anonymous"}
          className="avatar"
        />
        <span>{post.profiles?.name || "Anonymous"}</span>
      </div>

      <h1 className="post-title">{post.title}</h1>
      <p className="post-category">Category: {categoryName}</p>
      <p className="post-content">{post.content}</p>
      {post.image_url && (
        <img src={post.image_url} alt="Post" className="post-image" />
      )}

      <div className="vote-controls" style={{ marginTop: '1rem' }}>
        <button onClick={() => handleVote('up')}>⬆️ Upvote</button>
        <span style={{ margin: '0 1rem' }}>{voteCount} votes</span>
        <button onClick={() => handleVote('down')}>⬇️ Downvote</button>
      </div>

      <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} userId={userId} />
      <CommentList comments={comments} />
    </div>
  );
};

export default PostDetail;
