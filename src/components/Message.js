import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import "../styles/Message.css";

const Message = ({ text, sender }) => {
  return (
    <Box className={`messsage ${sender == "user" ? "sent" : "received"}`}>
      <Avatar className="avatar">{sender == "user" ? "U" : "S"}</Avatar>
      <Box className="message-content">
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Box>
  );
};

export default Message;
