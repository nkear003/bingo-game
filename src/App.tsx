import { useEffect, useState } from "react";
import "./App.css";
import Cell from "./Cell";
import { shuffleArray } from "./helpers";
import { initialWinningCombinations, freeWord, phrases } from "./config";

export const animationConfig = {
  base: 0.25,
  delayTail: 0.25,
  tiles: 5,
};
const animTimeBase = animationConfig.base * animationConfig.tiles;

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
  const [animTimeTotal, setAnimTimeTotal] = useState<number>(0);

  useEffect(() => {
    const shufflePhrases = shuffleArray([...phrases]);
    shufflePhrases.splice(12, 0, freeWord);
    setBoard(shufflePhrases);
  }, []);

  useEffect(() => {
    if (bingos.length > 0) {
      const newAnimTimeTotal = animTimeBase * bingos.length;
      const animationTimingBingoTotalMs = newAnimTimeTotal * 1000;
      setAnimTimeTotal(newAnimTimeTotal);

      setAnimationRunning(true);
      // Stop animations
      const animationTimer = setTimeout(() => {
        setAnimationRunning(false);
      }, animationTimingBingoTotalMs);

      // Give animations a moment to finish and reset
      const bingoTimer = setTimeout(() => {
        setBingo(false);
        setBingos([]);
        setWinningTiles([]);
      }, animationTimingBingoTotalMs + 250);

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
                animTimeTotal={animTimeTotal}
                animationTimingBase={animationConfig.base}
                // animationTimingBingoSec={animationTimingBingoSec}
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
