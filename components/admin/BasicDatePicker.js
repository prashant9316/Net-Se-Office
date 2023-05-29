import * as React from 'react';
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useUser } from 'hooks/User';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function BasicDatePicker() {
  const router = useRouter()
  const [value, setValue] = React.useState(null);
  const {user} = useUser();

  const handleSubmit = async(event)=>{
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log(user)
      let formData = {
        employee: user.userId,
        date: value,
        status: "Present"
      };
      console.log(formData);
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:4000/attendance', formData, {headers: {
        Authorization: `Bearer ${token}`,
      }, });
      console.log(response.data)
      router.push('/attendance/view')
    } catch (error) {
      console.log(error)
      alert("Failed to mark attendance")
    }
  }
  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: "25px",
        mb: "15px",
      }}
    >
      <Box component="form" noValidate onSubmit={handleSubmit}>
      <Typography
        as="h3"
        sx={{
          fontSize: 18,
          fontWeight: 500,
          mb: '10px'
        }}
      >
        Select Date to Mark Attendance
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value}
          name="datepicker"
          id="datepicker"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "16px",
              padding: "12px 10px",
              color: "#fff !important"
            }}
          >
            Apply Attendance
          </Button>
          </Box>
    </Card>
  );
}