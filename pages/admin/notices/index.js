import React from 'react';
import TestimonialsOne from '@/components/Pages/Testimonials/TestimonialsOne';
import TestimonialsTwo from '@/components/Pages/Testimonials/TestimonialsTwo';
import TestimonialsThree from '@/components/Pages/Testimonials/TestimonialsThree';
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css';
import axios from 'axios';
import AdminProtection from 'api/admin';

export default function Testimonials() {
    const [notices, setNotices] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:4000/notices'); // Replace with your API endpoint
            setNotices(response.data);
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <>
    <AdminProtection>
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

      <TestimonialsOne notices={notices} />
      </AdminProtection>
    </>
  );
}
