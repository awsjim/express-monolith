import * as React from 'react';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Transactions() {

  const { account } = useParams();

  const [loading, setLoading] = useState(true);
  const [tranx, setTranx] = useState([]);

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const fetchTransactionsData = () => {
    // `http://localhost:9000/api/accounts/${account}/transactions`
    fetch(`/prod/api/accounts/${account}/transactions`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setLoading(false);
        setTranx(data);
      })
      .catch(err => {
        setLoading(false);
        // setError({ isError: true, errorMsg: `Unexpected error occurred while retrieving audit data: ${err}` });
      });
  }

  useEffect(() => {
    fetchTransactionsData()
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <TableContainer sx={{ width: 9 / 10, margin: 'auto' }}>
        <h1>Transactions for Account {account}</h1>
      </TableContainer>

      <TableContainer component={Paper} sx={{ width: 9 / 10, margin: 'auto' }}>

        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tranx.map((tran) => (
              <StyledTableRow key={tran.id}>
                <StyledTableCell component="th" scope="row">
                  {tran.id}
                </StyledTableCell>
                <StyledTableCell align="right">{tran.date}</StyledTableCell>
                <StyledTableCell align="right">{tran.amount}</StyledTableCell>
                <StyledTableCell align="right">{tran.description}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}