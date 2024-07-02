type CellProps = {
  text: string;
  index: number;
  handleClick: any;
  selected: boolean;
};

const Cell = ({ text, index, handleClick, selected }: CellProps) => {
  return (
    <div
      className={`transition-colors border-2 border-black flex flex-col justify-center items-center aspect-square border-box lg:hover:bg-gray-500 lg:relative lg:p-4 ${
        selected ? "bg-gray-500" : ""
      }`}
      onClick={() => handleClick(index)}
    >
      <span className="font-bold lg:absolute lg:top-2 lg:left-2">{index}</span>
      <span className="hidden lg:block">{text}</span>
    </div>
  );
};

export default Cell;
