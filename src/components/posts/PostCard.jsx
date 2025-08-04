import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function PostCard({ post }) {
  const {
    id,
    title,
    content,
    created_at,
    upvotes = 0,
    profiles = {},
  } = post;

  const { name = "Anonymous", avatar_url } = profiles;

  return (
    <div className="post-card">
      
      <div className="post-meta">
        <p className="post-time">
          Posted {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
        </p>
      </div>

      <Link to={`/post/${id}`} className="post-title-link">
      <div className="post-author-wrapper">
        <span className="post-title-block">
          <img
            src={avatar_url || "/default-avatar.png"}
            alt={name}
            title={name}
            className="avatar"
          />
          <h3 className="post-title">{title}</h3>
        </span>
        <p className="post-upvotes">{upvotes} upvotes</p>
      </div>
      </Link>

      
      
    </div>
  );
}
