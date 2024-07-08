import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Tile from "./Tile";
import { render, screen, fireEvent } from "@testing-library/react";

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
  const delayIncrements = generateDelayTiming(
    winningCombosFlattened.length,
    0.25,
    true
  );

  test("delay increments are generated with correct length", () => {
    expect(delayIncrements.length).toBe(15);
  });

  test("function generates increments correctly, when not starting with 0", () => {
    expect(delayIncrements).toStrictEqual([
      0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5,
    ]);
  });
});

describe("Tiles get correct animation delay", () => {

  // 

  // it("should recieve the correct props", () => {
  //   const handleClick = jest.fn();
  //   const props = {
  //     handleClick,
  //     text: "Test Tile",
  //     tileNumber: 1,
  //     selected: true,
  //     winningTile: false,
  //     winningTileIndex: 0,
  //     animationDelay: 0.5,
  //   };

  //   render(<Tile {...props} />);
  //   const tile = screen.getByTestId(`tile-${props.tileNumber}`);

  //   // Check text content
  //   expect(tile).toHaveTextContent(props.text);

  //   // Check class based on selected prop
  //   expect(tile).toHaveClass("selected");
  //   expect(tile).not.toHaveClass("winning");

  //   // Check inline style
  //   expect(tile).toHaveStyle(`animation-delay: ${props.animationDelay}s`);

  //   // Simulate click and check if the handleClick function is called with correct tile number
  //   fireEvent.click(tile);
  //   expect(handleClick).toHaveBeenCalledWith(props.tileNumber);
  // });
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
