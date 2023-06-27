import React from 'react'
import AttendanceCalendar from '@/components/Attendance/Attendance'
import AdminProtection from 'api/admin'

export default function calendar() {
  return (
    <>
        <AdminProtection >
            <AttendanceCalendar />
        </ AdminProtection >
    </>
  )
}
