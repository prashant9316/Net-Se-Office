import React from 'react';
import Grid from "@mui/material/Grid";  
import BasicTable from '@/components/UIElements/Table/BasicTable';
import RecentOrders from "@/components/Dashboard/eCommerce/RecentOrders";
import TeamMembersList from "@/components/Dashboard/eCommerce/TeamMembersList";
import BrowserUsedAndTrafficReports from "@/components/Dashboard/Analytics/BrowserUsedAndTrafficReports";
import BasicDatePicker from '@/components/admin/BasicDatePicker';
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css';
import PrivateProtection from 'api/private';

export default function Table() {
  return (
    <>
    <PrivateProtection>
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

      

      {/* BrowserUsedAndTrafficReports */}
      <BasicDatePicker />
      <BrowserUsedAndTrafficReports />
      </PrivateProtection>
      
    </>
  );
}
