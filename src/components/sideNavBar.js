// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { logout } from '../services/apiService';

// const SideNavBar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isActive = (path) => {
//     return location.pathname === path ? 'active' : '';
//   };

//   return (
//     <nav className="side-nav">
//       <div className="user-info">
//         <span>Library Admin</span>
//       </div>
//       <ul>
//         <li className={isActive('/')}>
//           <Link to="/">Dashboard</Link>
//         </li>
//         <li className={isActive('/books')}>
//           <Link to="/books">Books</Link>
//         </li>
//         <li className={isActive('/users/get-all-users')}>
//           <Link to="/users/get-all-users">Users</Link>
//         </li>
//         <li className={isActive('/transactions')}>
//           <Link to="/transactions">Transactions</Link>
//         </li>
//         <li className={isActive('/logout')}>
//           <Link
//             to="#"
//             onClick={async (e) => {
//               e.preventDefault();
//               try {
//                 await logout();
//                 navigate('/auth/login');
//               } catch (error) {
//                 console.error('Logout failed:', error);
//               }
//             }}
//           >
//             Logout
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default SideNavBar;

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../services/apiService';
import { 
  Home, 
  Book, 
  Users, 
  RefreshCw,
  LogOut 
} from 'lucide-react';

const SideNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* User Info Section */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">Library Admin</h2>
      </div>

      {/* Navigation Links */}
      <ul className="flex-1 py-4">
        <li>
          <Link
            to="/"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200
              ${isActive('/') ? 'bg-gray-100 border-l-4 border-blue-500' : ''}`}
          >
            <Home className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            to="/books"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200
              ${isActive('/books') ? 'bg-gray-100 border-l-4 border-blue-500' : ''}`}
          >
            <Book className="w-5 h-5 mr-3" />
            <span>Books</span>
          </Link>
        </li>

        <li>
          <Link
            to="/users/get-all-users"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200
              ${isActive('/users/get-all-users') ? 'bg-gray-100 border-l-4 border-blue-500' : ''}`}
          >
            <Users className="w-5 h-5 mr-3" />
            <span>Users</span>
          </Link>
        </li>

        <li>
          <Link
            to="/transaction"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200
              ${isActive('/transaction') ? 'bg-gray-100 border-l-4 border-blue-500' : ''}`}
          >
            <RefreshCw className="w-5 h-5 mr-3" />
            <span>Transactions</span>
          </Link>
        </li>

        <li>
          <Link
            to="/reports"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200
              ${isActive('/reports')? 'bg-gray-100 border-l-4 border-blue-500' : ''}`}
          >
            <RefreshCw className="w-5 h-5 mr-3" />
            <span>Reports</span>
          </Link>
        </li>

        <li>
          <Link
            to="#"
            onClick={handleLogout}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavBar;