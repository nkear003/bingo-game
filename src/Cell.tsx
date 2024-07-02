type CellProps = {
  text: string;
  index: number;
  handleClick: any;
  selected: boolean;
};

const Cell = ({ text, index, handleClick, selected }: CellProps) => {
  return (
    <div
      className="transition-all border-[1px] border-black flex flex-col justify-center items-center aspect-square border-box relative p-4 lg:hover:bg-slate-500 lg:hover:text-white lg:border-2 cursor-pointer lg:hover:scale-105 hover:z-10"
      onClick={() => handleClick(index)}
    >
      <img
        src="/stamp.svg"
        className={`${
          selected ? "opacity-100" : "opacity-0"
        } absolute inset-0 w-full h-full transition-opacity`}
        alt="Bingo Stamp"
      />

      <span
        className={`font-bold lg:absolute lg:top-2 lg:left-2 z-10 ${
          selected ? "text-white lg:text-black" : "text-black"
        }`}
      >
        {index}
      </span>
      <span className="hidden lg:block">{text}</span>
    </div>
  );
};

export default Cell;
