import React, { useState, useEffect } from 'react';
import SupplyChain from "../artifacts/contracts/SupplyChain.sol/Supplychain.json";
import { ethers } from "ethers";
import TextField from '@mui/material/TextField';

const DisplayStatus = () => {
    const ContractAddress = "0xFa56954976bA7d616945c09A7e360499e7038d98" //"0xFa56954976bA7d616945c09A7e360499e7038d98";
    const [id, setId] = useState(0);

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }
    console.log(id);
    async function getStatus() {
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

                const Wdata = await contract.getProductStatus(id);
                console.log("data: ", Wdata);

                //console.log(contract);

            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }

    return (
        <>

            <TextField id="standard-basic" label="Enter PID" variant="standard" onChange={(e) => setId(e.target.value)} />
            <div><button onClick={getStatus}>PRODUCTS</button></div>
        </>);
}

export default DisplayStatus;