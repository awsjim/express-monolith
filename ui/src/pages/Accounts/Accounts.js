import * as React from 'react';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { Link } from 'react-router-dom'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Accounts() {

    const [loading, setLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);

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

    const fetchAccountsData = () => {
        // "http://localhost:9000/api/accounts"
        fetch("/prod/api/accounts")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setLoading(false);
                setAccounts(data);
            })
            .catch(err => {
                setLoading(false);
                // setError({ isError: true, errorMsg: `Unexpected error occurred while retrieving audit data: ${err}` });
            });
    }

    useEffect(() => {
        fetchAccountsData()
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
                <h1>Accounts</h1>
            </TableContainer>

            <TableContainer component={Paper} sx={{ width: 9 / 10, margin: 'auto' }}>

                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Account</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right">Customer</StyledTableCell>
                            <StyledTableCell align="right">Balance</StyledTableCell>
                            <StyledTableCell align="right">Opened</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((acc) => (
                            <StyledTableRow key={acc.account}>
                                <StyledTableCell component="th" scope="row">
                                    <Link to={`/accounts/${acc.account}/transactions`} className="clt-row" key={acc.account}>
                                        {acc.account}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="right">{acc.status}</StyledTableCell>
                                <StyledTableCell align="right">{acc.customer}</StyledTableCell>
                                <StyledTableCell align="right">{acc.balance}</StyledTableCell>
                                <StyledTableCell align="right">{acc.created}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* {accounts.length > 0 && (
                <ul>
                    {accounts.map(acc => (
                        <li key={acc.account}>{acc.account}</li>
                    ))}
                </ul>
            )}
            <Button variant="contained">Hello world from Accounts</Button> */}
        </>
    );
}