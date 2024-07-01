type CellProps = {
  text: string;
  index: number;
  handleClick: any;
  selected: boolean;
};

const Cell = ({ text, index, handleClick, selected }: CellProps) => {
  return (
    <div
      className={`cell ${selected ? "selected" : ""}`}
      data-index={index}
      onClick={() => handleClick(index)}
    >
      <span className="cell-number">{index}</span>
      <span>{text}</span>
    </div>
  );
};

export default Cell;
