import * as React from 'react';
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useUser } from 'hooks/User';
import axios from 'axios';
import { useRouter } from 'next/router';
import server_url from 'api/server';

export default function BasicDatePicker() {
  const router = useRouter()
  const [today, setToday] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const {user} = useUser();

  React.useEffect(() => {
    const date = new Date();
    setToday(date.toDateString())
  }, [])
  const handleSubmit = async(event)=>{
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log(user)
      let formData = {
        employee: user.userId,
        date: new Date(),
        status: "Present"
      };
      console.log(formData);
      const token = localStorage.getItem('token')
      const response = await axios.post(`${server_url}attendance`, formData, {headers: {
        Authorization: `Bearer ${token}`,
      }, });
      if(response.status == 200){
        alert("Attendance already marked for the day!")
        return;
      }
      console.log(response.data)
      router.push('/attendance/view')
    } catch (error) {
      console.log(error)
      alert(error)
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
      <Button
            type="submit"
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
            Mark your attendance for ({today})
          </Button>
          </Box>
    </Card>
  );
}