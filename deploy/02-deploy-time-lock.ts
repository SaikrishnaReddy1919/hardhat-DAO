import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
//@ts-ignore
import { ethers } from "hardhat";
import { MIN_DELAY } from "../helper-hardhat-config";

const deployTimeLock: DeployFunction = async function (
    hre : HardhatRuntimeEnvironment
) {
//@ts-ignore
    
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log} = deployments
    const { deployer } = await getNamedAccounts()

    log("Deploying Time lock...")
    const args = [MIN_DELAY, [], [], deployer]
    const timeLockContract = await deploy("TimeLock",{
        from : deployer,
        args: args,
        log: true,
        // waitConfirmations : 1 //you need to wait for no. of blocks before verifying it on etherscan
    })
    //TODO: verify
}
 
export default deployTimeLock;