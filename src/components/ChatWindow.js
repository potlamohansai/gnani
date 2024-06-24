import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import Message from "./Message";
import "../styles/ChatWindow.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  // WEBSOCKET CONNECTION
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    setWs(socket);
    return () => socket.close();
  }, []);

  //SEND MESSAGE FUNCTION
  const sendMessage = (message) => {
    if (ws) {
      ws.send(JSON.stringify({ text: message, sender: "user" }));
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: "user" },
      ]);
    }
  };

  return (
    <Paper elevation={3} className="chat-window">
      <Box className="messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </Box>
      <MessageInput onSend={sendMessage} />
    </Paper>
  );
};

export default ChatWindow;
