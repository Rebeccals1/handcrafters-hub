import { useOutletContext } from 'react-router-dom'

const PostDetail = () => {
  const { userId } = useOutletContext()

  return (
    <div>
      <h1>Post Detail</h1>
      <p>Your user ID is: {userId}</p>
    </div>
  )
}
export default PostDetail;