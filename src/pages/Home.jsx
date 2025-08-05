import { useEffect, useState } from "react";
import { supabase } from "../utils/client";
import SortBar from "../components/shared/SortBar";
import SearchBar from "../components/shared/SearchBar";
import PostFeed from "../components/posts/PostFeed";

export default function Home() {
  const [allCategories, setAllCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);

  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Step 1: Load all categories from Supabase once
  useEffect(() => {
    const fetchCategories = async () => {
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
            comment_count,
            profiles (
              name,
              avatar_url
            )
          )
        `);

      if (!error && data) {
        setAllCategories(data);
        setDisplayedCategories(data); // show everything initially
      }
    };

    fetchCategories();
  }, []);

  // Step 2: Filter posts based on search + category
  useEffect(() => {
    const filtered = allCategories
      .map((category) => {
        const originalPosts = Array.isArray(category.posts) ? [...category.posts] : [];

        const matchingPosts = searchQuery
          ? originalPosts.filter((post) =>
              post.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : originalPosts;

        return { ...category, posts: matchingPosts };
      })
      .filter((category) => {
        const hasPosts = category.posts.length > 0;
        const matchesSelectedCategory =
          selectedCategory === "" || category.name === selectedCategory;
        return hasPosts && matchesSelectedCategory;
      });

    setDisplayedCategories(filtered);
  }, [searchQuery, selectedCategory, allCategories]);

  return (
    <div className="home-page p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <SortBar
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={allCategories} 
        />
      </div>

      <PostFeed
        sortBy={sortBy}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        categories={displayedCategories} 
      />
    </div>
  );
}
