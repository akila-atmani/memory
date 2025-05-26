import React, { useState, useEffect } from 'react';
import '../assets/styles/Timer.css'; // Assure-toi que le chemin du fichier CSS est correct


function Timer({ isRunning, resetTrigger }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    // Reset timer when resetTrigger changes
    setSeconds(0);
  }, [resetTrigger]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      ⏱️ Temps : {formatTime()}
    </div>
  );
}

export default Timer;
