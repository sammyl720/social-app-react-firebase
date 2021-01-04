import React, {useState} from 'react'
import classes from './searchbar.module.scss'
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchSubmit = e => {
    e.preventDefault();
    console.log(searchTerm);
  }
  return (
    <form onSubmit={handleSearchSubmit} className={classes.searchBar}>
      <input type="text" name="search" id="search" value={searchTerm} placeholder='Search...' onChange={(e) => setSearchTerm(e.target.value)} />
      <label htmlFor="search">
        <i className="fas fa-search"></i>
      </label>
    </form>
  )
}

export default SearchBar
