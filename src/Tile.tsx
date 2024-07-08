type TileProps = {
  text: string;
  tileNumber: number;
  handleClick: (tileNumber: number) => void;
  selected: boolean;
  animationDelay: number | undefined;
  isWinningTile: boolean;
  bingoLetterIndex: number | undefined;
};

const Tile = ({
  text,
  tileNumber,
  handleClick,
  selected,
  animationDelay,
  isWinningTile,
  bingoLetterIndex,
}: TileProps) => {
  if (isWinningTile)
    console.log(`$tileNumber: ${tileNumber} animationDelay: ${animationDelay}`);

  return (
    <div
      className={`transition-transform border-[1px] border-black flex flex-col justify-center items-center aspect-square border-box relative p-4 lg:hover:bg-slate-500  lg:hover:text-white lg:border-2 ${
        selected ? "" : "lg:hover:scale-105 hover:z-10"
      } ${selected ? "" : "cursor-pointer"}
        
      `}
      onClick={() => handleClick(tileNumber)}
    >
      {/* Stamp */}
      <img
        src="/stamp.svg"
        className={`${selected ? "opacity-100" : "opacity-0"} ${
          isWinningTile ? "spin " : ""
        } ${
          isWinningTile ? "will-change-transform" : ""
        } absolute inset-0 w-full h-full transition-opacity transform-gpu`}
        alt="Bingo Stamp"
        style={{
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Tile number */}
      <span
        className={`font-bold z-10 lg:absolute lg:top-2 lg:left-2 ${
          selected ? "text-white lg:text-black" : "text-black"
        } ${isWinningTile ? "opacity-0 lg:opacity-100" : ""}`}
      >
        {tileNumber}
      </span>

      {/* Text */}
      {!selected && <span className="hidden lg:block">{text}</span>}

      {/* Bingo letter */}
      <div
        // className={`absolute text-white text-xl font-bold opacity-0 transition-[opacity,transform]`}
        className={`absolute text-white text-xl font-bold transition-[transform,opacity] opacity-0 ${
          isWinningTile ? "reveal" : ""
        }`}
        style={{
          animationDelay: `${animationDelay}s`,
        }}
        // onAnimationEnd={() => console.log(`animation for ${tileNumber} ended`)}
      >
        {bingoLetterIndex && "BINGO"[bingoLetterIndex]}
      </div>
    </div>
  );
};

export default Tile;
