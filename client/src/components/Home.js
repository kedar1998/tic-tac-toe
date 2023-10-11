import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import io from "socket.io-client";
import Chat from "./Chat";
import Square from "./Square";
import { Patterns } from "./Patterns";
const socket = io.connect("http://localhost:3001");

const Home = () => {
  const { name, logoutUser } = useAppContext();

  const [room, setRoom] = useState("");
  const [count, setCount] = useState(0);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", ""]);
  const [showUI, setShowUI] = useState(false);
  const [player, setPlayer] = useState("O");
  const [winner, setWinner] = useState({
    winner: "",
    state: "",
  });

  function joinroom() {
    if (room !== "") {
      socket.emit("Join_room", room);
      setShowUI(true);
    }
  }

  function sendData() {
    socket.emit("sent_data", { board, room });
  }

  function chooseSquare(num) {
    setBoard(
      board.map((val, index) => {
        if (index === num && val === "") {
          return player;
        }

        return val;
      })
    );
  }

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
  };

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
      }
    });
  };

  const checkDraw = () => {
    let filled = true;
    board.map((item) => {
      if (item === "") {
        filled = false;
      }
    });

    if (filled) {
      setWinner({ winner: "No One", state: "Draw" });
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setBoard(data.board);
    });
  }, []);

  useEffect(() => {
    checkWinner();
    checkDraw();

    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    if (winner.state === "") {
    } else {
      alert(`Winner: ${winner.winner}`);
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
            <p className="text-xl md:text-2xl font-semibold mt-1">{`Hello, ${JSON.parse(
              name
            )}`}</p>
          </div>

          {/* Logout Button */}
          <div>
            <button
              className="border-2 border-[#4553FE] px-10 p-2 text-sm hover:bg-[#4553FE] text-[#4553FE] hover:text-white transition-all ease-in-out duration-700 "
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-[#333] mt-5 mb-8" />

      {/* Room box */}
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-center items-center">
          <div className="border-2 border-[#333] p-5">
            <p>Enter room number to join</p>
            <input
              type="text"
              placeholder="Rooom Number"
              className="bg-transparent border-b-2 border-[#777777] md:w-48 mt-8 placeholder:text-[#777777] pb-2 outline-none text-sm"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <p className="text-[#777777] text-sm mt-2">
              Note: Here is going to be the note description
            </p>
            <button
              className="bg-[#4553FE] px-10 py-2 text-sm mt-8"
              onClick={joinroom}
            >
              Join Room
            </button>
          </div>
        </div>
      </div>

      {showUI && (
        <div className="mt-8 flex justify-center items-center">
          {/* <div>
            {board.map((item) => {
              return <p key={item}>{item}</p>;
            })}
            <p
              onClick={() => {
                board[count] = count + 1;
                setCount(count + 1);
                socket.emit("sent_data", { board, room });
              }}
            >
              INCREASE
            </p>
          </div> */}

          {/* Board */}
          <div className="">
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
      )}
    </div>
  );
};

export default Home;
