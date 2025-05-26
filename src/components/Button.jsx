import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="game-button">
      {label}
    </button>
  );
};

export default Button;

