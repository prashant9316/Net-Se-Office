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
  const [userId, setUserID] = useState('');
  const [token, setToken] = useState('');
  const [searchUserEmail, setSearchUserEmail] = useState('')
  const [userChats, setUserChats] = useState([])
  const [contacts, setContacts] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(e.target.value)
  }

  const handleChatSelect = async(e) => {
    console.log(e.target.value)
    userChats.map(chat =>{
      if(chat.id == e.target.value){
        setUserChats(chat)
      }
    })
  }

  const createNewChat = async() => {
    try {
        const response = await axios.get(`${server_url}users/${userId}/contacts`, {email: searchUserEmail}, {headers: {Authorization: `Bearer ${token}`}})
        console.log(response.data);
    } catch (error) {
      console.log("Failed to create new chat")
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
    const fetchChats = async() => {
      try {
        const contacts = await axios.get(`${server_url}chats/contacts`, {headers: {Authorization: `Bearer ${token}`}})
        // console.log(contacts.data)
        setContacts(contacts.data)
        const response = await axios.get(`${server_url}chats`, {headers: {Authorization: `Bearer ${token}`}})
        console.log(response.data);
        setUserChats(response.data)
      } catch (error) {
        console.log(error)
        console.log("Failed to fetch chats")
      }
    }
    fetchChats();
  }, [])
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
              <Search className="ls-search-form">
                <SearchIconWrapper className="search-btn">
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase 
                  placeholder="Search By Email"
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearch}
                />
              </Search>

              {/* All Messages */}
              <Typography mb="10px">
                <i className="ri-message-2-line"></i> ALL MESSAGES
              </Typography>

              <TabList>
                {contacts&&contacts.map(contact=>{
                  return(
                    <Tab key={contact._id} onClick={e=> console.log("chat with ")}> 
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
                            {/* <span className="active-status successBgColor"></span> */}
                          </Box>

                          <Box className="ml-1">
                            <Typography
                              as="h4"
                              fontSize="13px"
                              fontWeight="500"
                              mb="5px"
                            >
                              {contact.name}
                            </Typography>
                            <Typography fontSize="12px">{contact.email}</Typography>
                          </Box>
                        </Box>

                        <Box textAlign="right">
                          <Typography
                            sx={{
                              color: "#A9A9C8",
                              fontSize: "11px",
                            }}
                          >
                            4:30 PM
                          </Typography>

                          <Box className="mr-10px">
                            <Badge 
                              badgeContent={0} 
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

          {contacts&&contacts.map(contact =>{ 
            return (
              <TabPanel key={contact._id}>
                {/* ChatBox */}
                <ChatBox chats={userChats} />
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
