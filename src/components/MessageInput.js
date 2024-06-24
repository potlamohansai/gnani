import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../styles/MessageInput.css";

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };
  return (
    <Box className="message-input">
      <TextField
        fullWidth
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;
