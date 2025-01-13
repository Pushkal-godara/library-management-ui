import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchBooks,
  searchBooksByAuthor,
  searchBooksByTitle
} from '../services/apiService';
import {
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
  Alert,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Pagination
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  LibraryBooks as LibraryBooksIcon
} from '@mui/icons-material';

const BooksPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [error, setError] = useState('');
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(6);

  // Existing functionality remains the same
  const getBooks = useCallback(async () => {
    try {
      const response = await fetchBooks(currentPage, limit);
      setBooks(Array.isArray(response.data) ? response.data : []);
      setTotalPages(response.meta.totalPages);
      setError('');
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Error fetching books');
      setBooks([]);
    }
  }, [currentPage, limit]); // Dependencies that affect the books fetching

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    if (!searchTerm.trim()) {
      await getBooks();
      return;
    }
    try {
      let searchResults;
      if (searchType === 'title') {
        searchResults = await searchBooksByTitle(searchTerm);
      } else {
        searchResults = await searchBooksByAuthor(searchTerm);
      }
      setBooks(Array.isArray(searchResults.data) ? searchResults.data : []);
      setError('');
    } catch (err) {
      console.error('Error searching books:', err);
      setError('Error searching books');
      setBooks([]);
    }
  };

  const handleSearchReset = async () => {
    setSearchTerm('');
    setError('');
    setCurrentPage(1); // Reset to first page when resetting search
    await getBooks();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/add-book')}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: 1
            }}
          >
            Add Book
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LibraryBooksIcon color="primary" sx={{ fontSize: 30 }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
              Books
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books..."
              size="small"
              sx={{ flexGrow: 1 }}
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />
            <TextField
              select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              size="small"
              sx={{ width: 150 }}
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            >
              <MenuItem value="title">By Title</MenuItem>
              <MenuItem value="author">By Author</MenuItem>
            </TextField>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: 1
              }}
            >
              Search
            </Button>
            <Button
              type="button"
              onClick={handleSearchReset}
              variant="outlined"
              startIcon={<RefreshIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: 1
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>

        {books.length > 0 ? (
          <>
            <List sx={{ bgcolor: 'background.paper' }}>
              {books.map((book, index) => (
                <React.Fragment key={book.id || index}>
                  <ListItem sx={{ px: 3, py: 2, display: 'flex', gap: 2 }}>
                    {/* Add Book Image */}
                    <Box
                      component="img"
                      src={book.image_url || 'https://t3.ftcdn.net/jpg/10/12/18/72/360_F_1012187289_Hhpw6hTTl7OsSfQkztbWQ0E6EX7wmTFS.jpg'} // Fallback to a default image if no URL
                      alt={book.title}
                      sx={{
                        width: 80,
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 1,
                        bgcolor: 'grey.100'
                      }}
                      onError={(e) => {
                        e.currentTarget.src = 'https://t3.ftcdn.net/jpg/10/12/18/72/360_F_1012187289_Hhpw6hTTl7OsSfQkztbWQ0E6EX7wmTFS.jpg'; // Fallback if image fails to load
                      }}
                    />
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {book.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          {book.Author && (
                            <Typography component="span" variant="body2" color="text.secondary">
                              by {book.Author.author_name}
                            </Typography>
                          )}
                          <Typography variant="body2" color="text.secondary">
                            Published: {book.publication_year}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < books.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            {/* Add Pagination component */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>
          </>
        ) : (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No books found
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default BooksPage;