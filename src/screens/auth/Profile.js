import React from 'react'
import { useUser } from '../../context/UserContext/UserContext';
const Profile = () => {
  const { user } = useUser();
  return (
    <div className='flex-fill'>
      {JSON.stringify(user)}
    </div>
  )
}

export default Profile
