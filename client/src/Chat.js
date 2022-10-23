import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
  table: {
    minWidth: 650,

  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});


function Chat({ socket, username, room }) {
  const classes = useStyles();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.room === room) {
        setMessageList((list) => [...list, data]);
      }
    });
  }, [socket]);


  return (
    <div>
             <Grid container
             >
                 <Grid 
                 sx={{ 
                  height: '100vh',
                  width: '100vw',
                  overflow: 'hidden',
                  position: 'absolute',
                 }}
                 item xs={12} >

                     <Typography variant="h5" className="header-message">Sala de chat {room}</Typography>
                 </Grid>
             </Grid>
             <Grid container component={Paper} className={classes.chatSection}>
                 <Grid item xs={3} className={classes.borderRight500}>
                     <List>
                          {messageList.map((author, i) => (
                              <ListItem key={i} button>
                                  <ListItemIcon>
                                      <Avatar alt="Remy Sharp">{author.author[0]}</Avatar>
                                  </ListItemIcon>
                                  <ListItemText primary={author.author} />
                              </ListItem>
                          ))}
                     </List>
                 </Grid>
                 <Grid item xs={9}>
                     <List className={classes.messageArea}>
                          {messageList.map((message, index) => (
                            <ListItem key={index}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <ListItemText
                                    align={
                                      message.author === username
                                        ? "right"
                                        : "left"
                                    }
                                    primary={message.author}
                                  ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                  <ListItemText
                                    style={{ wordWrap: "break-word" }}

                                    align={
                                      message.author === username
                                        ? "right"
                                        : "left"
                                    }
                                    primary={message.message}
                                  ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                  <ListItemText
                                    align={
                                      message.author === username
                                        ? "right"
                                        : "left"
                                    }
                                    secondary={message.time}
                                  ></ListItemText>
                                </Grid>
                              </Grid>
                            </ListItem>
                          ))}
                     </List>
                     <Divider />
                     <Grid container style={{padding: '20px'}}>
                         <Grid item xs={11}>
                             <TextField 
                             onChange={(e) => setCurrentMessage(e.target.value)}
                             id="outlined-basic-email" 
                             label="Escreva uma mensagem" 
                             fullWidth />
                         </Grid>
                         <Grid xs={1} align="right">
                             <Fab 
                             color="primary" 
                             aria-label="add"
                              onClick={sendMessage}
                             >Enviar
                             </Fab>
                         </Grid>
                     </Grid>
                 </Grid>
             </Grid>
           </div>
  );
}

export default Chat;

