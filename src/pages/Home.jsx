import { useOutletContext } from 'react-router-dom'

export default function Home() {
  const { userId } = useOutletContext()

  return (
    <div>
      <h1>Welcome to the Hub</h1>
      <p>Your user ID is: {userId}</p>
    </div>
  )
}
