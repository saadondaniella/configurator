function ViewControls({ onViewChange }) {
  return (
    <div className="view-controls">
      <button
        className="view-control view-control-1"
        onClick={() => onViewChange(1)}
      >
        [1]
      </button>

      <button
        className="view-control view-control-2"
        onClick={() => onViewChange(2)}
      >
        [2]
      </button>

      <button
        className="view-control view-control-3"
        onClick={() => onViewChange(3)}
      >
        [3]
      </button>
    </div>
  );
}

export default ViewControls;