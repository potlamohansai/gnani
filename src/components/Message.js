import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import "../styles/Message.css";

const Message = ({ text, sender }) => {
  return (
    <Box className={`message ${sender === "user" ? "sent" : "received"}`}>
      <Avatar className="avatar">
        {sender === "user" ? <PersonIcon /> : <SmartToyIcon />}
      </Avatar>
      <Box className="message-content">
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Box>
  );
};

export default Message;
