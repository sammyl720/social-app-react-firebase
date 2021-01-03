import React, { useState } from 'react'
import { useUser } from '../../context/UserContext/UserContext';
import CreatePost from '../../components/CreatePost';
const Profile = () => {
  const { user, profile } = useUser();
  const [postOpen, setPostOpen] = useState(false);
  return (
    <div className='flex-fill'>
      {postOpen ? <CreatePost setClose={() => setPostOpen(false)} /> : (<button className="btn btn-primary" onClick={() => setPostOpen(true)}>Create a Post</button>)}
    </div>
  )
}

export default Profile
