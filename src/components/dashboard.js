import React, { useState, useEffect } from 'react';
import { fetchUsers, getBookAvailabilityReport } from '../services/apiService';
import SideNavBar from '../components/sideNavBar';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid
} from '@mui/material';
import {
  MenuBook as BookIcon,
  People as UsersIcon,
  AssignmentReturn as ReturnIcon,
  BookmarkAdd as BorrowIcon
} from '@mui/icons-material';

const StatCard = ({ title, value, color, icon: Icon }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      borderRadius: 4,
      bgcolor: color,
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200px',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-5px)'
      }
    }}
  >
    <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
      {value}
    </Typography>
    <Typography variant="body1" sx={{ opacity: 0.9 }}>
      {title}
    </Typography>
    <Icon sx={{ position: 'absolute', right: 16, top: 16, opacity: 0.3, fontSize: 40 }} />
  </Paper>
);

const Dashboard = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [returned, setReturned] = useState(0);
  const [borrowed, setBorrowed] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksData = await getBookAvailabilityReport();
        const usersData = await fetchUsers();
        setTotalBooks(booksData.data.total_books);
        setTotalUsers(usersData.length);
        setReturned(booksData.data.total_available_books); 
        setBorrowed(booksData.data.total_borrowed_books); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: 'Total Books In Library',
      value: totalBooks,
      color: '#3498db', // Blue
      icon: BookIcon
    },
    {
      title: 'Total Users',
      value: totalUsers,
      color: '#2ecc71', // Green
      icon: UsersIcon
    },
    {
      title: 'Total Available Books',
      value: returned,
      color: '#f1c40f', // Yellow
      icon: ReturnIcon
    },
    {
      title: 'Total Unavailable Books',
      value: borrowed,
      color: '#e74c3c', // Red
      icon: BorrowIcon
    }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          bgcolor: '#f5f5f5',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              color: '#2c3e50'
            }}
          >
            Dashboard
          </Typography>

          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatCard {...stat} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;