import React from 'react'
import classes from './navbar.module.scss';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext/UserContext';
const Navbar = () => {
  const { user, logout } = useUser();
  return (
    <div className={classes.navbar}>
      <i className="fab fa-pied-piper-pp"></i>
      <div>
        <Link to='/' className={classes.link}>Home</Link>
        { user ? (<>
          <Link to='/profile' className={classes.link}>Profile</Link>
          <button className={classes.btn} onClick={logout}>Logout</button>
          </>
        ): (
          <Link to='/login' className={classes.link}>Login</Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
