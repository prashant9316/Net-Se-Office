import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import axios from "axios";
import { useUser } from "hooks/User";
import server_url from "api/server";

function BrowserUsedAndTrafficReport(props) {
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

BrowserUsedAndTrafficReport.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(
  channel,
  sessions,
  sessionsProgress,
  prevPeriod,
  prevPeriodProgress,
  transactions,
  transactionsProgress,
  change,
  iconName,
  badgeClass
) {
  return {
    channel,
    sessions,
    sessionsProgress,
    prevPeriod,
    prevPeriodProgress,
    transactions,
    transactionsProgress,
    change,
    iconName,
    badgeClass,
  };
}

const rows = [
  createData(
    "Organic search",
    "10853",
    "(52%)",
    "566",
    "(52%)",
    "566",
    "(52%)",
    "52.80%",
    "ri-arrow-up-s-fill",
    "successBadge"
  ),

  createData(
    "Referal",
    "20844",
    "(60%)",
    "754",
    "(60%)",
    "899",
    "(60%)",
    "60.99%",
    "ri-arrow-down-s-fill",
    "dangerBadge"
  ),

].sort((a, b) => (a.channel < b.channel ? -1 : 1));

const BrowserUsedAndTrafficReports = () => {
  const {user} = useUser()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rows, setAttendance] = React.useState([])
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    
    const fetchAttendance = async(user) => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${server_url}attendance/employee`, {headers: {Authorization: `bearer ${token}`}})
        console.log(response.data)
        const data = response.data.sort((a, b) => (a.date < b.date ? -1 : 1));
        setAttendance(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAttendance(user)
  }, [])

  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

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

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            My Attendance Records
          </Typography>

          <Box>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreHorizIcon />
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem sx={{ fontSize: "14px" }}>Last 15 Days</MenuItem>
            <MenuItem sx={{ fontSize: "14px" }}>Last Month</MenuItem>
            <MenuItem sx={{ fontSize: "14px" }}>Last Year</MenuItem>
          </Menu>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table 
            sx={{ minWidth: 550 }} 
            aria-label="custom pagination table"
            className="dark-table"
          >
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                <TableCell
                  style={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Date
                </TableCell>

                <TableCell
                  style={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                  align="center"
                >
                  Status
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
                <TableRow key={row._id}>
                  <TableCell
                    style={{
                      fontWeight: "500",
                      fontSize: "13px",
                      borderBottom: "1px solid #F7FAFF",
                      color: "#757FEF",
                    }}
                  >
                    {new Date(row.date).toLocaleDateString()}
                  </TableCell>


                  <TableCell
                    align="center"
                    style={{
                      fontWeight: 500,
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "12px",
                    }}
                  >
                    <span className={row.status == 'Present'?('successBadge'):('dangerBadge')}>
                      {row.status}{" "}
                      {/* <i
                        className={row.iconName}
                        style={{
                          fontSize: "15px",
                          position: "relative",
                          top: "4px",
                          lineHeight: "1",
                          fontWight: "bold",
                        }}
                      ></i> */}
                    </span>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={5}
                    style={{ borderBottom: "1px solid #F7FAFF" }}
                  />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={8}
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
                  ActionsComponent={BrowserUsedAndTrafficReport}
                  style={{ borderBottom: "none" }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default BrowserUsedAndTrafficReports;
