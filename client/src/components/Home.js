import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import io from "socket.io-client";
import Square from "./Square";
import { Patterns } from "./Patterns";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

const Home = () => {
  const navigate = useNavigate();
  const { name, logoutUser } = useAppContext();

  // State variables
  const [room, setRoom] = useState("");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [showUI, setShowUI] = useState(false);
  const [player, setPlayer] = useState("O");
  const [winner, setWinner] = useState({ winner: "", state: "" });
  const [showPopup, setShowPopup] = useState(false);

  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to join a room
  function joinRoom() {
    if (room !== "") {
      socket.emit("Join_room", room);
      setShowUI(true);
      setLoading(true);
    }
  }

  // Function to handle square selection
  function chooseSquare(num) {
    if (board[num] === "") {
      const newBoard = [...board];
      newBoard[num] = player;
      setBoard(newBoard);

      socket.emit("sent_data", { board: newBoard, room });
    }
  }

  // Function to restart the game
  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setPlayer("X");
  };

  // Function to check for a winner
  const checkWinner = () => {
    Patterns.forEach((currentPattern) => {
      const firstPlayer = board[currentPattern[0]];
      if (firstPlayer === "") {
        return;
      }
      let foundWinner = true;
      currentPattern.forEach((index) => {
        if (board[index] !== firstPlayer) {
          foundWinner = false;
        }
      });

      if (foundWinner) {
        setWinner({ winner: player, state: "won" });
        setShowPopup(true);

        setTimeout(() => {
          navigate(0);
        }, 8000);
      }
    });
  };

  // Function to check for a draw
  const checkDraw = () => {
    if (board.every((item) => item !== "")) {
      setWinner({ winner: "No One", state: "Draw" });
    }
  };

  useEffect(() => {
    // Listen for the game start event
    socket.on("game_start", () => {
      setGameStarted(true);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // Listen for board updates from the server
    socket.on("receive_data", (data) => {
      setBoard(data.board);
    });
  }, [board, player]);

  useEffect(() => {
    // Check for a winner and a draw, and toggle player turns
    checkWinner();
    checkDraw();

    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    if (winner.state !== "") {
      restartGame();
    }
  }, [winner]);

  return (
    <div className="bg-[#181818] h-screen text-white">
      {/* Navbar */}
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex justify-between items-end pt-10 pb-4">
          <div>
            <img src="/logo.svg" alt="Logo" />
            <p className="text-xl md:text-2xl font-semibold mt-1">{`Hello, ${name.replaceAll(
              '"',
              ""
            )}`}</p>
          </div>

          {/* Logout Button */}
          <div>
            <button
              className="border-2 border-[#4553FE] px-10 p-2 text-sm hover:bg-[#4553FE] text-[#4553FE] hover:text-white transition-all ease-in-out duration-700"
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-[#333] mt-5 mb-8" />

      {/* Room box */}
      {!gameStarted && (
        <div className="max-w-[1440px] mx-auto">
          <div className="flex justify-center items-center">
            <div className="border-2 border-[#333] p-5">
              <p>Enter room number to join</p>
              <input
                type="text"
                placeholder="Room Number"
                className="bg-transparent border-b-2 border-[#777777] md:w-48 mt-8 placeholder:text-[#777777] pb-2 outline-none text-sm"
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
              <p className="text-[#777777] text-sm mt-2">
                Note: You need an opponent in the same room to play.
              </p>
              <button
                className="bg-[#4553FE] px-10 py-2 text-sm mt-8"
                onClick={joinRoom}
              >
                Join Room
              </button>
            </div>
          </div>
          <p className="flex justify-center items-center mt-5">
            {loading && room && (
              <p>Waiting for the opponent to join room {room}</p>
            )}
          </p>
        </div>
      )}

      {showUI && gameStarted && (
        <div>
          <p className="text-center">{player}'s turn</p>
          <div className="mt-8 flex justify-center items-center">
            {/* Board */}
            <div>
              <div className="flex justify-between items-center">
                <Square value={board[0]} chooseSquare={() => chooseSquare(0)} />
                <Square value={board[1]} chooseSquare={() => chooseSquare(1)} />
                <Square value={board[2]} chooseSquare={() => chooseSquare(2)} />
              </div>
              <div className="flex justify-between items-center">
                <Square value={board[3]} chooseSquare={() => chooseSquare(3)} />
                <Square value={board[4]} chooseSquare={() => chooseSquare(4)} />
                <Square value={board[5]} chooseSquare={() => chooseSquare(5)} />
              </div>
              <div className="flex justify-between items-center">
                <Square value={board[6]} chooseSquare={() => chooseSquare(6)} />
                <Square value={board[7]} chooseSquare={() => chooseSquare(7)} />
                <Square value={board[8]} chooseSquare={() => chooseSquare(8)} />
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <button
              className="border-2 border-[#4553FE] px-10 p-2 text-sm hover:bg-[#4553FE] text-[#4553FE] hover:text-white transition-all ease-in-out duration-700"
              onClick={() => navigate(0)}
            >
              Leave Room
            </button>
          </div>
        </div>
      )}

      {/* Pop Up */}
      {showPopup && (
        <div className="absolute top-0 left-0 inset-0 bottom-0 h-screen text-white z-50 bg-black/50 backdrop-blur-sm">
          <div className="flex justify-center items-center h-full">
            <div className="bg-[#181818] py-5 px-8 flex flex-col justify-center items-center">
              <img
                src={`${
                  winner.winner === "X" || winner.winner === "O"
                    ? "/celebration.png"
                    : "/draw.png"
                }`}
                alt="celebration"
                className="w-16"
              />
              <h2 className="mt-1">
                {winner.winner === "X" || winner.winner === "O"
                  ? `${winner.winner} has won the game!!!`
                  : `Oops!!! It's a draw.`}
              </h2>
              <button
                className="bg-[#4553FE] px-10 py-2 text-sm mt-8"
                onClick={() => {
                  setShowPopup(false);
                  navigate(0);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
