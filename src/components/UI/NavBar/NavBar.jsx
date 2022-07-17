import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="navBar__links">
        <Link to="/about">О сайте</Link>
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  )
}

export default NavBar
