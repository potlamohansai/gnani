import { Container } from "@mui/material";
import "./App.css";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <Container maxWidth="sm">
      <ChatWindow />
    </Container>
  );
}

export default App;
