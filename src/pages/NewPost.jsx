import { useOutletContext } from 'react-router-dom'

const NewPost = () => {
  const { userId } = useOutletContext()

  return (
    <div>
      <h1>New Post Page</h1>
      <p>Your user ID is: {userId}</p>
    </div>
  )
}
export default NewPost;