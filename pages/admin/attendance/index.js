
import React, { useEffect, useState } from 'react';
import TeamMembersList from "@/components/admin/AttendanceList";
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css';
import AdminProtection from 'api/admin';
import { Button, Card } from '@mui/material';
import axios from 'axios';
import server_url from 'api/server';


export default function Table() {
  const [yesterdayDate, setYesterdayDate] = useState('')
  useEffect(() => {
    setPreviousDate();
  }, [])
  const setPreviousDate = () => {
    let today = new Date();
 
  // Subtract one day from current time                       
    today.setDate(today.getDate() - 1);
    setYesterdayDate(today)
    console.log(today.toDateString())
  }

  const setAbsent = async() => {
    setPreviousDate();
    // now to call the API
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${server_url}regularize-attendace/date/${yesterdayDate}`, {headers: { Authorization: `Bearer ${token}`}})
      console.log(response.data)
    } catch (error) {
      // alert(error)
      console.error(error)
    }
    
  }
  return (
    <>
    <AdminProtection>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Table</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Table</li>
        </ul>
      </div>

  
      {/* TeamMembersList */}
         <TeamMembersList />
          <Card >
            <Button
            onClick={setAbsent}
            variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                ml: 2,
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "16px",
                padding: "12px 10px",
                color: "#fff !important"
              }}
            >
              Regularize Attendance for {yesterdayDate&&yesterdayDate.toDateString()}
            </Button>
          </Card>
      </AdminProtection>
    </>
  );
}
