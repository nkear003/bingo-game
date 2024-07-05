import {
  getIndexOfBingos,
  getTileIndexFromWinningBingoSet,
  calculateMultipleBingoAnimOffset,
  calculateDelayTimingOffsetStep,
} from "./functions";
import { animationConfig, delayAnimationBase } from "./config";

const bingosTestData = [
  [0, 1, 2, 3, 4], // Bingo 1
  [5, 6, 7, 8, 9], // Bingo 2
  [10, 11, 12, 13, 14], // Bingo 3
];

const bingoAnimSingleSetTotalTime = delayAnimationBase; // 0.25 * 5 = 1.25

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

/**
 * @deprecated We no longer need the delay offset
 */
describe("Delay offset for different indexes", () => {
  test("index from first bingo set", () => {
    const bingosIndex = getIndexOfBingos(2, bingosTestData);
    const delayOffset = calculateMultipleBingoAnimOffset(
      bingoAnimSingleSetTotalTime,
      bingosIndex
    );
    // One animation (1.25) + number of previous that have to run (0)
    expect(delayOffset).toEqual(1.25);
  });

  test("index from second bingo set", () => {
    const bingosIndex = getIndexOfBingos(7, bingosTestData);
    const delayOffset = calculateMultipleBingoAnimOffset(
      bingoAnimSingleSetTotalTime,
      bingosIndex
    );
    // One animation (1.25) + number of previous that have to run (1)
    expect(delayOffset).toEqual(2.25);
  });

  test("index from third bingo set", () => {
    const bingosIndex = getIndexOfBingos(11, bingosTestData);
    const delayOffset = calculateMultipleBingoAnimOffset(
      bingoAnimSingleSetTotalTime,
      bingosIndex
    );
    // One animation (1.25) + number of previous that have to run (2)
    expect(delayOffset).toEqual(3.25);
  });
});

describe("Each tile animation calculated correctly", () => {
  let data: any[] = [];
  bingosTestData.forEach((bingo) => {
    bingo.forEach((index) => {
      const bingosIndex = getIndexOfBingos(index, bingosTestData);

      // const timingDelay = calculateMultipleBingoAnimOffset(
      //   bingoAnimSingleSetTotalTime,
      //   getIndexOfBingos(index, bingosTestData)
      // );

      const winningTileIndex = getTileIndexFromWinningBingoSet(
        index,
        bingosTestData
      );

      const timingDelayStep = calculateDelayTimingOffsetStep(
        winningTileIndex,
        animationConfig.base,
        bingosIndex
      );

      let result = {
        bingosIndex: bingosIndex,
        // timingDelay: timingDelay,
        winningTileIndex: winningTileIndex,
        timingDelayStep: timingDelayStep,
      };
      data.push(result);
    });
  });

  const staticSteppedArrayFifteenSteps = [
    0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5,
  ];

  test("with basic data", () => {
    const arrayOfTimingDelaySteps = data.map((item) => item.timingDelayStep);
    console.log(arrayOfTimingDelaySteps);
    expect(arrayOfTimingDelaySteps).toEqual(staticSteppedArrayFifteenSteps);
  });
});
