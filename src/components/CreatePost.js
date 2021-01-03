import React, { useState, useEffect } from 'react'
import { usePosts } from '../context/PostContext/PostContext' 
import { useUser } from '../context/UserContext/UserContext'
import Loader from './Loader';


const CreatePost = ({ setClose }) => {
  const { addPost } = usePosts();
  const { loading } = useUser();
  const [post, setPost] = useState('');
  useEffect(() => {
    console.log('create post');
  }, [])
  const handlePostSubmit = (e) => {
    e.preventDefault();
    addPost(post)
  }

  const handleChange = (e) => {
    setPost(e.target.value);
  }

  if(loading){
    return <Loader />
  }
  return (
    <div className='flex-fill'>
      <div className="close" onClick={setClose}>Close</div>
      <form onSubmit={handlePostSubmit} className="card">
        <div className="card-body">
          <input type="text" placeholder='what on your mind?' className="form-control" value={post} onChange={handleChange} pattern='.{6,}' required/>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
