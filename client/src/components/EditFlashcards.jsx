import React, { useState, useEffect } from 'react';

const EditFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/flashcards')
      .then(response => response.json())
      .then(data => setFlashcards(data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const handleSelect = (flashcard) => {
    setSelectedFlashcard(flashcard);
    setQuestion(flashcard.question);
    setAnswer(flashcard.answer);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (selectedFlashcard) {
      fetch(`http://localhost:5000/flashcards/${selectedFlashcard.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer }),
      })
        .then(() => {
          // Refresh flashcards list after update
          setFlashcards(flashcards.map(fc => (fc.id === selectedFlashcard.id ? { ...fc, question, answer } : fc)));
          setSelectedFlashcard(null);
          setQuestion('');
          setAnswer('');
        })
        .catch(error => console.error('Error updating flashcard:', error));
    }
  };

  return (
    <div>
      <h2>Edit Flashcards</h2>
      <ul>
        {flashcards.map(flashcard => (
          <li key={flashcard.id} onClick={() => handleSelect(flashcard)}>
            {flashcard.question}
          </li>
        ))}
      </ul>
      {selectedFlashcard && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button type="submit">Update Flashcard</button>
        </form>
      )}
    </div>
  );
};

export default EditFlashcards;
