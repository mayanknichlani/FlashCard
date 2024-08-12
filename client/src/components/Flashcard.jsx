import React, { useState } from 'react';
import './Flashcard.css'; 

const Flashcard = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <p>{flashcard.question}</p>
          </div>
          <div className="flashcard-back">
            <p>{flashcard.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
