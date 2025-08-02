// Home.jsx
import { useEffect, useState } from "react";
import { supabase } from "../utils/client";
import SortFilterControls from "../components/home/SortFilterControls";
import PostFeed from "../components/home/PostFeed";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("post_categories").select("*");
      if (!error) setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      const orderField = sortBy === "popular" ? "upvotes" : "created_at";

      let query = supabase
        .from("posts")
        .select("*, profiles(name, avatar_url), post_categories(name)")
        .order(orderField, { ascending: false });

      if (selectedCategory) {
        query = query.eq("category_id", selectedCategory);
      }

      const { data, error } = await query;
      if (!error) setPosts(data);
    };

    loadPosts();
  }, [sortBy, selectedCategory]);

  return (
    <section className="home-page">
      <SortFilterControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PostFeed posts={posts} />
    </section>
  );
}