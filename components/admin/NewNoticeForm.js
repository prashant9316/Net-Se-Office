import React from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/router";
import server_url from "api/server";

export default function BasicForm() {
    const router = useRouter()
    const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let formData = {
      title: data.get("Title"),
      content: data.get("content"),
      createdBy: '6463f583cbd312033371b85a'
    };
    try {
        console.log(formData)
        const token = localStorage.getItem('token');
        const response = await axios.post(`${server_url}notices`, formData, {headers: { Authorization: `Bearer ${token}`}});
  
        console.log('Notices published:', response.data);
        router.push('/admin/notices')
        // Add any additional logic or UI updates as needed
      } catch (error) {
        console.error('Failed to publish notice:', error);
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
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: '10px'
          }}
        >
          Create New Notice
        </Typography>
   
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Box sx={{mb: "10px"}}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="title"
                  label="Title"
                  name="Title"
                  autoComplete="Title"
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="content"
                  label="Content"
                  name="content"
                  autoComplete="content"
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
            Post
          </Button>

        </Box>
     
      </Card>
    </>
  );
}
