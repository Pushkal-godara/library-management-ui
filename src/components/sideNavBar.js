import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const SideNavBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="side-nav">
      <div className="user-info">
        <img src="/api/placeholder/50/50" alt="User" className="user-avatar" />
        <span>Library Admin</span>
      </div>
      <ul>
        <li className={isActive('/')}>
          <Link to="/">Dashboard</Link>
        </li>
        <li className={isActive('/books')}>
          <Link to="/books">Books</Link>
        </li>
        <li className={isActive('/users/get-all-users')}>
          <Link to="/users/get-all-users">Users</Link>
        </li>
        <li className={isActive('/transactions')}>
          <Link to="/transactions">Transactions</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavBar;