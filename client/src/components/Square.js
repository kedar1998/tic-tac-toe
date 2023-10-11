import React from "react";

const Square = ({ value, chooseSquare }) => {
  return (
    <div
      onClick={chooseSquare}
      className="w-20 h-20 border-2 border-[#333] flex justify-center items-center"
    >
      {value}
    </div>
  );
};

export default Square;
