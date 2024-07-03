import { useMemo } from "react";

type CellProps = {
  text: string;
  index: number;
  handleClick: any;
  selected: boolean;
  winningTile: boolean;
  winningTileIndex: number;
  bingo: boolean;
  bingos: number[][];
  animationRunning: boolean;
  bingoAnimationTiming: number | undefined;
};

const Cell = ({
  text,
  index,
  handleClick,
  selected,
  // winningTile,
  // winningTileIndex,
  bingo,
  bingos,
  animationRunning,
  bingoAnimationTiming = 0.25,
}: CellProps) => {
  // If I recalculate on bingos, it will do it when bingos are cleared, still need to use the bingo
  const winningTile = useMemo(() => {
    return bingos.some((bingo) => bingo.includes(index));
  }, [bingos, index]);

  const winningTileIndex = useMemo(() => {
    for (let i = 0; i < bingos.length; i++) {
      const bingoIndex = bingos[i].indexOf(index);
      if (bingoIndex !== -1) return bingoIndex;
    }
    return -1;
  }, [bingos, index]);

  return (
    // TODO Using the winning tile class could be better
    <div
      className={`transition-transform border-[1px] border-black flex flex-col justify-center items-center aspect-square border-box relative p-4 lg:hover:bg-slate-500  lg:hover:text-white lg:border-2 ${
        selected ? "" : "lg:hover:scale-105 hover:z-10"
      } ${selected ? "" : "cursor-pointer"}
        
      `}
      onClick={() => handleClick(index)}
    >
      <img
        src="/stamp.svg"
        className={`${selected ? "opacity-100" : "opacity-0"} ${
          winningTile ? "spin " : ""
        } delay-${winningTile ? winningTileIndex : ""} ${
          bingo ? "will-change-transform" : ""
        } absolute inset-0 w-full h-full transition-opacity transform-gpu`}
        alt="Bingo Stamp"
        style={{
          animationDelay: `${winningTileIndex * bingoAnimationTiming}s`,
        }}
      />

      <span
        className={`font-bold z-10 lg:absolute lg:top-2 lg:left-2 ${
          selected ? "text-white lg:text-black" : "text-black"
        } ${animationRunning && winningTile ? "opacity-0 lg:opacity-100" : ""}`}
      >
        {index}
      </span>

      {!selected && <span className="hidden lg:block">{text}</span>}

      <div
        className={`absolute text-white text-xl font-bold transition-[opacity,transform] ${
          animationRunning ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{
          transitionDelay: animationRunning
            ? `${winningTileIndex * bingoAnimationTiming}s`
            : "",
        }}
      >
        {"BINGO"[winningTileIndex]}
      </div>
    </div>
  );
};

export default Cell;
