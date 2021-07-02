import React from "react";

function CircularSpinner() {
  return (
    <svg
      className={`spinner fill-current stroke-current focus:outline-none`}
      viewBox="0 0 50 50"
    >
      <circle
        stroke="currentColor"
        className="path"
        cx="25"
        cy="25"
        r="15"
        fill="none"
        strokeWidth="4"
      ></circle>
    </svg>
  );
}

export default CircularSpinner;
