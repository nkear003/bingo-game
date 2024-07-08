import { useEffect, useState } from "react";
import "./App.css";
import Tile from "./Tile";
import { shuffleArray } from "./helpers";
import {
  initialWinningCombinations,
  freeWord,
  phrases,
  animationConfig,
} from "./config";
import { generateDelayTiming, generateIndexOfWinningTiles } from "./functions";

// GAME SETUP
// Setup delay increments
const animationDelayIncrements = generateDelayTiming(
  phrases.length + 1, // One word is the free word
  animationConfig.animationTimingBaseInSec,
  true
);
// Setup phrases randomly on board
const shufflePhrases = shuffleArray([...phrases]);
// Add the free tile to the set
shufflePhrases.splice(12, 0, freeWord);
// Setup the board
const board = shufflePhrases;
const bingoLetterIndexes = generateIndexOfWinningTiles();

function App() {
  const [selected, setSelected] = useState<number[]>([13]);
  const [isBingo, setIsBingo] = useState(false);
  const [winningTiles, setWinningTiles] = useState<number[]>([]);
  const [bingoCount, setBingoCount] = useState(0);
  const [winningCombinations, setWinningCombinations] = useState(
    initialWinningCombinations
  );

  const handleTileClick = (index: number) => {
    // Don't allow clicks during animation or if we have already selected the tile
    if (isBingo || selected.includes(index)) return;
    const newSelected = [...selected, index];
    setSelected(newSelected);
    checkBingo(newSelected);
  };

  const checkBingo = (tilesToCheck: number[]) => {
    // Check if any set of winning combos fully matches the currently selected tiles
    const newBingos = winningCombinations.filter((winningCombination) =>
      winningCombination.every((index) => tilesToCheck.includes(index))
    );

    // If we have any "bingos" or winning combinations selected...
    if (newBingos.length > 0) {
      // Update the available winning combos for future bingos
      const updatedWinningCombinations = winningCombinations.filter(
        (winningCombination) => !newBingos.includes(winningCombination)
      );
      setWinningCombinations(updatedWinningCombinations);

      // Create a flat index of all selected tiles which are a part of a winning set
      const bingosFlattened = newBingos.flat();
      setWinningTiles(bingosFlattened);

      // Update bingo count and set bingo/winning state
      setBingoCount((prevCount) => prevCount + newBingos.length);
      setIsBingo(true);
    }
  };

  useEffect(() => {
    if (isBingo) {
      // Calculate total animation timing
      const animationTotalDuration =
        (winningTiles.length + 1) * animationConfig.animationTimingBaseInSec;
      const animationTimingBingoTotalMs = animationTotalDuration * 1000;

      // Timer for resetting after animation has run
      const bingoTimer = setTimeout(() => {
        setIsBingo(false);
        setWinningTiles([]);
      }, animationTimingBingoTotalMs);

      return () => {
        clearTimeout(bingoTimer);
      };
    }
  }, [isBingo, winningTiles]);

  return (
    <div className="bg-slate-500 min-h-svh flex justify-center p-4 lg:p-8 lg:items-center">
      <main className="flex flex-col items-center w-full max-w-sm lg:max-w-5xl">
        <p className="text-xl font-bold text-white mb-2 lg:text-4xl lg:mb-6">
          Bingo Count: {bingoCount}
        </p>
        <div className="grid grid-cols-5 grid-rows-5 bg-white border-[1px] border-black mb-4 w-full lg:border-2">
          {board &&
            board.map((text, index) => {
              const tileNumber = index + 1;
              const isWinningTile = winningTiles.includes(tileNumber);
              return (
                <Tile
                  handleClick={handleTileClick}
                  key={index}
                  text={text}
                  tileNumber={tileNumber}
                  selected={selected.includes(tileNumber)}
                  isWinningTile={isWinningTile}
                  bingoLetterIndex={
                    isWinningTile
                      ? bingoLetterIndexes[winningTiles.indexOf(tileNumber)]
                      : undefined
                  }
                  animationDelay={
                    isWinningTile
                      ? animationDelayIncrements[
                          winningTiles.indexOf(tileNumber)
                        ]
                      : undefined
                  }
                />
              );
            })}
        </div>

        <ol className="list-inside list-decimal text-white cursor-pointer lg:hidden">
          {board &&
            board.map((text, index) => {
              const tileNumber = index + 1;
              return (
                <li
                  key={`bottom-${index}`}
                  className={
                    selected.includes(tileNumber) ? "line-through" : ""
                  }
                  onClick={() => handleTileClick(tileNumber)}
                >
                  {text}
                </li>
              );
            })}
        </ol>
      </main>
    </div>
  );
}

export default App;
