import axios from 'axios';

const API_URL = 'http://localhost:1111/library-svc'; // your backend URL

// Create axios instance
const api = axios.create({
  baseURL: API_URL
});

// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Login method
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data && response.data.access_token) {
      return response.data;
    } else {
      throw new Error('No token received');
    }
  } catch (error) {
    console.error('API Login error:', error.response || error);
    throw error;  // Re-throw to be caught by the component
  }
};

// Signup method
export const signup = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, credentials);
    return response.data;
  } catch (error) {
    console.error('API Signup error:', error.response || error);
    throw error;  // Re-throw to be caught by the component
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      await api.post(`${API_URL}/auth/logout`);
      localStorage.removeItem('token');
    }
  } catch (error) {
    console.error('Logout error:', error);
    // Still remove token from localStorage even if API call fails
    localStorage.removeItem('token');
    throw error;
  }
};

// Fetch all books.
export const fetchBooks = async () => {
  try {
    const response = await api.get(`/books/get-all-books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Add new books to the library.
export const addBooks = async (bookData) => {
  try {
    const response = await api.post(`/books/add-book`, bookData);
    return response.data;
  } catch (error) {
    console.log('Error while creating books:', error);
    throw error;
  }
};

// Fetch all users.
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users/get-all-users')
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};


// Search books by title
export const searchBooksByTitle = async (bookName) => {
  try {
    const response = await api.get(`/books/search/book`, {
      params: { name: bookName }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching books by title:', error);
    throw error;
  }
};


// Search books by author
export const searchBooksByAuthor = async (authorName) => {
  try {
    const response = await api.get(`/books/search/author`, {
      params: { name: authorName }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching books by author:', error);
    throw error;
  }
};

