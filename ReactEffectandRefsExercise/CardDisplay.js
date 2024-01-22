import React from 'react';

function CardDisplay({ card }) {
  if (!card) return null;

  return (
    <img className="cardImage" src={card.image} alt={`Card: ${card.value} of ${card.suit}`} />
  );
}

export default CardDisplay;