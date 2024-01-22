import React, { useEffect, useRef, useState } from 'react';
import ShuffleDeckButton from './ShuffleDeckButton'; 
import CardDisplay from './CardDisplay';
import DrawButton from './DrawButton';

function CardApp() {
  const [deckId, setDeckId] = useState('');
  const [currentCard, setCurrentCard] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawIntervalRef = useRef(null);

  useEffect(() => {
    const fetchDeckId = async () => {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/');
        const data = await response.json();
        setDeckId(data.deck_id);
        setRemaining(data.remaining);
      } catch (error) {
        console.error('Error fetching new deck:', error);
      }
    };

    fetchDeckId();
  }, []);

  const toggleAutoDraw = () => {
    setIsDrawing(!isDrawing);
    if (!isDrawing) {
      drawIntervalRef.current = setInterval(drawCard, 1000);
    } else {
      clearInterval(drawIntervalRef.current);
    }
  };

  const drawCard = async () => {
    if (remaining === 0) {
      alert('Error: no cards remaining!');
      clearInterval(drawIntervalRef.current);
      return;
    }

    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await response.json();

      if (data.success) {
        setCurrentCard(data.cards[0]);
        setRemaining(data.remaining);
      } else {
        console.error('Error drawing a card:', data.error);
      }
    } catch (error) {
      console.error('Error drawing a card:', error);
    }
  };

  useEffect(() => {
    if (remaining === 0 && isDrawing) {
      clearInterval(drawIntervalRef.current);
      setIsDrawing(false);
    }
  }, [remaining, isDrawing]);

  const handleShuffleComplete = () => {
    setCurrentCard(null);
    setRemaining(52); // Assuming a standard deck size
  };

  return (
    <div>
      <CardDisplay card={currentCard} />
      <DrawButton isDrawing={isDrawing} toggleAutoDraw={toggleAutoDraw} />
      <ShuffleDeckButton deckId={deckId} onShuffleComplete={handleShuffleComplete} />
    </div>
  );
}

export default CardApp;