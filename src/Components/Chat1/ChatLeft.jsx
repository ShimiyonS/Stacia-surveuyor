import React from 'react'

export default function ChatLeft({ data, title }) {
  return (
    <div>
      <h1>{title}</h1>
      {
        data.map((data) => {
          return <h3>{data.uname}</h3>
        })
      }
    </div>
  )
}
