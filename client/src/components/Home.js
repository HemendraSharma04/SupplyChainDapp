import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    return (
        <div class="landing-wrapper">
            <div id="heading">

                Supply Chain Management using Blockchain and IoT
            </div> 
            <h3>This app is for simulation of Pharmaceutical Supply Chain.</h3>
            <p style={{paddingTop: "3%"}}>Made By: </p>
            <div style={{width: "50%", margin: "auto", display: "flex", justifyContent:"center",}}>
            <table cellPadding={"15px"}>
            <tr><td>19BCT0028</td><td>Hemendra Sharma</td></tr>
            <tr><td>19BCT0033</td><td>Mehul Rana</td></tr>
            <tr><td>19BCT0025</td><td>Aditya Choudhary</td></tr>
            </table>

            </div>
        </div>
    );
}
 
export default Home;