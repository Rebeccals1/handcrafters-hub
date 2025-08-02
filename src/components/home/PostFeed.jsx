// components/home/PostFeed.jsx

import { useEffect, useState } from "react";
import { supabase } from "../../utils/client";
import CategorySection from "./CategorySection";

export default function PostFeed({ sortBy }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostsByCategory = async () => {
      setLoading(true);
      const orderField = sortBy === "popular" ? "upvotes" : "created_at";

      const { data, error } = await supabase
        .from("post_categories")
        .select(`
          id,
          name,
          post_category_contests (
            title,
            description,
            start_date,
            end_date
          ),
          posts (
            id,
            title,
            content,
            image_url,
            created_at,
            upvotes,
            profiles (
              name,
              avatar_url
            )
          )
        `)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching categorized posts:", error.message);
        setLoading(false);
        return;
      }

      // Optional: sort posts inside each category
      const sorted = data.map((category) => ({
        ...category,
        posts: category.posts.sort((a, b) =>
          sortBy === "popular"
            ? b.upvotes - a.upvotes
            : new Date(b.created_at) - new Date(a.created_at)
        ),
      }));

      setCategories(sorted);
      setLoading(false);
    };

    loadPostsByCategory();
  }, [sortBy]);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="post-feed">
      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  );
}
