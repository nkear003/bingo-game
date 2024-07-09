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

// GAME SETUP
// Calculate delays
const animationSetDuration = 6 * animationConfig.animationTimingBaseInSec; // 5 tiles + 1 for tail
// Setup phrases randomly on board
const animationSetDurationMs = animationSetDuration * 1000;
const shufflePhrases = shuffleArray([...phrases]);
// Add the free tile to the set
shufflePhrases.splice(12, 0, freeWord);
// Setup the board
const board = shufflePhrases;

function App() {
  const [selectedTiles, setSelectedTiles] = useState<number[]>([13]);
  const [isBingo, setIsBingo] = useState(false);
  const [winningTiles, setWinningTiles] = useState<number[]>([]);
  const [winningTileSets, setWinningTileSets] = useState<number[][]>([]);
  const [bingoCount, setBingoCount] = useState(0);
  const [winningCombinations, setWinningCombinations] = useState(
    initialWinningCombinations
  );

  const handleTileClick = (index: number) => {
    // Don't allow clicks during animation or if we have already selected the tile
    if (isBingo || selectedTiles.includes(index)) return;
    const newSelected = [...selectedTiles, index];
    setSelectedTiles(newSelected);
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

      // Set the winning tile sets to state
      setWinningTileSets(newBingos);

      // Update bingo count and set bingo/winning state
      setBingoCount((prevCount) => prevCount + newBingos.length);
      setIsBingo(true);
    }
  };

  useEffect(() => {
    if (isBingo) {
      const animateWinningTileSets = async () => {
        for (let i = 0; i < winningTileSets.length; i++) {
          const winningTileSet = winningTileSets[i];

          setWinningTiles(winningTileSet);

          // Wait for the animation to complete
          await new Promise((resolve) =>
            setTimeout(resolve, animationSetDurationMs)
          );

          // Clear winning tiles to reset animation
          setWinningTiles([]);

          // Wait just long enough for classes to reset
          await new Promise((resolve) => setTimeout(resolve, 0));
        }

        // Reset after all animations are done
        setIsBingo(false);
        setWinningTiles([]);
        setWinningTileSets([]);
      };

      animateWinningTileSets();
    }
  }, [isBingo, winningTileSets]);

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
                  isBingo={isBingo}
                  tileNumber={tileNumber}
                  isSelected={selectedTiles.includes(tileNumber)}
                  isWinningTile={isWinningTile}
                  bingoLetterIndex={
                    isWinningTile ? winningTiles.indexOf(tileNumber) : undefined
                  }
                  animationDelay={
                    isWinningTile
                      ? animationConfig.animationTimingBaseInSec *
                        winningTiles.indexOf(tileNumber)
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
                    selectedTiles.includes(tileNumber) ? "line-through" : ""
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
