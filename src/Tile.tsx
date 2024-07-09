type TileProps = {
  text: string;
  tileNumber: number;
  handleClick: (tileNumber: number) => void;
  isSelected: boolean;
  animationDelay: number | undefined;
  isWinningTile: boolean;
  bingoLetterIndex: number | undefined;
};

const Tile = ({
  text,
  tileNumber,
  handleClick,
  isSelected,
  animationDelay,
  isWinningTile,
  bingoLetterIndex,
}: TileProps) => {
  return (
    <div
      className={`transition-transform border-[1px] border-black flex flex-col justify-center items-center aspect-square border-box relative p-4  lg:hover:text-white lg:border-2 ${
        isSelected ? "" : "lg:hover:scale-105 lg:hover:bg-secondary hover:z-10"
      } ${isSelected ? "" : "cursor-pointer"}
        
      `}
      onClick={() => handleClick(tileNumber)}
    >
      {/* Stamp */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className={`${isSelected ? "opacity-100" : "opacity-0"} ${
          isWinningTile ? "spin " : ""
        } ${
          isWinningTile ? "will-change-transform" : ""
        } absolute inset-0 w-full h-full transition-opacity transform-gpu fill-secondary`}
        style={{
          animationDelay: animationDelay ? `${animationDelay}s` : "",
        }}
      >
        <circle cx="10" cy="10" r="9" stroke="none" stroke-width=".5" />
      </svg>

      {/* Tile number */}
      <span
        className={`font-bold z-10 lg:absolute lg:top-2 lg:left-2 ${
          isSelected ? "text-white lg:text-black" : "text-black"
        } ${isWinningTile ? "opacity-0 lg:opacity-100" : ""}`}
      >
        {tileNumber}
      </span>

      {/* Text */}
      {!isSelected && <p className="hidden lg:block">{text}</p>}

      {/* Bingo letter */}
      {isWinningTile && (
        <div
          className={`absolute text-white text-xl font-bold opacity-0 ${
            isWinningTile ? "reveal" : ""
          }`}
          style={{
            animationDelay: animationDelay ? `${animationDelay}s` : "",
          }}
        >
          {bingoLetterIndex !== undefined && "BINGO"[bingoLetterIndex]}
        </div>
      )}
    </div>
  );
};

export default Tile;
