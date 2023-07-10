import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import server_url from 'api/server';
import axios from 'axios';

export default function Profile() {
  const [userProfile, setUserProfile] = React.useState({})
  React.useEffect(() => {
    const fetchUserProfile = async() => {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${server_url}my-profile`, {headers: {Authorization: `Bearer ${token}`}})
      console.log(response.data)
      setUserProfile(response.data)
    }
    fetchUserProfile()
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  if(!userProfile){
    return (
      <>Loading...</>
    )
  }
  return (
    <>
      <Box>
        <Box
          sx={{
            borderBottom: '1px solid #eee',
            paddingBottom: '10px'
          }}
          className="for-dark-bottom-border"
        >
          <Typography component="h1" fontWeight="500" fontSize="18px">
            Profile
          </Typography>

        </Box>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Full Name
              </Typography>
              <TextField
                autoComplete="given-name"
                name="fullName"
                fullWidth
                id="fullName" 
                autoFocus
                value={userProfile.name}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                User Name
              </Typography>

              <TextField
                fullWidth
                id="username"
                name="userName"
                autoComplete="family-name"
                value={userProfile.username}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Position
              </Typography>
              <TextField
                autoComplete="given-name"
                name="position"
                disabled
                fullWidth
                id="position" 
                autoFocus
                value={userProfile.position}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Contact No
              </Typography>

              <TextField
                fullWidth
                id="contact"
                name="contact"
                autoComplete="family-name"
                value={userProfile.contactNo}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Email Address
              </Typography>

              <TextField
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                value={userProfile.email}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Upload Image
              </Typography>
              
              <TextField
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                autoComplete="file"
              />

              <Box mt={1}>
                <img 
                  src="/images/user1.png" 
                  alt="profile" 
                  className="borRadius100"
                  width="50px"
                  height="50px"
                />
              </Box>
            </Grid> */}
          </Grid>
{/* 
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "14px",
              padding: "12px 30px",
              color: "#fff !important"
            }}
          >
            Update
          </Button> */}
        </Box>
      </Box> 
    </> 
  );
}