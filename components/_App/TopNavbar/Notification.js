import * as React from "react";
import styles from "@/components/_App/TopNavbar/Notification.module.css";
import {
  IconButton,
  Button,
  Typography,
  Tooltip,
  Menu,
  Link,
  Badge,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import axios from "axios";
import server_url from "api/server";

const Notification = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([])
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() =>{
    const fetchNotifications = async() => {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${server_url}notifications`, {headers: {Authorization: `Bearer ${token}`}})
      console.log(response.data)
      setNotifications(response.data)
    }
    try {
      
      fetchNotifications()
    } catch (error) {
      console.error(error)
    }
  }, [])
  
  return (
    <>
      <Tooltip title="Notification">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ 
            backgroundColor: '#f5f5f5',
            width: '40px',
            height: '40px',
            p: 0
          }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="ml-2 for-dark-notification"
        >
          <Badge color="danger" variant="dot">
            <NotificationsActiveIcon color="action" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            padding: "5px 20px 5px",
            borderRadius: "10px",
            boxShadow: "0px 10px 35px rgba(50, 110, 189, 0.2)",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className={styles.header}>
          <Typography variant="h4">Notifications</Typography>
          <Button variant="text">clear all</Button>
        </div>
        <div className={styles.notification}>
          {notifications&&notifications.map((noti, index) => {
            return(
              <div className={styles.notificationList} key={noti._id}>
                <Link to={"/notices"}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: "14px",
                      color: "#260944",
                      fontWeight: "500",
                      mb: 1,
                    }}
                  >
                    New {noti.type}
                  </Typography>

                  <div className={styles.notificationListContent}>
                    <img src="/images/pdf-icon.png" alt="PDF Icon" width={27} />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "13px",
                        color: "#5B5B98",
                        fontWeight: "500",
                      }}
                      className="ml-1"
                    >
                      {noti.content}
                    </Typography>
                  </div>
                </Link>

                <Typography sx={{ fontSize: "12px", color: "#A9A9C8", mt: 1 }}>
                  {new Date(noti.timestamp).toDateString()}  {new Date(noti.timestamp).toLocaleTimeString()}
                </Typography>
              </div>
            )
          })}
          

          <Typography component="div" textAlign="center">
            <Link
              href="/notification/"
              underline="none"
              sx={{
                fontSize: "13px",
                color: "#757FEF",
                fontWeight: "500",
                mt: "10px",
                display: "inline-block",
              }}
            >
              View All{" "}
              <span className={styles.rightArrow}>
                <i className="ri-arrow-right-s-line"></i>
              </span>
            </Link>
          </Typography>
        </div>
      </Menu>
    </>
  );
};

export default Notification;
