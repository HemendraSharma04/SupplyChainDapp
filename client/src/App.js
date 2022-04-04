import logo from './logo.svg';
import './App.css';

import { useState } from "react";
import { ethers } from "ethers";
import SupplyChain from "./artifacts/contracts/SupplyChain.sol/Supplychain.json";

function App() {

  const ContractAddress = "0xFa56954976bA7d616945c09A7e360499e7038d98";
 
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getWorker() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(await signer.getAddress())

      const contract = new ethers.Contract(
        ContractAddress,
        SupplyChain.abi,
        provider
      );
      try {
        const data = await contract.getWorkerssList();
        console.log("data: ", data);
        console.log(contract);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }



  return (
    <div className="App">
     
    <button onClick={getWorker}> GETWORKERS </button>

    </div>
  );
}

export default App;
