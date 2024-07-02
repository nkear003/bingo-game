type CellProps = {
  text: string;
  index: number;
  handleClick: any;
  selected: boolean;
};

const Cell = ({ text, index, handleClick, selected }: CellProps) => {
  return (
    <div
      className="transition-colors border-2 border-black flex flex-col justify-center items-center aspect-square border-box relative lg:hover:bg-gray-500 lg:p-4"
      onClick={() => handleClick(index)}
    >
      {selected && (
        <img
          src="/stamp.svg"
          className="absolute inset-0 w-full h-full"
          alt="Bingo Stamp"
        />
      )}
      <span className="font-bold lg:absolute lg:top-2 lg:left-2">{index}</span>
      <span className="hidden lg:block">{text}</span>
    </div>
  );
};

export default Cell;
