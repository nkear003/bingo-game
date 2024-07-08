import { generateIndexOfWinningTiles, generateDelayTiming } from "./functions";
import { initialWinningCombinations } from "./config";

const winningTileCombinations = [
  initialWinningCombinations[0],
  initialWinningCombinations[1],
  initialWinningCombinations[2],
];
const winningCombosFlattened = winningTileCombinations.flat();
const bingoLetterIndexes = generateIndexOfWinningTiles();

describe("Bingo animation timing, 15 steps, starting from 0", () => {
  const winningTiles = winningTileCombinations.flat();
  const delayIncrements = generateDelayTiming(winningTiles.length, 0.25, true);

  test("delay increments are generated with correct length", () => {
    expect(delayIncrements.length).toBe(15);
  });

  test("function generates increments correctly, when not starting with 0", () => {
    expect(delayIncrements).toStrictEqual([
      0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5,
    ]);
  });
});

describe("Bingo letter is selected correctly", () => {
  test("index of 3", () => {
    const bingoLetterIndex =
      bingoLetterIndexes[winningCombosFlattened.indexOf(3)];
    expect(bingoLetterIndex).toEqual(2);
  });

  test("index of 7", () => {
    const bingoLetterIndex =
      bingoLetterIndexes[winningCombosFlattened.indexOf(7)];
    expect(bingoLetterIndex).toEqual(1);
  });

  test("index of 14", () => {
    const bingoLetterIndex =
      bingoLetterIndexes[winningCombosFlattened.indexOf(14)];
    expect(bingoLetterIndex).toEqual(3);
  });
});
