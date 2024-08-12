import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import './FlashcardList.css'; // Create this CSS file for additional styling

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/flashcards')
      .then((response) => response.json())
      .then((data) => setFlashcards(data))
      .catch((error) => console.error('Error fetching flashcards:', error));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flashcard-list">
      {flashcards.length > 0 ? (
        <>
          <Flashcard flashcard={flashcards[currentIndex]} />
          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={flashcards.length <= 1}>Previous</button>
            <button onClick={handleNext} disabled={flashcards.length <= 1}>Next</button>
          </div>
        </>
      ) : (
        <p>No flashcards available</p>
      )}
    </div>
  );
};

export default FlashcardList;
