import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookSearch from './pages/BookSearch';
import Bookshelf from './pages/BookShelf';
import './App.css'

const App = () => {
  const [bookshelf, setBookshelf] = useState(() => {
    const savedBooks = localStorage.getItem('bookshelf');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  const removeFromBookshelf = (index) => {
    const updatedBookshelf = bookshelf.filter((_, i) => i !== index);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  useEffect(() => {
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
  }, [bookshelf]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookSearch onAddToBookshelf={addToBookshelf} />} />
        <Route path="/bookshelf" element={<Bookshelf onRemoveFromBookshelf={removeFromBookshelf} />} />
      </Routes>
    </Router>
  );
};

export default App;
