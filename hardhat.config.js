require("@nomiclabs/hardhat-waffle");
//require('dotenv').config({ path: __dirname + '/.env' });
require("dotenv").config()
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const ALCHEMY_API_KEY = process.env.ALCHEMY_KEY1;
const PRIVATE_KEY =process.env.PRIVATE_KEY;


module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: "./client/src/artifacts",
  },
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`]
    },
  }
}
