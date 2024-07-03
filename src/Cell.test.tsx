import {
  getIndexOfBingos,
  getTileIndexFromWinningBingoSet,
  calculateMultipleBingoAnimOffset,
} from "./functions";

const bingosTestData = [
  [0, 1, 2, 3, 4], // Bingo 1
  [5, 6, 7, 8, 9], // Bingo 2
  [10, 11, 12, 13, 14], // Bingo 3
];

const animTimeTotal = 0.25 * 5; // 1.25

describe("Basic functions test with index of 7", () => {
  let indexToTest = 7;

  test("bingosIndex", () => {
    const bingosIndex = getIndexOfBingos(indexToTest, bingosTestData);
    expect(bingosIndex).toEqual(1);
  });

  test("getTileIndexFromWinningBingoSet", () => {
    const tileIndexFromWinningBingoSet = getTileIndexFromWinningBingoSet(
      indexToTest,
      bingosTestData
    );
    expect(tileIndexFromWinningBingoSet).toEqual(2);
  });
});

describe("Delay offset for different indexes", () => {
  test("index from first bingo set", () => {
    const bingosIndex = getIndexOfBingos(2, bingosTestData);
    const delayOffset = calculateMultipleBingoAnimOffset(
      animTimeTotal,
      bingosIndex
    );
    // One animation (1.25) + number of previous that have to run (0)
    expect(delayOffset).toEqual(1.25);
  });

  test("index from second bingo set", () => {
    const bingosIndex = getIndexOfBingos(7, bingosTestData);
    const delayOffset = calculateMultipleBingoAnimOffset(
      animTimeTotal,
      bingosIndex
    );
    // One animation (1.25) + number of previous that have to run (1)
    expect(delayOffset).toEqual(2.25);
  });

  test("index from third bingo set", () => {
    const bingosIndex = getIndexOfBingos(11, bingosTestData);
    const delayOffset = calculateMultipleBingoAnimOffset(
      animTimeTotal,
      bingosIndex
    );
    // One animation (1.25) + number of previous that have to run (2)
    expect(delayOffset).toEqual(3.25);
  });
});
