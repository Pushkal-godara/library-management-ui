import React, { useEffect, useState } from 'react';
import { fetchBooks, addBooks } from '../services/apiService';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [newBooks, setNewBooks] = useState({
    title: '',
    author: '',
    publication_year: ''
  });

  useEffect(() => {
    const getBooks = async () => {
      const booksData = await fetchBooks();
      setBooks(booksData);
    };
    getBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBooks(newBooks);
      const updatedBooks = await fetchBooks();
      setBooks(updatedBooks);
      setNewBooks({
        title: '',
        author: '',
        publication_year: ''
      });
    } catch (error) {
      console.error('Error adding new book: ', error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setNewBooks(prev  => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Books</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          value={newBooks.title}
          onChange={handleChange}
          placeholder='Book Title'
        />
        <input
          type='text'
          name='author'
          value={newBooks.author}
          onChange={handleChange}
          placeholder='Book Author'
        />
        <input
          type='text'
          name='publication_year'
          value={newBooks.publication_year}
          onChange={handleChange}
          placeholder='Publishing year'
        />
        <button type="submit">Add Book</button>
      </form>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;
