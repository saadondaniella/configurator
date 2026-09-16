function ViewControls({ onViewChange }) {
  function handleControlPointerDown(event) {
    event.stopPropagation();
  }

  return (
    <div className="view-controls">
      <button
        className="view-control view-control-1"
        type="button"
        onPointerDown={handleControlPointerDown}
        onClick={() => onViewChange(1)}
      >
        [1]
      </button>

      <button
        className="view-control view-control-2"
        type="button"
        onPointerDown={handleControlPointerDown}
        onClick={() => onViewChange(2)}
      >
        [2]
      </button>

      <button
        className="view-control view-control-3"
        type="button"
        onPointerDown={handleControlPointerDown}
        onClick={() => onViewChange(3)}
      >
        [3]
      </button>
    </div>
  );
}

export default ViewControls;
