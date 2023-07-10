'use client'
import AttendanceCalendar from '@/components/Attendance/Attendance'
import AdminProtection from 'api/admin'
import React, { useEffect, useState } from 'react'

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import axios from 'axios';
import server_url from 'api/server';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function BasicForm({setTasks,setEmployee, setError}) {
  const [month, setMonth] = useState('');
  const [monthText, setMonthText] = useState('')
  const [year, setYear] = useState(2023)

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      empid: data.get("empid")
    };
    console.log(formData.empid)
    console.log(typeof(formData.empid))

    if(formData.empid.trim()==''){
      alert("Empty Input!")
      setEmployee(null)
      return;
    }
    setEmployee(formData.empid)
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${server_url}attendance/employee/${formData.empid}/${month}/${year}`, {headers: { Authorization: `Bearer ${token}`}})
        console.log(response.data)
        setTasks(response.data)
        setEmployee(formData.empid)
    } catch (error) {
        setTasks([])
        setError(error)
        console.log("Error occured!")
        alert(error)
    }
  };

  useEffect(() => {
    const month = new Date().toLocaleString('default', { month: 'long' });
    setMonthText(month);
    setMonth(month.slice(0, 3));
    
    
  }, [])

  const handleYearChange = (event) => {
    const today = new Date()
    console.log(today.getFullYear())
    if(event.target.value > today.getFullYear()){
      console.log("Error")
      setYear(today.getFullYear())
      return;
    }
    setYear(event.target.value)
  }

  const verifyYear = (event) => {
    const today = new Date()
    if(event.target.value.length != 4){
      setYear(today.getFullYear())
      return;
    } else if(event.target.value > today.getFullYear()){
      setYear(today.getFullYear())
      return;
    } 
  }


  const handleChange = (event) => {
    setMonth(event.target.value);
    setMonthText(event.target.value)
  };
  

  const months= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: '10px'
          }}
        >
          Get Attendance By Employee Id (for {monthText}, {year})
        </Typography>
   
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Box sx={{mb: "20px"}}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12} md={6} sm={6}>
                <TextField
                  fullWidth
                  id="empid"
                  label="Employee Id"
                  name="empid"
                  autoComplete="empid"
                  required={true}
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                />
              </Grid>


              <Grid item xs={12} md={3} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="demo-multiple-name-label">Month</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={month}
                    onChange={handleChange}
                    defaultValue={""}
                    input={<OutlinedInput label="Name" />}
                  >
                    {months.map((name, index) => (
                      <MenuItem
                        key={name}
                        value={name}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                
                
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <TextField
                  fullWidth
                  id="year"
                  label="Year"
                  onChange={handleYearChange}
                  onBlur={verifyYear}
                  name="year"
                  value={year}
                  autoComplete="year"
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                />
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
            Fetch Employee Attendance
          </Button>
        </Box>
     
      </Card>
    </>
  );
}


export default function calendar() {
  const [empid, setEmpid] = useState(null)
  const [employee, setEmployee] = useState({})
  const [attendance, setAttendance] = useState([])
  const [attendanceData, setAttendanceData] = useState([])
  const [error, setError] = useState(null)
    
  useEffect(() => {
    const changeAttendanceFormat = () => {
      const newAttendance = attendance.map((element, index) => {
        return {status: element.status, date: new Date(element.date).toISOString().split('T')[0]}
      })
      setAttendanceData(newAttendance)
    }
    changeAttendanceFormat()
  }, [attendance])
  return (
    <>
        <AdminProtection >
            <BasicForm setTasks={setAttendance} setEmployee={setEmpid} setError={setError}/>

            {empid!=null&&(
              <Card
              sx={{
                boxShadow: "none",
                borderRadius: "10px",
                p: "25px",
                mb: "15px",
              }}
            >
                <Typography
                  as="h3"
                  sx={{
                    fontSize: 18,
                    fontWeight: 500,
                    mb: '10px'
                  }}
                >
                  Attendance for EMP ID: {empid}
                </Typography>
                {/* {attendance&&attendance.map((att, index)=>{
                  return(
                    <div key={att._id}>
                      {index}: {new Date(att.date).toISOString().split('T')[0]}: {att.status}
                    </div>
                  )
                })} */}
                <AttendanceCalendar attendance={attendance} />
              </Card>
            )

              
            }
        </ AdminProtection >
    </>
  )
}
