import { useOutletContext } from 'react-router-dom'

const EditPost = () => {
  const { userId } = useOutletContext()

  return (
    <div>
      <h1>This is Edit Post Page</h1>
      <p>Your user ID is: {userId}</p>
    </div>
  )
}
export default EditPost;