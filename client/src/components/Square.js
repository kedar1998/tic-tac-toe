import React from "react";

const Square = ({
  value,
  chooseSquare,
  name,
  player,
  player1,
  player2,
  socketId,
}) => {
  return (
    <button
      disabled={
        (player1 === socketId && player === "O") ||
        (player2 === socketId && player === "X")
      }
      onClick={chooseSquare}
      className="w-20 h-20 border-2 border-[#333] flex justify-center items-center"
    >
      {value}
    </button>
  );
};

export default Square;
