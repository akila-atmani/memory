import React from 'react';

function GameOver({ onRestart }) {
  return (
    <div className="modal active">
      <div className="modal-content">
        <h2>💀 Temps écoulé !</h2>
        <p>Dommage, tu n'as pas réussi à trouver toutes les paires à temps.</p>
        <button onClick={onRestart}>Rejouer</button>
      </div>
    </div>
  );
}

export default GameOver;


