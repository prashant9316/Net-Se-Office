import React from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import server_url from "api/server";

export default function BasicForm() {
    const [alert, setAlert] = React.useState([])
    const [value, setValue] = React.useState(null);
    const [employee, setEmployee] = React.useState(null);

    const handleSearch = async(event) => {
        event.preventDefault()
        const data = event.target.value
        const token = localStorage.getItem('token')
        try {
            if(data){
                const response = await axios.get(`${server_url}employee/${data}`, {headers: { Authorization: `Bearer ${token}`}})
                setEmployee(response.data)
            } else {
                setEmployee(null)
            }
            
        } catch (error) {
            setEmployee(null)
        }
    }
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      empid: data.get("empid"),
      dueDate: value,
      task: data.get("task"),
      completed: data.get("status")
    };
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${server_url}todos`, formData, {headers: { Authorization: `Bearer ${token}`}})
        event.target.reset()
        setAlert("Done!");
        // setTasks(response.data)
    } catch (error) {
        setAlert("Failed To Assign Task!");

        // setTasks([])
    }
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography
          as="h6"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: '10px',
            color: 'green'
          }}
        >
          {alert}
        </Typography>
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: '10px'
          }}
        >
          Assign Tasks {employee != null?(` For: (${employee.name})`):('')} 
        </Typography>
   
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Box sx={{mb: "10px"}}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="empid"
                  label="Employee Id"
                  name="empid"
                  onChange={handleSearch}
                  autoComplete="empid"
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="task"
                  label="Task"
                  name="task"
                  autoComplete="task"
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="status"
                  label="Status"
                  name="status"
                  autoComplete="status"
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    value={value}
                    name="dueDate"
                    id="dueDate"
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
              </Grid>


            </Grid>
          </Box>
 
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
            Assign Task
          </Button>
        </Box>
     
      </Card>
    </>
  );
}
