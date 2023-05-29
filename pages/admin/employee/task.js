import React from 'react';
import MyTasks from '@/components/admin/EmployeeTasks';
import BasicForm from '@/components/admin/NewTaskForm';
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css';
import AdminProtection from 'api/admin';

export default function Table() {
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
      <BasicForm />
      
      <MyTasks />
      </AdminProtection>
    </>
  );
}
