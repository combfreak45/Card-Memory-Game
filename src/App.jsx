import React, { useState } from "react";

function App() {

  const [cards, setCards] = useState([
    { id: 1, value: "A", isFlipped: false, isMatched: false },
    { id: 2, value: "B", isFlipped: false, isMatched: false },
    { id: 3, value: "A", isFlipped: false, isMatched: false },
    { id: 4, value: "B", isFlipped: false, isMatched: false },
  ]);

  const [selectedCards, setSelectedCards] = useState([]);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [time, setTime] = useState(60);

  const timer = () => {

    if (time > 0) {
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1 || isGameComplete) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

  };

  
  const handleCardClick = (index) => {
    if (
      cards[index].isFlipped ||
      cards[index].isMatched ||
      selectedCards.length === 2
    ) {
      return;
    }

    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;

    setCards(updatedCards);

    
    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {

      const [firstIndex, secondIndex] = newSelectedCards;

      if (cards[firstIndex].value === cards[secondIndex].value) {

        setTimeout(() => {

          const matchedCards = [...updatedCards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setSelectedCards([]);

          const allMatched = matchedCards.every((card) => card.isMatched);

          if (allMatched) {
            setIsGameComplete(true);
          }

        }, 500);

      } else {
        
        setTimeout(() => {

          const flippedBackCards = [...updatedCards];
          flippedBackCards[firstIndex].isFlipped = false;
          flippedBackCards[secondIndex].isFlipped = false;
          setCards(flippedBackCards);
          setSelectedCards([]);

        }, 500);

      }
    }
  };

  return (
    <div className="m-10">
      <div className="text-xl mb-5">Card Memory Game</div>
      <div>{Math.floor(time/60)}:{time=== 60 ? "00" : time}</div>
      <button className="mb-2 bg-green-500 p-2 rounded-lg" onClick={timer}>Start</button>
      <div className="flex flex-row gap-10">

        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`h-[200px] w-[150px] rounded-xl ${
              card.isFlipped || card.isMatched ? "bg-green-500" : "bg-black"
            } text-white p-10 flex justify-center items-center`}
            onClick={() => handleCardClick(index)}
          >
            {card.isFlipped || card.isMatched ? card.value : "Click"}
          </div>
        ))}

      </div>

      {isGameComplete && (
        <div>
        <div className="text-2xl m-10 text-green-700">You Won!</div>
        <div>{time}</div>
        </div>
      )}
    </div>
  );
}

export default App;
