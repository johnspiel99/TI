import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="container">
          <Link to="/" className="logo">Uza</Link>
          <div className="search-bar">
            <input type="text" placeholder="Search for anything" />
            <button className="search-button">Search</button>
          </div>
          <div className="user-actions">
            <Link to="/account">My Account</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
      </div>
      <div className="navbar-bottom">
        <div className="container">
          <div className="categories">
            <Link to="/products?category=Electronics">Electronics</Link>
            <Link to="/products?category=Home">Home & Garden</Link>
            <Link to="/products?category=Sports">Sports</Link>
            <Link to="/products?category=Accessories">Accessories</Link>
            <Link to="/deals">Daily Deals</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;