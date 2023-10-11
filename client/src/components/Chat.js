import React, { useEffect, useState } from "react";

const Chat = ({ socket, name, room }) => {
  const [currentMessage, setCurrentMessage] = useState("second");
  const [allMessage, setAllMessage] = useState([]);

  async function sendMessage() {
    if (currentMessage !== "") {
      const messageData = {
        room,
        name,
        currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setAllMessage((list) => [...list, messageData]);
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setAllMessage((list) => [...list, data]);
    });
  }, [socket]);

  return <div>Kedar</div>;
};

export default Chat;
