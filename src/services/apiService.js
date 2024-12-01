import axios from 'axios';

const API_URL = 'http://localhost:1111/library-svc'; // Replace with your backend URL

// Fetch all books.
export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Add new books to the library.
export const addBooks = async (bookData) => {
  try {
    const response = await axios.post(`${API_URL}/books`, bookData);
    return response.data;
  } catch (error) {
    console.log('Error while creating books:', error);
    throw error;
  }
};

// Fetch all users.
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Other API functions for login, adding books, etc.
