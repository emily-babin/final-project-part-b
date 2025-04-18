// Navbar that spans across the entirety of the top of the page,
// displays a logo, title and the links to each page.

import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  return (
    <div className="navbar row align-items-center justify-content-between px-4 py-2">

       {/* LOGO + TITLE (Grouped Together) */}
        <div className="col d-flex align-items-center">
          <Link to="/">
            <img src='/images/pokeball.png' alt="Home" className="navbar-logo me-2" />
          </Link>
          <NavLink to="/" className='title'>
              React Final Project
          </NavLink>
    
          
        </div>


      {/* LINKS */}
      <div className="col-auto">
        <ul className="nav">

          {/* HOME PAGE */}
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Home
            </NavLink>
          </li>

          {/* PROJECT PAGE */}
          {/* <li>
            <NavLink to="/project" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Project
            </NavLink>
          </li> */}

          {/* ITEMS PAGE */}
          <li>
            <NavLink to="/items" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Items
            </NavLink>
          </li>

          {/* CATEGORIES PAGE */}
          <li>
            <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Categories
            </NavLink>
          </li>
        </ul>

      </div>
    </div>
  );
};

export default NavBar;
