import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
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

const DisplayProducts = () => {
    const [ProductsList, setData] = useState();
    const ContractAddress = "0xFa56954976bA7d616945c09A7e360499e7038d98" //"0xFa56954976bA7d616945c09A7e360499e7038d98";

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    async function getProduct() {
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

                const Pdata = await contract.getProducts();
                console.log("data: ", Pdata);
                setData(Pdata);
                //console.log(contract);

            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }

    if (ProductsList == null) {
        getProduct();
        return (
            <div style={{textAlign: "center", padding: "10%"}}>
            <Box>
                <CircularProgress />
            </Box>
            </div>
        );
    }
    return (
        <TableContainer component={Paper} sx={{width: "80%", margin:"auto", marginTop: "5%"}}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Sr. No.</TableCell>
                        <TableCell align="left">Product&nbsp;Name</TableCell>
                        <TableCell align="right">Product&nbsp;ID</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Weight&nbsp;in&nbsp;Kg</TableCell>
                        <TableCell align="right">Manufacturing&nbsp;Date</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {ProductsList.map((row, iterator) => (
                        <TableRow
                            key={iterator}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{iterator + 1}</TableCell>
                            <TableCell align="left">{row[1]}</TableCell>
                            <TableCell align="right">{row[0]._hex}</TableCell>
                            <TableCell>{row[2]}</TableCell>
                            <TableCell>{row[4]}</TableCell>
                            <TableCell align="right">{row[5]}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DisplayProducts;