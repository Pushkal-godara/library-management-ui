import React, { useState, useEffect } from 'react';
import { fetchBooks, fetchUsers } from '../services/apiService';
import SideNavBar from '../components/sideNavBar';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [returnedToday, setReturnedToday] = useState(0);
  const [borrowedToday, setBorrowedToday] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksData = await fetchBooks();
        const usersData = await fetchUsers();
        setTotalBooks(booksData.length);
        setTotalUsers(usersData.length);
        // You'll need to implement the logic for returned and borrowed books
        setReturnedToday(1); // Placeholder
        setBorrowedToday(3); // Placeholder
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <SideNavBar />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div className="stats-container">
          <div className="stat-card books">
            <h2>{totalBooks}</h2>
            <p>Total Books</p>
          </div>
          <div className="stat-card users">
            <h2>{totalUsers}</h2>
            <p>Total Users</p>
          </div>
          <div className="stat-card returned">
            <h2>{returnedToday}</h2>
            <p>Returned Today</p>
          </div>
          <div className="stat-card borrowed">
            <h2>{borrowedToday}</h2>
            <p>Borrowed Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;