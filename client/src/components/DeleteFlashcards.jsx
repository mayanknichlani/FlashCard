import React, { useState, useEffect } from 'react';

const DeleteFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/flashcards')
      .then(response => response.json())
      .then(data => setFlashcards(data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/flashcards/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted flashcard from the list
        setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
      })
      .catch(error => console.error('Error deleting flashcard:', error));
  };

  return (
    <div>
      <h2>Delete Flashcards</h2>
      <ul>
        {flashcards.map(flashcard => (
          <li key={flashcard.id}>
            {flashcard.question}
            <button onClick={() => handleDelete(flashcard.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteFlashcards;
