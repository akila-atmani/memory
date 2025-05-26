import React from "react";

const VictoryMessage = ({ onRestart }) => {
  return (
    <div className="victory-message">
      <h2>🎉 Bravo, vous avez gagné ! 🎉</h2>
      <button onClick={onRestart}>Rejouer</button>
    </div>
  );
};

export default VictoryMessage;

