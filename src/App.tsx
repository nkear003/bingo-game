import React, { useState } from "react";
import "./App.css";
import Cell from "./Cell";

const initialBoard = [
  "(animal noises in the background)",
  "Is ____ on the call?",
  "We do have 5 minutes left",
  "Hello, hello?",
  "Could you please get closer to the mic?",
  "I was having connection issues",
  "Sorry, I had problems logging in",
  "Can you email that to everyone?",
  "Can you repeat, please?",
  "Sorry, something ___ with my calendar",
  "(child noises in the background)",
  "Could you share these slides afterwards?",
  "FREE",
  "Sorry, I didn’t catch that",
  "You will send the minutes?",
  "I need to jump on another call",
  "Can everyone go on mute?",
  "Can we take this offline?",
  "Do you see my screen?",
  "Is everyone in the call?",
  "Can somebody grant presenter rights?",
  "Sorry, I was on mute.",
  "(load painful echo/feedback)",
  "Next slide, please.",
  "Who just joined?",
];

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState<number[]>([12]);

  const handleClick = (index: number) => {
    if (selected.includes(index)) return;
    setSelected([...selected, index]);
  };

  return (
    <div className="app">
      <main>
        <h1 className="text-xl">Bingo Game</h1>
        <div className="board">
          {board.map((text, index) => (
            <Cell
              handleClick={handleClick}
              key={index}
              text={text}
              index={index}
              selected={selected.includes(index)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
