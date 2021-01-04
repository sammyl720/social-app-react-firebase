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
    <div className='modal mt-1 d-flex justify-content-center align-items-center'>
      <form onSubmit={handlePostSubmit} className="card row p-4">
        <div className="col-sm-2 offset-sm-10 d-flex justify-content-end">
          <i className="fas fa-times" onClick={setClose}></i>
        </div>
        <div className="card-body col-sm-12">
          <input type="text" placeholder='what on your mind?' className="form-control" value={post} onChange={handleChange} pattern='.{6,}' required/>
        </div>
        <div className='col-sm-8 offset-sm-2 my-2'>
          <button type="submit" className="btn btn-primary" style={{width:'100%'}}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
