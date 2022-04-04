require("@nomiclabs/hardhat-waffle");

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

const ALCHEMY_API_KEY = "yrmlm2oNZwtWequlaQrrAukKCRH6S40a";
const RINKEBY_PRIVATE_KEY = "4df97a2c7c2f353c30be92945884987299c983a051ca3a4a9d0a2cb6e8e3d175";


module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: "./client/src/artifacts",
  },
  networks: {
    rinkeby: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`]
    },
  }
}
