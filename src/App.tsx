import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const socket: Socket = io("http://localhost:3001");

  useEffect(() => {
    socket.on("message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const onClickSend = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e: any) => {
          setMessage(e.target.value);
        }}
        placeholder="메시지 입력"
      />
      <button onClick={onClickSend}>전송</button>
      <hr />
      <div>
        {messages.map((item: any, index: number) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
