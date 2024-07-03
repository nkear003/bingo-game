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
  bingoAnimSingleSetTotalTime: number,
  delayOffset: number
) => winningTileIndex * bingoAnimSingleSetTotalTime + delayOffset;
