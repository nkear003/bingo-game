type CellProps = {
  text: string;
  index: number;
  handleClick: any;
  selected: boolean;
};

const Cell = ({ text, index, handleClick, selected }: CellProps) => {
  return (
    <div
      className={`transition-colors border-2 border-black flex flex-col justify-center items-center aspect-square border-box hover:bg-gray-500 md:relative ${
        selected ? "selected" : ""
      }`}
      data-index={index}
      onClick={() => handleClick(index)}
    >
      <span>{index}</span>
      <span className="hidden md:visible">{text}</span>
    </div>
  );
};

export default Cell;
