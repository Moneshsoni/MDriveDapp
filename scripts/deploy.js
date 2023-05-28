
const hre = require("hardhat");

async function main() {

  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  await upload.deployed();

  console.log("Contract Address! ",upload.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// https://mumbai.polygonscan.com/address/0x09E90b4d63D3E5d1cEd2cD072699Bf2E2d1391e4#code