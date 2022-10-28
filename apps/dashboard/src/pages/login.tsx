import Link from 'next/link'

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold underline">Login</h1>
      <div className="nav">
        <ul>
          <li>
            <Link href="/">Go Back</Link>
          </li>
          <li>
            <Link href="/app/home">App</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
