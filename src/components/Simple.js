import React from 'react'
import { useUser } from '../context/UserContext/UserContext'

const Simple = () => {
  const { name } = useUser();
  return (
    <div>
      <h1 className="text-primary">Hello {name}</h1>
    </div>
  )
}

export default Simple
