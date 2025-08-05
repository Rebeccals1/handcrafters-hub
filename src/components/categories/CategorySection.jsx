import PostCard from "../posts/PostCard";

export default function CategorySection({ category }) {
  const { name, post_category_contests = [], posts = [] } = category;
  const contest = post_category_contests[0];

  const topThreePosts = posts.slice(0, 3); // Posts are already sorted in PostFeed

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
                <strong>Duration:</strong>{" "}
                {new Date(contest.start_date).toLocaleDateString()} —{" "}
                {new Date(contest.end_date).toLocaleDateString()}
              </p>
            )}
          </div>
        )}

        {topThreePosts.length > 0 && (
          <div className="winner-announcement bg-green-100 p-3 rounded shadow-sm mt-2">
            <h4 className="font-semibold mb-1">🏆 Top 3 Contributors:</h4>
            <ol className="list-decimal list-inside space-y-1">
              {topThreePosts.map((post) => (
                <li key={post.id}>
                  <strong>{post.profiles?.name || "Unknown User"}</strong> — {post.upvotes} upvotes
                </li>
              ))}
            </ol>
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
