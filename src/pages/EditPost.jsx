import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/client";
import "../styles/pageStyles.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useOutletContext();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
    fetchCategories();
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Post not found", error);
      setError("Post not found");
    } else {
      setPost(data);
      setTitle(data.title);
      setContent(data.content || "");
      setImageUrl(data.image_url || "");
      setCategory(data.category_id || "");
    }
  }

  async function fetchCategories() {
    const { data, error } = await supabase.from("post_categories").select("*");
    if (!error) {
      setCategories(data);
    } else {
      console.error("Error loading categories", error.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    if (post.user_id && post.user_id !== userId) {
      alert("You are not authorized to edit this post.");
      return;
    }

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        content,
        image_url: imageUrl,
        category_id: category,
      })
      .eq("id", id);

    if (error) {
      console.error("Update error:", error.message);
      setError(error.message);
    } else {
      navigate(`/post/${id}`);
    }
  }

  if (!post && !error) {
    return <div className="text-center mt-8 text-gray-500">Loading post data...</div>;
  }

  return (
    <div className="edit-post-wrapper">
      <h1>Edit Post</h1>
      {error && <p className="edit-post-error">{error}</p>}

      <form onSubmit={handleUpdate} className="edit-post-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Current"
            className="edit-post-image-preview"
          />
        )}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
