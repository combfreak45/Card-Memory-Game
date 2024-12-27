import React, { useState, useRef } from "react";

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

  const timerRef = useRef(null);

  const startTimer = () => {
    
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {        
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
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
          updatedCards[firstIndex].isMatched = true;
          updatedCards[secondIndex].isMatched = true;
          setCards(updatedCards);
          setSelectedCards([]);


          if (updatedCards.every((card) => card.isMatched)) {
            setIsGameComplete(true);
            stopTimer();
          }
        }, 500);
      } else {

        setTimeout(() => {
          updatedCards[firstIndex].isFlipped = false;
          updatedCards[secondIndex].isFlipped = false;
          setCards(updatedCards);
          setSelectedCards([]);
        }, 500);
      }
    }
  };

  return (
    <div className="m-10">
      <h1 className="text-xl mb-5">Card Memory Game</h1>
      <div className="mb-2">Time Remaining: {time}s</div>
      <button
        className="mb-2 bg-green-500 p-2 rounded-lg"
        onClick={startTimer}
        disabled={timerRef.current || isGameComplete}
      >
        Start Game
      </button>
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
          <div className="text-xl mt-10 text-green-700">
            🎉 You Won! You took {60 - time} seconds 🎉
          </div>
      )}
    </div>
  );
}

export default App;
