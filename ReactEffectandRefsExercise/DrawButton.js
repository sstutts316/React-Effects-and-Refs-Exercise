import React from 'react';

function DrawButton({ isDrawing, toggleAutoDraw }) {
  return (
    <button onClick={toggleAutoDraw}>
      {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
    </button>
  );
}

export default DrawButton;