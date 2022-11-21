import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployBoxContract: DeployFunction = async function (
    hre : HardhatRuntimeEnvironment
) {
//@ts-ignore
    
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log, get} = deployments
    const { deployer } = await getNamedAccounts()

    log("deploying Box contract...")

    const args = []
    const box = await deploy("Box",{
        from : deployer,
        args: args,
        log: true,
        // waitConfirmations : 1 //you need to wait for no. of blocks before verifying it on etherscan
    })
    //here deployer has the ownership to the contract. We need to transfer ownership to the TimeLock controller to update the 'store' value in a decentralized way by voting.
    log("Transferring ownership to TimeLock contract ....")
    const timeLock = await ethers.getContract("TimeLock")
    const boxContract = await ethers.getContract("Box")
    const txnOwnerTransfer = await boxContract.transferOwnership(timeLock.address)

    await txnOwnerTransfer.wait(1)
    //TODO: verify
}
 
export default deployBoxContract;