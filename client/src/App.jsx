import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import Button from '@mui/material/Button';
import { Box, TextField } from "@mui/material";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ 
              marginBottom: "10px",
              width: "300px",
              color: "white",
             }}
          />
          <TextField
          style={{ 
            marginBottom: "10px",
            width: "300px",
            color: "white",
           }}
            label="Room"
            variant="outlined"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <Button 
          style={{
            marginTop: "10px",
            backgroundColor: "#3f51b5",
            color: "white",
            fontWeight: "bold",

          }}
          variant="outlined" 
          onClick={joinRoom}
          >
            Entrar Na Sala
          </Button>
        </Box>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;