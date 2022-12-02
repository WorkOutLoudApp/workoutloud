import Link from 'next/link'
import React from 'react'

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold underline">App Home</h1>
      <div className="nav">
        <ul>
          <li>
            <Link href="/">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
