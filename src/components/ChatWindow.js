import { Box, Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import Message from "./Message";
import "../styles/ChatWindow.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const messagesEndRef = useRef(null);

  // WEBSOCKET CONNECTION
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      const timestamp = Date.now();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message.text, sender: "gpt", timestamp },
      ]);
    };
    setWs(socket);
    return () => socket.close();
  }, []);

  // Scroll to the bottom of the messages container
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //SEND MESSAGE INPUT to WebSocket Server
  const sendMessage = (message) => {
    if (ws) {
      const timestamp = Date.now();
      ws.send(JSON.stringify({ text: message, sender: "user", timestamp }));
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: "user", timestamp },
      ]);
    }
  };

  return (
    <>
      <h1>GNANI CHATBOT</h1>
      <Paper elevation={8} square={false} className="chat-window">
        <Box className="messages">
          {messages.map((msg, index) => (
            <Message
              key={index}
              text={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
            />
          ))}
          <div ref={messagesEndRef} />
        </Box>
        {/* Message Input Component */}
        <MessageInput onSend={sendMessage} />
      </Paper>
    </>
  );
};

export default ChatWindow;
