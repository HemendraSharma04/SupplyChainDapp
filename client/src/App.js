import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import SupplyChain from "./artifacts/contracts/SupplyChain.sol/Supplychain.json";
import DisplayWorkers from "./components/DisplayWorkers.js";
import Home from "./components/Home.js";
import Navbar from "./components/Navbar.js";
import DisplayProducts from "./components/DisplayProducts.js";
import DisplayStatus from "./components/DisplayStatus.js";
import DisplayData from "./components/DisplayStatus.js";

function App() {
  return (
    <div className="app">
      <Navbar />
      <BrowserRouter>
        {/* <Navbar /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workers" element={<DisplayWorkers />} />
          <Route path="/nav" element={<Navbar />} />
          <Route path="/products" element={<DisplayProducts />} />
          <Route path="/status" element={<DisplayStatus />} />
          <Route path="/data" element={<DisplayData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
