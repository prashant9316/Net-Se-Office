import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; 
import axios from 'axios';
import server_url from 'api/server';

export default function ChangePassword() {
  const [error, setError] = React.useState([])
  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const handleOldPassword = (event) => {
    setOldPassword(event.target.value)
  }

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value)
  }
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value)
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      setError([])
      if(newPassword !== confirmPassword){
        setError([...error, "New Password and Re-entered new Password doesn't match!"])
      }
      if(newPassword.length == 0 || newPassword.trim().length == 0 || newPassword.length < 8){
        setError([...error, "New Password Invalid, length must be more than 8."])
      }
      if(oldPassword.length == 0 || oldPassword.trim().length == 0){
        console.log(oldPassword.trim())
        setError([...error, "Invalid Old Password"])
      }
      if(error){
        return;
      }
      const token = localStorage.getItem('token')
      const sentData = {
        oldPassword, 
        newPassword
      }
      const response = await axios.post(`${server_url}user-auth/change-password`, sentData , {headers: {Authorization: `Bearer ${token}`}})
      console.log(response.data)
      if(response.status == 200){
        alert("Password updated successfully!")
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (error) {
      alert("Failed to update Password!");
      console.error(error)
    }
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   oldPassword: data.get('oldPassword'),
    //   newPassword: data.get('newPassword'),
    //   confirmPassword: data.get('confirmPassword')
    // });
    
    console.log(oldPassword, newPassword, confirmPassword)
  };

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
            Security
          </Typography>

          <Typography fontSize="13px">
            Update your password here.
          </Typography>
        </Box>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Old Password
              </Typography>
              <TextField
                autoComplete="old-password*"
                name="oldPassword*"
                fullWidth
                onChange={handleOldPassword}
                value={oldPassword}
                id="oldPassword" 
                type="password"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                New Password
              </Typography>
              <TextField
                autoComplete="new-password*"
                name="newPassword*"
                fullWidth
                onChange={handleNewPassword}
                value={newPassword}
                id="newPassword" 
                type="password"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Confirm Password
              </Typography>
              <TextField
                autoComplete="confirm-password*"
                name="confirmPassword*"
                onChange={handleConfirmPassword}
                fullWidth
                value={confirmPassword}
                id="confirmPassword" 
                type="password"
                autoFocus
              />
            </Grid>
  
          </Grid>

          <ul>
            {error&&error.length>0 &&
              error.map((err, idx) => {
                return (
                  <li className='text-red-500' key={idx}>
                    <div className='text-red-500'>
                      {err}
                    </div>
                  </li>
                )
              })
              }
            </ul>

          <Button
            type="submit"
            variant="contained"
            onSubmit={handleSubmit}
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
            Change Password
          </Button>
        </Box>
      </Box> 
    </> 
  );
}