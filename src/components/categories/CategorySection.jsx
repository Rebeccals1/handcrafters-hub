import PostCard from "../posts/PostCard";

export default function CategorySection({ category }) {
  const { name, post_category_contests = [], posts = [] } = category;
  const contest = post_category_contests[0];

  // Sort posts by upvotes (descending) and get top 3
  const sortedPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes);
  const topThreePosts = sortedPosts.slice(0, 3);
  const winner = topThreePosts[0]; // Top upvoted post

  return (
    <section className="category-section">
      <h2>{name}</h2>
      <div className="contest-banner">
        {contest && (
          <div className="contest-content">
            <h4>{contest.title}</h4>
            <p>{contest.description}</p>
            {contest.start_date && contest.end_date && (
              <p>
                <strong>Duration:</strong> {new Date(contest.start_date).toLocaleDateString()} —{" "}
                {new Date(contest.end_date).toLocaleDateString()}
              </p>
            )}
          </div>
        )}

        {winner && (
          <div className="winner-announcement bg-green-100 p-3 rounded shadow-sm">
            🏆 <strong>{winner.profiles?.name || "Unknown User"}</strong> is currently leading this category!
          </div>
        )}
      </div>

      {topThreePosts.length > 0 ? (
        <div className="top-posts">
          {topThreePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>No posts yet in this category.</p>
      )}
    </section>
  );
}
