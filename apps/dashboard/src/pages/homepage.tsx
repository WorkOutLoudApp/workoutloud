import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Home() {
  const [example, setExample] = useState<any>()
  useEffect(() => {
    axios
      .get(`http://localhost:4000/v1/web/example/hello`, {
        withCredentials: true,
      })
      .then((resp) => {
        setExample(resp.data)
      })
      .catch(() => console.error('error'))
  }, [])

  return (

    <div className="main">
      <h1 className="text-3xl font-extrabold underline">Home</h1>
      <p>API response: {JSON.stringify(example)}</p>
    </div>
  )
}

export default Home
