import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography, useTheme } from "@mui/material";

function createData(name, functionality, email, status, date) {
  return { name, functionality, email, status, date };
}

const rows = [
  createData(
    "Sarah Yaraghtala",
    "Admin",
    "srahyaragh@gmail.com",
    "online",
    "20.2.2022"
  ),
  createData(
    "Samira Gholami",
    "User",
    "SamiraGholami@gmail.com",
    "offline",
    "20.2.2022"
  ),
  createData(
    "Eclar Madies",
    "Maneger",
    "EclarMadies@gmail.com",
    "online",
    "20.2.2022"
  ),
  createData(
    "Calson Wankok",
    "User",
    "srahyaragh@gmail.com",
    "online",
    "20.2.2022"
  ),
  createData(
    "Gina Wondensi",
    "User",
    "srahyaragh@gmail.com",
    "offline",
    "20.2.2022"
  ),
];

const UserTable = () => {
  const theme = useTheme();
  return (
    <Box sx={{ marginTop: "20px", marginX: "120px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>AUTHOR</TableCell>
              <TableCell align="center">FUNCTION</TableCell>
              <TableCell align="center">EMAIL</TableCell>
              <TableCell align="center">STATUS</TableCell>
              <TableCell align="center">DATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.functionality}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell
                  align="left"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      borderRadius: "8px",
                      background:
                        row.status === "online"
                          ? theme.palette.secondary.main
                          : theme.palette.secondary.light,
                      width: "65px",
                      height: "25px",
                      textAlign: "center",
                    }}
                  >
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell align="center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
