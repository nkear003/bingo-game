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
      className={`transition-transform border-[1px] border-black flex flex-col justify-center items-center aspect-square border-box relative p-4 lg:hover:bg-slate-500  lg:hover:text-white lg:border-2 ${
        isSelected ? "" : "lg:hover:scale-105 hover:z-10"
      } ${isSelected ? "" : "cursor-pointer"}
        
      `}
      onClick={() => handleClick(tileNumber)}
    >
      {/* Stamp */}
      <img
        src="/stamp.svg"
        className={`${isSelected ? "opacity-100" : "opacity-0"} ${
          isWinningTile ? "spin " : ""
        } ${
          isWinningTile ? "will-change-transform" : ""
        } absolute inset-0 w-full h-full transition-opacity transform-gpu`}
        alt="Bingo Stamp"
        style={{
          animationDelay: animationDelay ? `${animationDelay}s` : "",
        }}
      />

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
