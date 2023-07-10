import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ChatBox from "@/components/Apps/Chat/ChatBox";
import ChatBoxTwo from "@/components/Apps/Chat/ChatBoxTwo";
import ChatBoxThree from "@/components/Apps/Chat/ChatBoxThree";
import axios from "axios";
import server_url from "api/server";

import { useUser } from "hooks/User";

let userData = {};
// Search field style
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 100,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  marginLeft: 0,
  marginBottom: 20,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginRight: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "#757FEF",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "5",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    backgroundColor: "#F5F7FA",
    borderRadius: "30px",
    padding: theme.spacing(1.4, 0, 1.4, 2),
  },
}));


export default function Chat() {
  const { user } = useUser()
  const [userId, setUserID] = useState();
  const [token, setToken] = useState('');
  const [contacts, setContacts] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [changeUp, setChangeUp] = useState(1);
  const [roomId, setRoomId] = useState('')
  const [searchUserEmail, setSearchUserEmail] = useState('')
  const [userChats, setUserChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(24)
  const [wsConnection, setWsConnection] = useState(null);


  const createNewChat = async() => {
    try {
        const response = await axios.get(`${server_url}users/${userId}/contacts`, {email: searchUserEmail}, {headers: {Authorization: `Bearer ${token}`}})
        console.log(response.data);
    } catch (error) {
      console.log("Failed to create new chat")
    }
  }

  const fetchChatRooms = async() => {
    try {
      const response = await axios.get(`${server_url}chatrooms`, {headers: {Authorization: `Bearer ${token}`}})
      setContacts(response.data.contacts)
      setChatRooms(response.data.chatRooms)
      userData = response.data;
      return response.data;
    } catch (error) {
      console.log("Failed to fetch chat rooms!");
      return {error: true, message: error}
    }
  }

  const connectSocket = async() => {
    const socket = new WebSocket('ws://localhost:4000');
    setWsConnection(socket);

    socket.onopen = () => {
      console.log('Websocket connected');
      if(user.userId){
        console.log("User Id set to WebSocket is:" + user.userId)
        socket.send(JSON.stringify({ type: 'join', sender: user.userId }))
      } else {
        console.log("Invalid UserId");
      }
      
    }

    socket.onclose = () => {
      console.log('WebSocket connection closed');

      setTimeout(function() {
        connectSocket();
      }, 1000);
    }

    socket.onerror = (error) => {
      console.log('WebSocket Error: ', error)
    }
    
    socket.onmessage = async(event) =>{
      const rcvdData = event.data;
      const msg = JSON.parse(rcvdData);
      console.log("message received ")
      console.log(rcvdData)
      if(msg.roomId){
        setRoomId(msg.roomId);
      }
      if(msg.type == 'send'){
        const udpatedMessages = [...userChats, {sender: msg.chatId, content: msg.message, timestamp: new Date()}]
        setUserChats(udpatedMessages)
      } else if(msg.type == 'chatrooms'){
        userData = await fetchChatRooms();
        console.log(userData);
        let updateChatRooms = []
        if(!userData.chatRooms){
          console.log("chatroom is empty")
          return;
        }
        for(let i = 0; i < userData.chatRooms.length; i++){
          console.log(userData.chatRooms[i])
          updateChatRooms.push({
            chatRoomId: userData.chatRooms[i].roomId,
            participants: userData.chatRooms[i].participants
          })
        }
        console.log(updateChatRooms)
        socket.send(JSON.stringify({type: "chatrooms", sender: user.userId, chatRooms: updateChatRooms }))
      } else if(msg.type == 'chat'){
        console.log("New message received!")
        console.log("Printing existing chatRooms")
        console.log(userData.chatRooms)
        for(let i = 0; i < userData.chatRooms.length; i++){
          if(userData.chatRooms[i].roomId == msg.chatId){
            console.log("printing selected chat chatroom")
            console.log(userData.chatRooms[i])
            const newMessage = {sender: msg.sender, content: msg.message, timestamp: msg.timestamp };
            console.log(newMessage)
            userData.chatRooms[i].messages.push(newMessage)
            console.log(typeof(userData.chatRooms[i].messages))
            console.log(typeof(userData.chatRooms[i].messages[0]))
            const existingMessages = userData.chatRooms[i].messages
            console.log(existingMessages)
            const newMessages = [...existingMessages, newMessage]
            console.log(newMessages)
            // let updatedChatMessages = [...userData.chatRooms[i].messages,newMessage ]
            // console.log(updatedChatMessages)
            userData.chatRooms[i].messages = newMessages
            console.log("printing updated chatroom")
            console.log(userData.chatRooms[i])
          }
        }
        
        setChatRooms(userData.chatRooms)
        setChangeUp(changeUp+1)
      }
    }
  }

  const sampleChats = [
    {
      roomId: '36',
      participants: ['6463f583cbd312033371b85a', '646de99834af6d3d38c4b6f9'],
      messages: [
        {sender: '6463f583cbd312033371b85a', content: 'Hello There', timestamp: '2023-05-18T18:30:00.000+00:00'},
        {sender: '646de99834af6d3d38c4b6f9', content: "Hi, I'm still not finished with the project", timestamp: '2023-05-18T18:30:00.000+00:00'}
      ]
    },
  ]

  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
    

    if(user){
      console.log("User: ")
      console.log(user)
      setUserID(user.userId)
      connectSocket();
      setUserChats(sampleChats[0].messages)
    }
  }, [user])

  useEffect(() => {
    console.log("Now the contacts and chatrooms are updated")

  }, [contacts, chatRooms])

  useEffect(() => {
    console.log("inside use effect of chatrooms")

  }, [chatRooms])

  useEffect(() => {
    console.log("inside use effect of change up")
  }, [changeUp])

  if(!user){
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Chat</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>
            Chat
          </li>
        </ul>
      </div>

      <Tabs className="chat-tabs">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        >
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
            <Card
              sx={{
                boxShadow: "none",
                p: "20px",
                mb: "15px",
              }}
            >
              <Typography
                as="h1"
                sx={{
                  fontSize: 17,
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Messages
              </Typography>

              {/* Search */}
              <Search className="ls-search-form" 
              onSubmit={createNewChat} onChange={e => setSearchUserEmail(e.target.value)}
              >
                <SearchIconWrapper className="search-btn">
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase 
                  placeholder="Search here.."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>

              {/* All Messages */}
              <Typography mb="10px">
                <i className="ri-message-2-line"></i> ALL MESSAGES
              </Typography>

              <TabList>
                {contacts&&contacts.length>0&&contacts.map((contact, index) => {
                  return (
                    <Tab key={contact.chatRoomId}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              position: "relative",
                            }}
                          >
                            <img
                              src="/images/user1.png"
                              alt="User"
                              width="45px"
                              height="45px"
                              className="borRadius100"
                            />
                            <span className="active-status successBgColor"></span>
                          </Box>

                          <Box className="ml-1">
                            <Typography
                              as="h4"
                              fontSize="13px"
                              fontWeight="500"
                              mb="5px"
                            >
                              {contact.chatRoomId}
                            </Typography>
                            <Typography fontSize="12px">status...</Typography>
                          </Box>
                        </Box>

                        <Box textAlign="right">
                          <Typography
                            sx={{
                              color: "#A9A9C8",
                              fontSize: "11px",
                            }}
                          >
                            last time of chat
                          </Typography>

                          <Box className="mr-10px">
                            <Badge 
                              badgeContent={2} 
                              color="primary" 
                              className="for-dark-text-white"
                            ></Badge>
                          </Box>
                        </Box>
                      </Box>
                    </Tab>

                  )
                })}
                
              </TabList>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
            <Card
              sx={{
                boxShadow: "none",
                p: "25px 20px",
                mb: "15px",
                borderRadius: "10px",
              }}
            >
              
                {/* ChatBox */}
                {chatRooms&&chatRooms.length>0&&changeUp&&chatRooms.map((chatRoom, index) => {
                  return (
                    <TabPanel 
                      height={'80vh'} 
                    >
                      <ChatBox key={chatRoom.chatRoomId} chatId={user.userId} participants={chatRoom.participants} chatMessages={chatRoom.messages} socket={wsConnection} roomId={chatRoom.roomId} toUpdate={changeUp} />
                    </TabPanel>
                  )
                })}

            </Card>
          </Grid>
        </Grid>
      </Tabs>
    </>
  );
}
