import React from 'react'
import { useUser } from '../../context/UserContext/UserContext';
const Profile = () => {
  const { user, profile } = useUser();
  return (
    <div className='flex-fill'>
      {JSON.stringify(profile)}
    </div>
  )
}

export default Profile
