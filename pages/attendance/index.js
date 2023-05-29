import React from 'react';
import BasicDatePicker from '@/components/admin/BasicDatePicker';
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css'
import PrivateProtection from 'api/private';

export default function AdvancedElements() {
  return (
    <>
    <PrivateProtection>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Advanced Elements</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Advanced Elements</li>
        </ul>
      </div>

      {/* BasicDatePicker */}
      <BasicDatePicker />
      </PrivateProtection>
    </>
  );
}
