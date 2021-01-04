import React, { useEffect } from 'react'
import { useUser } from '../../context/UserContext/UserContext';
const WelcomeScreen = ({ history }) => {
  const { user } = useUser();
  useEffect(() => {
    if(user){
      history.push('/feed')
    }
  }, [user])
  return (
    <div className='container d-flex flex-column justify-content-center align-items-center p-2 mt-2'>
      <h4 className='text-secondary'>Welcome to Chat App</h4>
    </div>
  )
}

export default WelcomeScreen
