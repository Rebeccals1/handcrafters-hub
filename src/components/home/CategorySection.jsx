// components/home/CategorySection.jsx
import PostCard from "../PostCard";

export default function CategorySection({ category }) {
  const { name, post_category_contests = [], posts = [] } = category;

  const contest = post_category_contests[0]; // get the latest contest if available

  return (
    <section className="category-section">
      <h2 className="category-name">{name}</h2>

      {contest && (
        <div className="contest-banner">
          <h4 className="contest-title">🎯 {contest.title}</h4>
          <p className="contest-description">{contest.description}</p>
          {contest.start_date && contest.end_date && (
            <p className="contest-dates">
              📅 {new Date(contest.start_date).toLocaleDateString()} —{" "}
              {new Date(contest.end_date).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {posts.length > 0 ? (
        <div className="post-list">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>No posts yet in this category.</p>
      )}
    </section>
  );
}
