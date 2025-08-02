import React from 'react';

export default function PostHeader({ author }) {
  return (
    <div className="post-author">
      <img
        src={author?.avatar_url || '/default-avatar.png'}
        alt={author?.name || 'Anonymous'}
        className="avatar"
      />
      <span>{author?.name || 'Anonymous'}</span>
    </div>
  );
}