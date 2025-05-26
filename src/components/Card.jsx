import React from 'react';
import '../assets/styles/index.css'; 

function Card({ image, isFlipped, onClick }) {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">❓</div>
        <div className="card-back">
          <img src={image} alt="carte" />
        </div>
      </div>
    </div>
  );
}

export default Card;

