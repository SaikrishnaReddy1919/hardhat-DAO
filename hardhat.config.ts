import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat"
import {HardhatUserConfig} from "hardhat/config"
/** @type import('hardhat/config').HardhatUserConfig */

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
        compilers: [
            {
                version: "0.8.7",
            },
            {
                version: "0.8.9",
            },
        ],
    },
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize : true
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize : true
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }
  }
}
export default config;
