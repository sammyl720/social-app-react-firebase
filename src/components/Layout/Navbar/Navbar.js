import React from 'react'
import classes from './navbar.module.scss';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext/UserContext';
import SearchBar from '../Searchbar/SearchBar';
const Navbar = () => {
  const { user, logout } = useUser();
  return (
    <div className={classes.navbar}>
      <Link to='/' className={classes.logo}>
        <i className="fab fa-pied-piper-pp"></i>
      </Link>
        
        { user ? (<>
          <SearchBar />
          <Link to='/profile' className={classes.link}>Profile</Link>
          <button className={classes.btn} onClick={logout}>Logout</button>
          </>
        ): (
          <Link to='/login' className={classes.link}>Login</Link>
        )}
    </div>
  )
}

export default Navbar
