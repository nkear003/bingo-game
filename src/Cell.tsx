import { useMemo } from "react";
import {
  getIndexOfBingos,
  getTileIndexFromWinningBingoSet,
  calculateMultipleBingoAnimOffset,
} from "./functions";

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
  animationTimingBingoBase: number | undefined;
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
  animationTimingBingoBase = 0.25,
}: CellProps) => {
  // TODO If I recalculate on bingos, it will do it when bingos are cleared, still need to use the bingo
  const winningTile = useMemo(() => {
    return bingos.some((bingo) => bingo.includes(index));
  }, [bingos, index]);

  const winningTileIndex = useMemo(
    () => getTileIndexFromWinningBingoSet(index, bingos),
    [bingos, index]
  );

  // Where this animation is in list of "bingos"
  const bingosIndex = useMemo(
    () => getIndexOfBingos(index, bingos),
    [bingos, index]
  );

  // Delay compensate, so that animations run sequentially
  const delayOffset = useMemo(
    // Total time it takes to run animation * where we are in queue
    () => calculateMultipleBingoAnimOffset(animTimeTotal, bingosIndex),
    [bingosIndex, animTimeTotal]
  );

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
          animationDelay: `${winningTileIndex * animationTimingBingoBase}s`,
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
            ? `${winningTileIndex * animationTimingBingoBase}s`
            : "",
        }}
      >
        {"BINGO"[winningTileIndex]}
      </div>
    </div>
  );
};

export default Cell;
