type CellProps = {
  text: string;
  index: number;
  handleClick: any;
  selected: boolean;
  children: any;
  winningTile: boolean;
  winningTileIndex: number;
  animationRunning: boolean;
};

const Cell = ({
  text,
  index,
  handleClick,
  selected,
  children,
  winningTile,
  winningTileIndex,
  animationRunning,
}: CellProps) => {
  return (
    <div
      className={`transition-transform border-[1px] border-black flex flex-col justify-center items-center aspect-square border-box relative p-4 lg:hover:bg-slate-500  lg:hover:text-white lg:border-2 ${
        selected ? "" : "lg:hover:scale-105 hover:z-10"
      } ${winningTile ? "" : "cursor-pointer"}
        
      `}
      onClick={() => handleClick(index)}
    >
      <img
        src="/stamp.svg"
        className={`${selected ? "opacity-100" : "opacity-0"} ${
          winningTile ? "spin " : ""
        } delay-${winningTile ? winningTileIndex : ""} ${
          animationRunning ? "will-change-transform" : ""
        }
          
        absolute inset-0 w-full h-full transition-opacity transform-gpu`}
        alt="Bingo Stamp"
      />

      <span
        className={`font-bold lg:absolute lg:top-2 lg:left-2 z-10 ${
          selected ? "text-white lg:text-black" : "text-black"
        } ${winningTile ? "opacity-0" : ""}`}
      >
        {index}
      </span>

      {!selected && <span className="hidden lg:block">{text}</span>}
      {children}
    </div>
  );
};

export default Cell;
