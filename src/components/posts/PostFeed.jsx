import { useState, useEffect } from "react";
import { supabase } from "../../utils/client";
import CategorySection from "../categories/CategorySection";

export default function PostFeed({ sortBy, searchQuery, selectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostsByCategory = async () => {
      setLoading(true);
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
        .order("name", { ascending: true });

      if (error) {
        console.error("Failed to load posts:", error.message);
        setLoading(false);
        return;
      }

      let filtered = data;

      // Filter by category if needed
      if (selectedCategory) {
        filtered = filtered.filter((c) => c.name === selectedCategory);
      }

      // Sort categories by number of posts (descending)
      filtered.sort((a, b) => (b.posts?.length || 0) - (a.posts?.length || 0));

      // Filter + sort posts within each category
      const result = filtered.map((category) => {
        const filteredPosts = category.posts
          .filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .sort((a, b) =>
            sortBy === "popular"
              ? b.upvotes - a.upvotes
              : new Date(b.created_at) - new Date(a.created_at)
          );

        return { ...category, posts: filteredPosts };
      });

      setCategories(result);
      setLoading(false);
    };

    loadPostsByCategory();
  }, [sortBy, searchQuery, selectedCategory]);


  return (
    <div className="post-feed">
      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : (
        categories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))
      )}
    </div>
  );
}

