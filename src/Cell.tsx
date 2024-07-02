type CellProps = {
  text: string;
  index: number;
  handleClick: any;
  selected: boolean;
};

const Cell = ({ text, index, handleClick, selected }: CellProps) => {
  return (
    <div
      className={`transition-colors border-2 border-black flex flex-col justify-center items-center aspect-square border-box md:hover:bg-gray-500 md:relative md:p-4 ${
        selected ? "bg-gray-500" : ""
      }`}
      onClick={() => handleClick(index)}
    >
      <span className="font-bold md:absolute md:top-2 md:left-2">{index}</span>
      <span className="hidden md:block">{text}</span>
    </div>
  );
};

export default Cell;
