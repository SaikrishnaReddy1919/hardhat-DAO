import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
//@ts-ignore
import { ethers } from "hardhat";
import { MIN_DELAY, QUORUM_PERCENTAGE, VOTING_DELAY, VOTING_PERIOD, ZERO_ADDRESS } from "../helper-hardhat-config";

const setUpContracts: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    //@ts-ignore
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()

    const timeLock = await ethers.getContract("TimeLock", deployer);
    const governor = await ethers.getContract("GovernorContract", deployer)

    log("Setting up roles...",governor.address, ZERO_ADDRESS)
    const proposerRole = await timeLock.PROPOSER_ROLE();
    const executorRole = await timeLock.EXECUTOR_ROLE();
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

    /**
     * set proposer, executor, revoke
     */

    //proposer
    //saying timelock controller that here is the governor who can do anything
    const proposerTx = await timeLock.grantRole(proposerRole, governor.address);
    await proposerTx.wait(1)

    //executor -> ZERO_ADDRESS. this means anybody can execute.
    const executorTx = await timeLock.grantRole(executorRole, "0x0000000000000000000000000000000000000000");
    await executorTx.wait(1)

    //revoke
    const revokeTx = await timeLock.revokeRole(adminRole, deployer);
    await revokeTx.wait(1);
    
}
 export default setUpContracts