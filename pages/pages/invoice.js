import React, { useEffect } from 'react'; 
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css'
import InvoiceLists from '@/components/Pages/Invoice/InvoiceLists';
import axios from 'axios';
import PrivateProtection from 'api/private';
import server_url from 'api/server';

export default function Invoice() {
  const [salaryData, setSalaryData] = React.useState([]);

  useEffect(() => {
    const fetchSalary = async() => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${server_url}salarySlips/employee`, {headers: {Authorization: `Bearer ${token}`}})
        console.log(response.data)
        setSalaryData(response.data)
      } catch (error) {
        
      }
    }
    fetchSalary()
  }, [])
  return (
    <>
    <PrivateProtection>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Invoice</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Invoice</li>
        </ul>
      </div>

      <InvoiceLists salaryData={salaryData} />
      </PrivateProtection>
    </>
  );
}
