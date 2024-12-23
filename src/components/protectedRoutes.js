import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // Check if token exists AND is not expired
  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  // Check token expiration
  try {
    const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    if (tokenData.exp * 1000 < Date.now()) {
      localStorage.removeItem('token'); // Clear expired token
      return <Navigate to="/auth/login" />;
    }
  } catch (error) {
    localStorage.removeItem('token'); // Clear invalid token
    return <Navigate to="/auth/login" />;
  }
  
  return children;
};

export default ProtectedRoute;