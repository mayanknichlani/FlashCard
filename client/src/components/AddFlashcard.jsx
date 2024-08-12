import React, { useState } from 'react';

const AddFlashcard = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Flashcard added:', data);
      })
      .catch(error => console.error('Error adding flashcard:', error));
  };

  return (
    <div>
      <h2>Add Flashcard</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Flashcard</button>
      </form>
    </div>
  );
};

export default AddFlashcard;
