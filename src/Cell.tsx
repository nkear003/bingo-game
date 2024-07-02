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
      <p>
        <span className="cell-number">{index}</span>
        <span>{text}</span>
      </p>
    </div>
  );
};

export default Cell;
