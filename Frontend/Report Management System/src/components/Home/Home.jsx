import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../../Shared/Navbar";
import { baseURL } from "../utils/ApiURLS";
import { Button, Menu, MenuItem, TablePagination } from "@mui/material";
import { CSVLink } from "react-csv";
import { NavLink, useNavigate } from "react-router-dom";
import icon from "../../assets/dots.svg";
import Swal from "sweetalert2";
import axiosMiddleware from "../../middleware/axiosMiddleware";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Home() {
  const loggedinUser = localStorage.getItem("loggedinUser");
  const [allData, setAllData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [errorOccurred, setErrorOccurred] = React.useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    func();
  }, [rowsPerPage, rowsPerPage, errorOccurred]);

  const func = async () => {
    axiosMiddleware({
      method: "get",
      url: baseURL + `api/v1/report?page=${page}&limit=${rowsPerPage}`,
    })
      .then((response) => {
        // Handle the API response

        setAllData(response.data.data);
      })
      .catch((error) => {
        // Set error state to true on error
        // Use setTimeout to trigger a re-render after 3 seconds
        // Handle errors (e.g., unauthorized, network errors)
      });
  };

  const generateCSVData = () => {
    const csvData = [];

    // Add header row
    csvData.push([
      "ID",
      "Name",
      "Address",
      "Phone",
      "Email",
      "Profession",
      "Favorite Colors",
    ]);

    // Add data rows
    allData?.forEach((row) => {
      csvData.push([
        row._id,
        row.name,
        row.address,
        row.phone,
        row.email,
        row.profession,
        row.favorite_color,
      ]);
    });

    return csvData;
  };

  const ThreeDots = (props) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    async function handleMenuClick(value) {
      if (value == "view") {
        navigate(`/report-detail/view/${props.data._id}`);
      } else if (value == "edit") {
        navigate(`/report-detail/edit/${props.data._id}`);
      } else if (value == "delete") {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            axiosMiddleware({
              method: "delete",
              url: baseURL + `api/v1/report/${props.data._id}`,
            })
              .then((value) => {
                // Handle the API response

                if (value.status == 204) {
                  func();
                  Swal.fire("Saved!", "", "success");
                }
              })
              .catch((error) => {
                
                // Handle errors (e.g., unauthorized, network errors)
              });
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      }
      // Just give the update request to the server here
    }

    const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <React.Fragment>
        <img src={icon} onClick={handleClick} />

        <Menu
          id="card-actions-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuClick("view")}>View</MenuItem>

          {JSON.parse(loggedinUser).role == "admin" ? (
            <MenuItem onClick={() => handleMenuClick("edit")}>Edit</MenuItem>
          ) : null}
          {JSON.parse(loggedinUser).role == "admin" ? (
            <MenuItem onClick={() => handleMenuClick("delete")}>
              Delete
            </MenuItem>
          ) : null}
        </Menu>
      </React.Fragment>
    );
  };
  return (
    <div className="bg-gray-300  h-screen " style={{ position: "relative" }}>
      <Navbar></Navbar>

      <div className="flex justify-end gap-5 mt-10 mr-[45px]">
        {JSON.parse(loggedinUser).role == "admin" ? (
          <NavLink to="/report-detail/create/new">
            <Button
              variant="outlined"
              style={{
                color: "white",
                background: "black",
              }}
            >
              Create Report
            </Button>
          </NavLink>
        ) : null}

        <CSVLink data={generateCSVData()} filename={"user_data.csv"}>
          <Button
            variant="outlined"
            style={{
              color: "white",
              background: "black",
            }}
          >
            Export CSV
          </Button>
        </CSVLink>
      </div>
      {allData.length > 0 ? (
        <TableContainer
          component={Paper}
          className="container m-auto"
          style={{ marginTop: "50px" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Address</StyledTableCell>
                <StyledTableCell align="right">Phone</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Profession</StyledTableCell>
                <StyledTableCell align="right">
                  Favourite Colors
                </StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.address}</StyledTableCell>
                  <StyledTableCell align="right">{row.phone}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.profession}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.favourite_color}
                  </StyledTableCell>
                  <StyledTableCell>
                    <ThreeDots data={row} />
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            className="container m-auto"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allData.length > 0 ? allData.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-16 w-16"></div>
        </div>
      )}
    </div>
  );
}
