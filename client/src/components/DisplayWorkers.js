import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function DisplayWorkers({ workersList }) {
    if (workersList == null) {
        return (<p>Click Button To Fetch Data</p>)
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Sr. No.</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Worker&nbsp;ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {workersList.map((row, iterator) => (
                        <TableRow
                            key={iterator}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{iterator + 1}</TableCell>
                            <TableCell align="right">{row[0]}</TableCell>
                            <TableCell align="right">{row[1]._hex}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}