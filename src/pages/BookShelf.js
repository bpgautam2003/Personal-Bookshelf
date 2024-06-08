import React from 'react';

const Bookshelf = ({ onRemoveFromBookshelf }) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];

    return (
        <div className="bookshelf">
            <h2>My Bookshelf</h2>
            <div className='book-container'>
            {bookshelf.length > 0 ? (
                <div className='book-results'>
                    {bookshelf.map((book, index) => (
                        <div className='book-card' key={index}>
                            <h3>{book.title}</h3> 
                            <p>by {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
                            <button onClick={() => onRemoveFromBookshelf(index)}>Remove</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No books in your bookshelf yet.</p>
            )}
            </div>
        </div>
    );
};

export default Bookshelf;
