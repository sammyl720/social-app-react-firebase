import React from 'react'

const Loader = () => {
  return (
    <div className="flex-fill">
      <div className="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loader
