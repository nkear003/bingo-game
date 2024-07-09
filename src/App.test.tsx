import { fireEvent, render, screen } from "@testing-library/react";
import Tile from "./Tile";

describe("Tile Component", () => {
  const defaultProps = {
    text: "Test Phrase",
    tileNumber: 1,
    handleClick: jest.fn(),
    isSelected: false,
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
    render(<Tile {...defaultProps} isSelected />);
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
