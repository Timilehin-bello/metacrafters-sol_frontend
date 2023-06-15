require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  solidity: "0.8.18",
  networks: {
    localhost: {
      chainId: 31337,
    },
  },
};
