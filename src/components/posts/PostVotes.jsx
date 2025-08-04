import React from 'react';

export default function PostVotes({ count, onVote }) {
  return (
    <div className="vote-controls" style={{ marginTop: '1rem' }}>
      <button onClick={() => onVote('up')}>⬆️ Upvote</button>
      <span style={{ margin: '0 1rem' }}>{count} votes</span>
      <button onClick={() => onVote('down')}>⬇️ Downvote</button>
    </div>
  );
}