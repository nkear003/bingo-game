type CellProps = {
  text: string;
  index: number;
  handleClick: any;
  selected: boolean;
};

const Cell = ({ text, index, handleClick, selected }: CellProps) => {
  return (
    <div
      className="transition-colors border-[1px] border-black flex flex-col justify-center items-center aspect-square border-box relative lg:hover:bg-gray-500 lg:p-4 lg:border-2"
      onClick={() => handleClick(index)}
    >
      {selected && (
        <img
          src="/stamp.svg"
          // className={`${
          //   selected ? "visible" : "invisible"
          // } absolute inset-0 w-full h-full shadow-sm`}
          className="absolute inset-0 w-full h-full shadow-sm"
          alt="Bingo Stamp"
        />
      )}
      <span
        className={`font-bold lg:absolute lg:top-2 lg:left-2 z-10 ${
          selected ? "text-white" : "text-black"
        }`}
      >
        {index}
      </span>
      <span className="hidden lg:block">{text}</span>
    </div>
  );
};

export default Cell;
