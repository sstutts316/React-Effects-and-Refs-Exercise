import React, { useState } from 'react';

function ShuffleDeckButton({ deckId, onShuffleComplete }) {
  const [isShuffling, setIsShuffling] = useState(false);

  const shuffleDeck = async () => {
    setIsShuffling(true);
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
      if (response.ok) {
        onShuffleComplete();
      } else {
        console.error('Shuffle failed:', response.statusText);
      }
    } catch (error) {
      console.error('Shuffle failed:', error);
    }
    setIsShuffling(false);
  };

  return (
    <button onClick={shuffleDeck} disabled={isShuffling}>
      Shuffle Deck
    </button>
  );
}

export default ShuffleDeckButton;
