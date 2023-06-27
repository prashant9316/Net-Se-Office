import React, { useEffect } from 'react';
import TestimonialsOne from '@/components/Pages/Testimonials/TestimonialsOne';
import TestimonialsTwo from '@/components/Pages/Testimonials/TestimonialsTwo';
import TestimonialsThree from '@/components/Pages/Testimonials/TestimonialsThree';
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css';
import axios from 'axios';
import PrivateProtection from 'api/private';
import server_url from 'api/server';

export default function Testimonials() {
  const [notices, setNotices] = React.useState([])
  useEffect(() => {
    const fetchNotices = async() => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${server_url}notices`, {headers: {Authorization: `Bearer ${token}`}})
        console.log(response.data)
        setNotices(response.data)
      } catch (error) {
        
      }
    }
    fetchNotices()
  }, [])
  return (
    <>
    <PrivateProtection>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Notices</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Notices</li>
        </ul>
      </div>

      {/* <TestimonialsOne notices={notices}/> */}

      <TestimonialsThree notices={notices} />
      </PrivateProtection>
    </>
  );
}
