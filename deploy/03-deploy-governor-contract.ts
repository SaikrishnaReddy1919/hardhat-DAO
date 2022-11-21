import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
//@ts-ignore
import { ethers } from "hardhat";
import { MIN_DELAY, QUORUM_PERCENTAGE, VOTING_DELAY, VOTING_PERIOD } from "../helper-hardhat-config";

const deployGovernorContract: DeployFunction = async function (
    hre : HardhatRuntimeEnvironment
) {
//@ts-ignore
    
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log, get} = deployments
    const { deployer } = await getNamedAccounts()


    const governanceToken = await get("GovernanceToken")
    const timeLock = await get("TimeLock")
    log("deploying governor contract...")

    const args = [governanceToken.address, timeLock.address, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE]
    const governorContract = await deploy("GovernorContract",{
        from : deployer,
        args: args,
        log: true,
        // waitConfirmations : 1 //you need to wait for no. of blocks before verifying it on etherscan
    })
    //TODO: verify
}
 
export default deployGovernorContract;