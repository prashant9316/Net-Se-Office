import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { useUser } from "hooks/User";


const ChatBox = ({ chatId, participants, chatMessages, socket, roomId, changeUp }) => {
  const [receiver, setReceiver] = useState('Loading...')
  const [messages, setMessages] = useState([])
  useEffect(() => {
    console.log("Message Changing!")
    setMessages(chatMessages)
  }, [chatMessages, changeUp])


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      message: data.get("message")
    });
    const message = data.get("message")
    if(socket && socket.readyState == WebSocket.OPEN){
      console.log("this is on")
      console.log("Printing data sent:")
      console.log(chatId)
      console.log(message)
      console.log(roomId)
      socket.send(JSON.stringify({ type: 'chat', sender: chatId, message, chatId: roomId }))
    }
  };

  useState(() => {
    if(participants){
      for(let i = 0; i < participants.length; i++){
        if(participants[i].employeeId != chatId){
          setReceiver(participants[i].name)
        }
      }
    }
  }, [receiver])

  return (
    <>
      <Box
        sx={{
          border: "1px solid #F5F4F6",
          borderRadius: "14px",
        }}
        className="for-dark-chat-box"
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #F5F4F6",
            borderRadius: "10px",
            p: "15px",
          }}
          className="for-dark-chat-header"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              src="/images/user1.png"
              alt={changeUp}
              width="40px"
              height="40px"
              className="borRadius100" 
            />
            <Box className="ml-1">
              <Typography as="h5" fontWeight="500">
                {receiver}
              </Typography>
              <Typography fontSize="12px" position="relative">
                <span className="active-status2 successBgColor"></span> Active
                Now
              </Typography>
            </Box>
          </Box>

          <Box>
            <IconButton
              size="small"
              sx={{ background: "#F2F6F8" }}
              className="ml-5px for-dark-button"
            >
              <VideocamIcon />
            </IconButton>

            <IconButton
              size="small"
              sx={{ background: "#F2F6F8" }}
              className="ml-5px for-dark-button"
            >
              <CallIcon />
            </IconButton>

            <IconButton
              size="small"
              sx={{ background: "#F2F6F8" }}
              className="ml-5px for-dark-button"
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Chat List */}
        <div className="chat-list-box">
          {messages.map((msg, idx) => {
            if(msg.sender != chatId){
              return(
                <Box key={idx}
                  sx={{
                    display: "flex",
                    maxWidth: "730px",
                    mb: "20px",
                  }}
                >
                  <img
                    src="/images/user1.png"
                    alt="user"
                    width="35px"
                    height="35px"
                    className="borRadius100"
                  />
                  <Box
                    sx={{
                      display: "flex",
                    }}
                    className="ml-1"
                  >
                    <Box>
                      <Typography
                        sx={{
                          background: "#F5F6FA",
                          borderRadius: "0px 15px 15px 15px",
                          p: "14px 20px",
                          mb: "10px",
                        }}
                        className="dark-BG-101010"
                      >
                        {msg.content}
                      </Typography>

                      <Typography fontSize="12px">
                      {new Date(msg.timestamp).toLocaleDateString()} {new Date(msg.timestamp).toLocaleTimeString()}</Typography>
                    </Box>
                  </Box>
                </Box>
              )
            } else {
              return (
                <Box key={idx}
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    maxWidth: "730px",
                    mb: "20px",
                  }}
                  className="ml-auto"
                >
                  <Box
                    sx={{
                      display: "flex",
                    }}
                    className="ml-1"
                  >

                    <Box className="mr-1">
                      <Typography
                        sx={{
                          background: "#757FEF",
                          color: "#fff !important",
                          borderRadius: "15px 0 15px 15px",
                          p: "14px 20px",
                          mb: "10px",
                        }}
                      >
                        {msg.content}
                      </Typography>

                      <Typography fontSize="12px" textAlign="end">
                      {new Date(msg.timestamp).toLocaleDateString()} {new Date(msg.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </Box>

                  <img
                    src="/images/user2.png"
                    alt="user"
                    width="35px"
                    height="35px"
                    className="borRadius100"
                  />
                </Box>
              )
            }
          })}
          
        </div>

        {/* Footer */}
        <Box
          sx={{
            background: "#F5F6FA",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            p: "15px",
            position: "relative",
          }}
          className="dark-BG-101010"
        >
          <Box>
            <IconButton
              size="small"
              sx={{ background: "#F2F6F8" }}
              className='mr-5px for-dark-button'
            >
              <VideocamIcon />
            </IconButton>
            
            <IconButton
              size="small"
              sx={{ background: "#F2F6F8" }}
              className='mr-5px for-dark-button'
            >
              <CallIcon />
            </IconButton>
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              flex: "auto",
            }}
            className="pr-60px"
          >
            <TextField
              fullWidth
              id="typeSomething"
              label="Type Something..."
              name="message"
              autoComplete="typeSomething"
              InputProps={{
                style: {
                  borderRadius: 100,
                  background: "#fff",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "100%",
                fontWeight: "500",
                fontSize: "16px",
                padding: "0",
                minWidth: "44px",
                minHeight: "44px",
                position: "absolute",
                top: "22px",
                color: "#fff !important"
              }}
              className="right-20px"
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatBox;
