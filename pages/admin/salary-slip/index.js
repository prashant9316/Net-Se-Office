import React from 'react'; 
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css'
import InvoiceLists from '@/components/Pages/Invoice/InvoiceLists';
import axios from 'axios';
import AdminProtection from 'api/admin';
import server_url from 'api/server';

export default function Invoice() {
    const [employees, setEmployees] = React.useState([]);
  const [salaryData, setSalaryData] = React.useState([]);

  React.useEffect(() => {
    const fetchEmployeeData = async () => {
        try {
          // Fetch employee data
          const employeeResponse = await axios.get(`${server_url}employees`);
          const employeeData = employeeResponse.data;
  
          setEmployees(employeeData);
        } catch (error) {
          console.error('Failed to fetch employee data:', error);
        }
      };
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server_url}salarySlips`); // Replace with your API endpoint
        setSalaryData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    Promise.all([fetchEmployeeData(), fetchData()])
  }, []);
  return (
    <>
    <AdminProtection>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Salary Slips</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Salary Slips</li>
        </ul>
      </div>

      <InvoiceLists salaryData={salaryData} employees={employees}/>
      </AdminProtection>
    </>
  );
}
