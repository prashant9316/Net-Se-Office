
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ReactCalendar = dynamic(() => import('calendar-reactjs'), {
  ssr: false,
})

export default function AttendanceCalendar ({ attendance }) {
  const [records, setRecords] = useState([])
  console.log("this is running inside the calendar component")
  console.log(attendance)
  useEffect(() => {
    const changeAttendanceFormat = () => {
      const newAttendance = attendance.map((element, index) => {
        return {status: element.status, date: new Date(element.date).toISOString().split('T')[0]}
      })
      setRecords(newAttendance)
    }
    changeAttendanceFormat()
  }, [attendance])
  return (
    <>
    {/* {records.map((att, index) => {
      return(
        <>
        <div key={att._id}>
          {index}: {new Date(att.date).toISOString().split('T')[0]}: {att.status}
        </div>
        </>
      )
    })} */}
    <ReactCalendar
      onCellClick={(val) => console.log(val)}
      month={{
        date: "2023-06-27",
        days: records
        // days: [
        //   { date: "2021-05-01", status: "vacation" },
        //   { date: "2021-05-02", status: "vacation" },
        //   { date: "2021-05-03", status: "present" },
        //   { date: "2021-05-04", status: "present" },
        //   { date: "2021-05-05", status: "present" },
        //   { date: "2021-05-06", status: "present" },
        //   { date: "2021-05-07", status: "present" },
        //   { date: "2021-05-08", status: "vacation" },
        //   { date: "2021-05-09", status: "vacation" },
        //   { date: "2021-05-10", status: "present" },
        //   { date: "2021-05-11", status: "present" },
        //   { date: "2021-05-12", status: "present" },
        //   { date: "2021-05-13", status: "present" },
        //   { date: "2021-05-14", status: "present" },
        //   { date: "2021-05-15", status: "vacation" },
        //   { date: "2021-05-16", status: "vacation" },
        //   { date: "2021-05-17", status: "absent" },
        //   { date: "2021-05-18", status: "leave" },
        //   { date: "2021-05-19", status: "leave" },
        //   { date: "2021-05-20", status: "leave" },
        //   { date: "2021-05-21", status: "leave" },
        //   { date: "2021-05-22", status: "vacation" },
        //   { date: "2021-05-23", status: "vacation" },
        //   { date: "2021-05-24", status: "present" },
        //   { date: "2021-05-25", status: "present" },
        //   { date: "2021-05-26", status: "present" },
        //   { date: "2021-05-27", status: "present" },
        //   { date: "2021-05-28", status: "present" },
        //   { date: "2021-05-29", status: "vacation" },
        //   { date: "2021-05-30", status: "vacation" },
        //   { date: "2021-05-31", status: "present" }
        // ]
      }}
      emptyCellStyle={{ backgroundColor: "white" }}
      status={{
        present: {
          labelStyle: {
            backgroundColor: "green",
            color: "black",
            borderRadius: "8px",
            padding: "0px 0px 3px 0px"
          }
        },
        Present:{
          labelStyle: {
            backgroundColor: "green",
            color: "black",
            borderRadius: "8px",
            padding: "0px 0px 3px 0px"
          }
        },
        Absent: {
          labelStyle: {
            backgroundColor: "red",
            color: "black",
            borderRadius: "8px",
            padding: "0px 0px 3px 0px"
          }
        },
        absent: {
          labelStyle: {
            backgroundColor: "red",
            color: "black",
            borderRadius: "8px",
            padding: "0px 0px 3px 0px"
          }
        },
        Vacation: {
          labelStyle: {
            backgroundColor: "yellow",
            color: "black",
            borderRadius: "8px",
            padding: "0px 0px 3px 0px"
          }
        },
        vacation: {
          labelStyle: {
            backgroundColor: "yellow",
            color: "black",
            borderRadius: "8px",
            padding: "0px 0px 3px 0px"
          }
        },
        Leave: {
          labelStyle: {
            backgroundColor: "orange",
            color: "black",
            borderRadius: "8px",
            padding: "0px 0px 3px 0px"
          }
        },
        leave: {
          labelStyle: {
            backgroundColor: "orange",
            color: "black",
            borderRadius: "8px",
            padding: "0px 0px 3px 0px"
          }
        }
      }}
    />
    </>
  );
};
