export const getIndexOfBingos = (index: number, bingos: number[][]) => {
  for (let i = 0; i < bingos.length; i++) {
    if (bingos[i].includes(index)) {
      return i; // Return the index of the bingo array containing the index
    }
  }
  return -1;
};

export const getTileIndexFromWinningBingoSet = (
  index: number,
  bingos: number[][]
) => {
  for (let i = 0; i < bingos.length; i++) {
    const bingoIndex = bingos[i].indexOf(index);
    if (bingoIndex !== -1) return bingoIndex;
  }
  return -1;
};

export const calculateMultipleBingoAnimOffset = (
  bingoAnimTimeTotal: number,
  indexInBingoSet: number
) => bingoAnimTimeTotal + indexInBingoSet;

export const calculateDelayTimingOffsetStep = (
  winningTileIndex: number,
  delayAnimationBase: number,
  bingosIndex: number
) => {
  return (
    winningTileIndex * delayAnimationBase +
    bingosIndex +
    (bingosIndex === 0 ? 0 : delayAnimationBase)
  );
};

export const generateDelayTiming = (
  length: number,
  increment: number,
  startFromZero = false
) =>
  Array.from({ length }, (_, i) =>
    startFromZero ? i * increment : (i + 1) * increment
  );

export const concatArrays = <T>(...arrays: T[][]): T[] =>
  arrays.reduce((acc, array) => acc.concat(array), []);
