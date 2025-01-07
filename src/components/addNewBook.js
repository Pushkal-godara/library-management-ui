import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBooks } from "../services/apiService";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  IconButton
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  LibraryBooks  as BookAddIcon,
  Send as SendIcon
} from "@mui/icons-material";

const AddBookPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publication_year: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBooks(newBook);
      navigate("/books");
    } catch (err) {
      console.error("Error adding new book:", err);
      setError("Error adding new book");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BookAddIcon color="primary" />
            <Typography variant="h4" component="h1">
              Add a new book
            </Typography>
          </Box>
          <IconButton 
            onClick={() => navigate("/books")}
            color="primary"
            aria-label="back to books"
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              fullWidth
              label="Book Title"
              name="title"
              value={newBook.title}
              onChange={handleChange}
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={newBook.author}
              onChange={handleChange}
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Publication Year"
              name="publication_year"
              type="number"
              value={newBook.publication_year}
              onChange={handleChange}
              variant="outlined"
              required
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<SendIcon />}
              sx={{ alignSelf: "flex-end" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBookPage;