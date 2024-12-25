import { useEffect } from "react";
import { useState } from "react";




function App() {
  const [card1, setCard1] = useState(true);
  const [card2, setCard2] = useState(true);
  const [card3, setCard3] = useState(true);
  const [card4, setCard4] = useState(true);




  const changeCard1 = () => {
    console.log("change1");
    setCard1(!card1);
  };

  const changeCard2 = () => {
    console.log("change2");
    setCard2(!card2);
  };

   const changeCard3 = () => {
    console.log("change3");
    setCard3(!card3);
  };

   const changeCard4 = () => {
    console.log("change4");
    setCard4(!card4);
  };
  
  return (
    <div className="m-10">
      <div className="text-xl m-10">Car memory game</div>
      <div className="flex flex-row gap-10">
        <div>
          {card1 ? (
            <div
              className="h-[200px] w-[100px] bg-black text-white p-10"
              onClick={changeCard1}
            >
              Click
            </div>
          ) : (
            <div
              className="h-[200px] w-[100px] bg-black text-white p-10"
              onClick={changeCard1}
            >
              Card1
            </div>
          )}
        </div>
        <div>
          {card2 ? (
            <div
              className="h-[200px] w-[100px] bg-black text-white p-10"
              onClick={changeCard2}
            >
              Click
            </div>
          ) : (
            <div
              className="h-[200px] w-[100px] bg-black text-white p-10"
              onClick={changeCard2}
            >
              Card2
            </div>
          )}
        </div>
        <div>
          {card3 ? (
            <div
              className="h-[200px] w-[100px] bg-black text-white p-10"
              onClick={changeCard3}
            >
              Click
            </div>
          ) : (
            <div
              className="h-[200px] w-[100px] bg-black text-white p-10"
              onClick={changeCard3}
            >
              Card3
            </div>
          )}
        </div>
        <div>
          {card4 ? (
            <div
              className="h-[200px] w-[100px] bg-black text-white p-10"
              onClick={changeCard4}
            >
              Click
            </div>
          ) : (
            <div
              className="h-[200px] w-[100px] bg-black text-white p-10"
              onClick={changeCard4}
            >
              Card4
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
