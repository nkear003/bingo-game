import { useEffect, useState } from "react";
import "./App.css";
import Cell from "./Cell";
import { shuffleArray } from "./helpers";

const phrases = [
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

const freeWord = "FREE";

const winningCombinations = [
  // Horizontal Rows
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  // Vertical Columns
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  // Diagonals
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

function App() {
  const [board, setBoard] = useState<string[] | []>([]);
  const [selected, setSelected] = useState<number[]>([12]);
  const [bingo, setBingo] = useState(false);

  useEffect(() => {
    const shufflePhrases = shuffleArray([...phrases]);
    shufflePhrases.splice(12, 0, freeWord);
    setBoard(shufflePhrases);
  }, []);

  const checkBingo = (selected: number[]) => {
    for (const combination of winningCombinations) {
      if (combination.every((index) => selected.includes(index))) {
        return setBingo(true);
      }
    }
  };

  const handleCellClick = (index: number) => {
    if (bingo) return; // only allow one bingo
    if (selected.includes(index)) return;
    const newSelected = [...selected, index];
    setSelected(newSelected);
    checkBingo(newSelected);
  };

  return (
    <div className="app">
      <main>
        <h1 className="text-xl">Bingo Game</h1>
        {bingo && <h2 className="bingo">🎉 That's a bingo!!! 🎉</h2>}
        <div className="board">
          {board.map((text, index) => (
            <Cell
              handleClick={handleCellClick}
              key={index}
              text={text}
              index={index}
              selected={selected.includes(index)}
            />
          ))}
        </div>
        <ol>
          {board.map((text, index) => (
            <li
              key={`bottom-${index}`}
              className={selected.includes(index) ? "selected" : ""}
              onClick={() => handleCellClick(index)}
            >
              {text}
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}

export default App;
