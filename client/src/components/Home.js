import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  return (
    <div class="landing-wrapper">
      <div id="heading">Supply Chain Management using Blockchain and IoT</div>
      <h3>This app is for simulation of Pharmaceutical Supply Chain.</h3>
      <h3> WORKING</h3>
      <div
        style={{
          width: "50%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ marginTop: "2%" }}>
          <li>
            Get data from sensors like temperature/humidity sensor and pass it
            through <a href="https://nodered.org/">NODE-RED</a>
          </li>
          <li style={{ marginTop: "2%" }}>
            Then we pass that data as parameter in API(fastAPI) that calls smart
            contract using web3.py and send data to etehreum blockchain
          </li>
          <li style={{ marginTop: "2%" }}>
            Now users can see their data in real time using this frontend app
            like Current temperature and humidity ,Product info like id,weight
            etc ,worker id ,Location ,Delivery status
          </li>
        </ul>
      </div>
      <p>Please Connect to Ropsten test Network</p>
      <p style={{ paddingTop: "3%" }}>
        Made By:{" "}
        <a
          style={{ color: "#00BFFF" }}
          href="https://github.com/CodeNinja04"
          target="_blank"
        >
          Hemendra Sharma{" "}
        </a>
      </p>
    </div>
  );
};

export default Home;
