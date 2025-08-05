import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/client';
import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/pageStyles.css';

const PostDetail = () => {
  const { userId } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();

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
      setVoteCount(voteCount); // revert
      toast.error('Failed to update vote.');
    } else {
      toast.success(`Voted ${direction}!`);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', post.id);

    if (error) {
      toast.error('Failed to delete post.');
    } else {
      toast.success('Post deleted.');
      navigate('/');
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
      <span className="post-category">Category: {categoryName}</span>
      <p className="post-content">{post.content}</p>
      {post.image_url && (
        <img src={post.image_url} alt="Post" className="post-image" />
      )}

      <div className="vote-controls" style={{ marginTop: '1rem' }}>
        <button onClick={() => handleVote('up')}>⬆ Upvote</button>
        <span style={{ margin: '0 1rem' }}>{voteCount} votes</span>
        <button onClick={() => handleVote('down')}>⬇ Downvote</button>
      </div>

      {post.user_id === userId && (
        <div className="mt-4 flex gap-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate(`/edit/${post.id}`)}
          >
            ✏️ Edit
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={handleDelete}
          >
            🗑️ Delete
          </button>
        </div>
      )}

      <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} userId={userId} />
      <CommentList comments={comments} />
    </div>
  );
};

export default PostDetail;
