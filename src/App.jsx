import React, { useState, useEffect } from 'react';
import Card from "./components/Card.jsx";
import Timer from "./components/Timer.jsx";
import GameOver from "./components/GameOver.jsx"; 

import carte1 from './assets/images/carte1.jpg';
import carte2 from './assets/images/carte2.avif';
import carte3 from './assets/images/carte3.jpg';
import carte4 from './assets/images/carte4.jpg';
import carte5 from './assets/images/carte5.jpg';
import carte6 from './assets/images/carte6.jpg';
import carte7 from './assets/images/carte7.jpg';
import carte8 from './assets/images/carte8.avif';

import victorySound from './assets/audio/victory-sound.mp3';
import flipSound from './assets/audio/click.mp3';

const images = [carte1, carte2, carte3, carte4, carte5, carte6, carte7, carte8];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const shuffleCards = () => {
    const doubled = [...images, ...images];
    const shuffled = doubled
      .map((img) => ({ img, id: Math.random() }))
      .sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setGameWon(false);
    setGameOver(false);
    setResetCounter(prev => prev + 1);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || gameOver || gameWon) return;

    const flipAudio = new Audio(flipSound);
    flipAudio.play();

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.img === secondCard.img) {
        setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);

      const audio = new Audio(victorySound);
      audio.play();
    }
  }, [matchedCards, cards]);

  const handleTimeUpdate = (seconds) => {
    setTimerSeconds(seconds);
    if (seconds >= 10 && !gameWon) {
      setGameOver(true);
      
    }
  };

  return (
    <div className="app">
      <h1>🎮 Jeu Memory</h1>

      <Timer
        isRunning={!gameWon && !gameOver}
        resetTrigger={resetCounter}
        onTimeUpdate={handleTimeUpdate}
      />

      <button onClick={shuffleCards}>Nouvelle partie</button>

      <div className="grid">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            image={card.img}
            isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {gameWon && (
        <div className="modal active">
          <div className="modal-content">
            <h2>🎉 Bravo, tu as gagné ! 🎉</h2>
            <p>Tu as trouvé toutes les paires.</p>
            <p>⏱️ Temps : {Math.floor(timerSeconds / 60).toString().padStart(2, '0')}:{(timerSeconds % 60).toString().padStart(2, '0')}</p>
            <button onClick={shuffleCards}>Rejouer</button>
          </div>
        </div>
      )}

      {gameOver && !gameWon && (
        <GameOver onRestart={shuffleCards} />
      )}
    </div>
  );
}

export default App;


