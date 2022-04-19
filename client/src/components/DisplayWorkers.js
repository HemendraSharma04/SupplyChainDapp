import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/Supplychain.json";
import { styled } from '@mui/material/styles';

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


const DisplayWorkers = () => {
    const [workersList, setData] = useState();
    async function getWorker() {
    
        const ContractAddress = "0xE4b876ed393E19FbD18eC99118647BcbFE5300F3"
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log(await signer.getAddress())

            const contract = new ethers.Contract(
                ContractAddress,
                SupplyChain.abi,
                provider
            );
            let Wdata = null;
            try {
                Wdata = await contract.getWorkerssList();
                console.log("data: ", Wdata);
                //console.log(contract);
                setData(Wdata);
                
            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }
    
    if (workersList == null) {
        getWorker();
        return (
            <div style={{textAlign: "center", padding: "10%"}}>
            <Box sx={{ color: 'grey.500' }}>
                <CircularProgress color="inherit" />
            </Box>
            </div>
        );
    }
    return (
        <TableContainer component={Paper} sx={{width: "50%", margin:"auto", marginTop: "5%"}}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Sr. No.</StyledTableCell>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="right">Worker&nbsp;ID</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {workersList.map((row, iterator) => (
                        <StyledTableRow
                            key={iterator}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">{iterator + 1}</StyledTableCell>
                            <StyledTableCell align="left">{row[0]}</StyledTableCell>
                            <StyledTableCell align="right">{parseInt(row[1]._hex)}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default DisplayWorkers;