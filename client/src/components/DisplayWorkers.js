import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/Supplychain.json";


async function getWorker() {
    const ContractAddress = "0xFa56954976bA7d616945c09A7e360499e7038d98"
    if (typeof window.ethereum !== "undefined") {
        requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(await signer.getAddress())

        const contract = new ethers.Contract(
            ContractAddress,
            SupplyChain.abi,
            provider
        );
        try {
            const Wdata = await contract.getWorkerssList();
            console.log("data: ", Wdata);
            //console.log(contract);

        } catch (err) {
            console.log("Error: ", err);
        }
    }
}

async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
}

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