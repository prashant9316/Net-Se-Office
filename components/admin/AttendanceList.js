import * as React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import axios from "axios";
import server_url from "./../../api/server"

function TeamMembersLists(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TeamMembersLists.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// function createData(
//   userImg,
//   name,
//   userName,
//   email,
//   roleIcon,
//   role,
//   status,
//   badgeClass
// ) {
//   return {
//     userImg,
//     name,
//     userName,
//     email,
//     roleIcon,
//     role,
//     status,
//     badgeClass,
//   };
// }

// const rows = [
//   createData(
//     "/images/user1.png",
//     "Jordan Stevenson",
//     "@jstevenson5c",
//     "jordansteven@admash.com",
//     "ri-macbook-line",
//     "Admin",
//     "Active",
//     "successBadge"
//   ),
  
// ].sort((a, b) => (a.name < b.name ? -1 : 1));


export default function TeamMembersList() {
  const [employeeId, setEmployeeId] = React.useState([])
  const [rows, setAttendance] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(()=>{
    const fetchAttendance = async() => {
      try {
        console.log(server_url)
        const response = await axios.get(`${server_url}attendance`);
        console.log(response.data);
        if(response.data){
          const data = response.data.sort((a, b) => (a.date < b.date ? -1 : 1));
          setAttendance(data)
        } else {

        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAttendance()
  }, [])

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 10px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            paddingBottom: "10px",
          }}
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Team Members List
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table 
            sx={{ minWidth: 600 }} 
            aria-label="custom pagination table"
            className="dark-table"
          >
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                <TableCell style={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}>
                  User
                </TableCell>

                <TableCell style={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}>
                  Emp Id
                </TableCell>

                <TableCell align="center" style={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}>
                  Date
                </TableCell>


                <TableCell
                  align="center"
                  style={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Role
                </TableCell>

                <TableCell
                  align="center"
                  style={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  style={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    style={{ width: 250, borderBottom: "1px solid #F7FAFF" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src='/images/user1.png'
                        alt="Product Img"
                        width={40}
                        height={40}
                        className="borRadius100"
                      />

                      <Box className="ml-10px">
                        <Typography
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                          as="h5"
                        >
                          {row.employee.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#A9A9C8",
                          }}
                        >
                          {row.employee.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                    }}
                  >
                    {row.employee.empid}
                  </TableCell>

                  <TableCell
                    align="center"
                    style={{ borderBottom: "1px solid #F7FAFF", fontSize: "13px", }}
                  >
                    {new Date(row.date).toLocaleDateString()}
                  </TableCell>

                  <TableCell
                    align="center"
                    style={{ borderBottom: "1px solid #F7FAFF", fontSize: "13px", }}
                  >
                    {row.employee.position}
                  </TableCell>



                  <TableCell
                    align="center"
                    style={{
                      fontWeight: 500,
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "12px",
                    }}
                  >
                    <span className={row.status == 'Present'?('successBadge'):('dangerBadge')}>{row.status}</span>
                  </TableCell>

                  <TableCell
                    align="center"
                    style={{
                      fontWeight: 500,
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "12px",
                    }}
                  >

                    <span className={row.status == 'Present'?('dangerBadge'):('successBadge')}>{row.status == 'Present'?('Mark Absent'):('Mark Present')}</span>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={4}
                    style={{ borderBottom: "1px solid #F7FAFF" }}
                  />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={4}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TeamMembersLists}
                  style={{ borderBottom: "none" }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
