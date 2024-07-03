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
const initialWinningCombinations = [
  // Horizontal rows
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
  // Vertical columns
  // We will use them reversed in case of multiple wins
  // [1, 6, 11, 16, 21],
  // [2, 7, 12, 17, 22],
  // [3, 8, 13, 18, 23],
  // [4, 9, 14, 19, 24],
  // [5, 10, 15, 20, 25],
  // Vertical columns reversed
  [21, 16, 11, 6, 1],
  [22, 17, 12, 7, 2],
  [23, 18, 13, 8, 3],
  [24, 19, 14, 9, 4],
  [25, 20, 15, 10, 5],
  // Diagonals
  [1, 7, 13, 19, 25],
  [21, 17, 13, 9, 5], // Reversed because it looks better
];
const bingoAnimationTiming = 0.25;

function App() {
  const [board, setBoard] = useState<string[] | []>();
  const [selected, setSelected] = useState<number[]>([13]);
  const [bingo, setBingo] = useState(false);
  const [winningTiles, setWinningTiles] = useState<number[]>([]);
  const [animationRunning, setAnimationRunning] = useState(false);
  const [bingoCount, setBingoCount] = useState(0);
  const [winningCombinations, setWinningCombinations] = useState(
    initialWinningCombinations
  );
  const [bingos, setBingos] = useState<number[][]>([]);

  useEffect(() => {
    const shufflePhrases = shuffleArray([...phrases]);
    shufflePhrases.splice(12, 0, freeWord);
    setBoard(shufflePhrases);
  }, []);

  useEffect(() => {
    if (bingos.length > 0) {
      setAnimationRunning(true);
      // Stop animations
      const animationTimer = setTimeout(() => {
        setAnimationRunning(false);
      }, bingoAnimationTiming * 6 * 1000); // 5 bingo tiles, then fade letters

      // Reset after a win
      const bingoTimer = setTimeout(() => {
        setBingo(false);
        setBingos([]);
        setWinningTiles([]);
      }, bingoAnimationTiming * 7 * 1000); // 5 bingo tiles + a tail delay tail

      return () => {
        clearTimeout(animationTimer);
        clearTimeout(bingoTimer);
      };
    }
  }, [bingos]);

  const checkBingo = (tilesToCheck: number[]) => {
    const newBingos = winningCombinations.filter((winningCombination) =>
      winningCombination.every((index) => tilesToCheck.includes(index))
    );

    if (newBingos.length > 0) {
      const updatedWinningCombinations = winningCombinations.filter(
        (winningCombination) => !newBingos.includes(winningCombination)
      );

      setWinningCombinations(updatedWinningCombinations);
      setBingos((prevBingos) => [...prevBingos, ...newBingos]);
      setBingoCount((prevCount) => prevCount + newBingos.length);
    }
  };

  const handleCellClick = (index: number) => {
    if (bingo) return; // No clicks during animation
    if (selected.includes(index)) return;
    const newSelected = [...selected, index];
    setSelected(newSelected);
    checkBingo(newSelected);
  };

  return (
    <div className="bg-slate-500 min-h-svh flex justify-center p-4 lg:p-8 lg:items-center">
      <main className="flex flex-col items-center w-full max-w-sm lg:max-w-5xl">
        <p className="text-xl font-bold text-white mb-2 lg:text-4xl lg:mb-6">
          Bingo Count: {bingoCount}
        </p>
        <div className="grid grid-cols-5 grid-rows-5 bg-white border-[1px] border-black mb-4 w-full lg:border-2">
          {board &&
            board.map((text, index) => (
              // TODO Rename cell to tile
              <Cell
                handleClick={handleCellClick}
                key={index}
                text={text}
                index={index + 1}
                selected={selected.includes(index + 1)}
                winningTile={bingo && winningTiles.includes(index + 1)}
                winningTileIndex={winningTiles.indexOf(index + 1)}
                bingo={bingo}
                bingos={bingos}
                animationRunning={animationRunning}
                bingoAnimationTiming={bingoAnimationTiming}
              />
            ))}
        </div>

        <ol className="list-inside list-decimal text-white cursor-pointer lg:hidden">
          {board &&
            board.map((text, index) => (
              <li
                key={`bottom-${index}`}
                className={selected.includes(index + 1) ? "line-through" : ""}
                onClick={() => handleCellClick(index + 1)}
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
