import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/client";
import { toast } from "react-toastify";
import '../styles/pageStyles.css';

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await supabase
        .from("post_categories")
        .select("*")
        .order("name");

      if (error) {
        toast.error("Failed to load categories");
        console.error(error.message);
      } else {
        setCategories(data);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = null;

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`; // Optional folder for organization

      const { error: uploadError } = await supabase.storage
        .from("post-images") // ✅ Correct bucket for post images
        .upload(filePath, imageFile);

      if (uploadError) {
        toast.error("Failed to upload image");
        console.error(uploadError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("post-images").getPublicUrl(filePath);

      imageUrl = publicUrl;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("You must be logged in to create a post.");
      return;
    }

    const { error: insertError } = await supabase.from("posts").insert([
      {
        title,
        content,
        image_url: imageUrl,
        user_id: user.id,
        category_id: selectedCategory,
      },
    ]);

    if (insertError) {
      toast.error("Failed to create post");
      console.error(insertError.message);
    } else {
      toast.success("Post created!");
      navigate("/");
    }
  };

  return (
    <section className="form-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>Title:</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
        />

        <label>Category:</label>
        <select
          required
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
        >
          <option value="" disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What do you want to say?"
        />

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
