export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="comment-list">
      <h4>{comments.length} Comment{comments.length !== 1 ? 's' : ''}</h4>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <div className="comment-author">
            <img
              src={comment.profiles?.avatar_url || "/default-avatar.png"}
              alt={comment.profiles?.name || "Anonymous"}
              className="avatar"
            />
            <strong>{comment.profiles?.name || "Anonymous"}</strong>
            <span className="comment-time">
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
