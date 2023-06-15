const hre = require("hardhat");

async function main() {
  // Fetch  network
  const networkName = hre.network.name;
  const chainId = hre.network.config.chainId;
  console.log(`Using Network: ${networkName} with ChainId: ${chainId}`);

  // Fetch accounts
  const accounts = await ethers.getSigners();

  console.log(
    `Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`
  );

  const token = await hre.ethers.deployContract("Token");

  await token.waitForDeployment();

  console.log(`Deployed contract Address ${token.target}`);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();
