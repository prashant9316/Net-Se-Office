import React from 'react';
import Grid from "@mui/material/Grid";    
import BasicForm from '@/components/admin/newSalarySlipForm';
import BasicWithIcons from '@/components/Forms/FormLayouts/BasicWithIcons';
import SignInForm from '@/components/Forms/FormLayouts/SignInForm';
import SignUpForm from '@/components/Forms/FormLayouts/SignUpForm';
import CustomStyles from '@/components/Forms/FormLayouts/CustomStyles';
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css'
import AdminProtection from 'api/admin';

export default function FormLayouts() {
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
          <li>New</li>
        </ul>
      </div>
      
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid item xs={12} md={12} lg={12} xl={6}>
          {/* BasicForm */}
          <BasicForm />

        </Grid>

      </Grid>
      </AdminProtection>
    </>
  );
}
