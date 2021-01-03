import React from 'react'
import classes from './navbar.module.scss';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <i class="fab fa-pied-piper-pp"></i>
      <div>
        <Link to='/' className={classes.link}>Home</Link>
        <Link to='/Test' className={classes.link}>Text</Link>
      </div>
    </div>
  )
}

export default Navbar
