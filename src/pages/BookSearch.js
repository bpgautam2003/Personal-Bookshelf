import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import _ from 'lodash';
import BookCard from '../components/BookCard';

const BookSearch = ({ onAddToBookshelf }) => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBooks = async (q) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://openlibrary.org/search.json?q=${q}&limit=10&page=1`);
            setBooks(response.data.docs);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks('bestsellers');
    }, []);

    const debouncedFetchBooks = useCallback(_.debounce((q) => fetchBooks(q), 300), []);

    const handleSearch = (e) => {
        const q = e.target.value;
        setQuery(q);
        if (q) {
            debouncedFetchBooks(q);
        } else {
            fetchBooks('bestsellers'); 
        }
    };

    return (
        <>
        <div className='header'>
        

        <div className="book-search">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search for books..."
            />
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
        </div>

            <button onClick={() => window.location.href = '/bookshelf'}>Go to My Bookshelf</button>

            </div>
        <div className='book-container'>
            <div className="book-results">
                {books.map((book) => (
                    <BookCard key={book.key} book={book} onAddToBookshelf={onAddToBookshelf} />
                ))}
            </div>
        </div>
        </>
    );
};

export default BookSearch;
