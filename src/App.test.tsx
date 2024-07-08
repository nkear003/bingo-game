import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tile from "./Tile";

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

describe("Tile Component", () => {
  const defaultProps = {
    text: "Test Phrase",
    tileNumber: 1,
    handleClick: jest.fn(),
    selected: false,
    animationDelay: undefined,
    isWinningTile: false,
    bingoLetterIndex: undefined,
  };

  it("renders the Tile component with correct props when not selected", () => {
    render(<Tile {...defaultProps} />);
    expect(screen.getByText("Test Phrase")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("B")).not.toBeInTheDocument(); // Check that BINGO letter is not present
  });

  it("renders the Tile component with correct props when selected", () => {
    render(<Tile {...defaultProps} selected />);
    expect(screen.queryByText("Test Phrase")).not.toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("B")).not.toBeInTheDocument(); // Check that BINGO letter is not present
  });

  it("renders the Tile component with correct props when selected and is a winning tile", () => {
    const winningProps = {
      ...defaultProps,
      selected: true,
      isWinningTile: true,
      animationDelay: 1,
      bingoLetterIndex: 0, // Assuming 'B' is the first letter
    };
    render(<Tile {...winningProps} />);
    expect(screen.queryByText("Test Phrase")).not.toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument(); // Check that BINGO letter is present
  });

  it("handles click events correctly", () => {
    const handleClick = jest.fn();
    render(<Tile {...defaultProps} handleClick={handleClick} />);

    fireEvent.click(screen.getByText("1"));

    expect(handleClick).toHaveBeenCalledWith(1);
  });
});
