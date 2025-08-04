import { useParams, useNavigate, useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../utils/client"


const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { userId } = useOutletContext()

  const [post, setPost] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [flag, setFlag] = useState("")
  const [category, setCategory] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    fetchPost()
  }, [id])

  async function fetchPost() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !data) {
      console.error("Post not found", error)
      setError("Post not found")
    } else {
      setPost(data)
      setTitle(data.title)
      setContent(data.content || "")
      setImageUrl(data.image_url || "")
      setFlag(data.flags?.[0] || "")
      setCategory(data.category || "")
    }
  }

  async function handleUpdate(e) {
    e.preventDefault()

    if (post.user_id && post.user_id !== userId) {
      alert("You are not authorized to edit this post.")
      return
    }

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        content,
        image_url: imageUrl,
        flags: flag ? [flag] : null,
        category,
      })
      .eq("id", id)

    if (error) {
      console.error("Update error:", error.message)
      setError(error.message)
    } else {
      navigate(`/post/${id}`)
    }
  }

  if (!post) return <p>Loading...</p>

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
        >
          <option value="">No Flag</option>
          <option value="Question">Question</option>
          <option value="Opinion">Opinion</option>
        </select>
        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="Sewing & Textiles">Sewing & Textiles</option>
          <option value="Woodworking">Woodworking</option>
          <option value="Painting">Painting</option>
          <option value="Metal Working">Metal Working</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Post
        </button>
      </form>
    </div>
  )
}

export default EditPost
