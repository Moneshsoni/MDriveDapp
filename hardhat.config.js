require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:{
    compilers:[
      {
        version: "0.8.9",
      },
      {
        version: "0.8.2"
      }
    ]
  },
  defaultNetwork: "hardhat",
  networks:{
    hardhat: {
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/X1H7etINPr6jELA9HL7ofrvMHGnyhBcU`,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan:{
    apiKey:{
      polygonMumbai: 'KDUE344NY1N55XVGURHMWTA13IK1PK2SVG'
    }
  },
  paths:{
    artifacts:"./file-storage/src/artifacts",
  },
};
