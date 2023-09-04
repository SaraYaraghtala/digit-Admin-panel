import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Sarah Yaraghtala',"Admin", "srahyaragh@gmail.com","online","20.2.2022"),
  createData('Samira Gholami',"user", "SamiraGholami@gmail.com","online","20.2.2022"),
  createData('Eclar Madies', "MAneger", "EclarMadies@gmail.com","online","20.2.2022"),
  createData('Calson Wankok',"user", "srahyaragh@gmail.com","online","20.2.2022"),
  createData('Gina Wondensi', "user", "srahyaragh@gmail.com","online","20.2.2022"),
];

const UserTable =() => {
  return (
    <Box sx={{ marginTop:"20px", marginX:"120px" }}>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>AUTHOR</TableCell>
            <TableCell align="right">FUNCTION</TableCell>
            <TableCell align="right">EMAIL</TableCell>
            <TableCell align="right">STATUS</TableCell>
            <TableCell align="right">DATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}


export default UserTable;