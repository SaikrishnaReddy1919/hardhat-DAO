import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
//@ts-ignore
import { ethers } from "hardhat";
const deployGovernanceToken: DeployFunction = async function (
    hre : HardhatRuntimeEnvironment
) {
    
    //@ts-ignore
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log} = deployments
    const { deployer } = await getNamedAccounts()

    log("Deploying Governance token...")
    const args = []
    const governanceTokenContract = await deploy("GovernanceToken",{
        from : deployer,
        args: args,
        log: true,
        // waitConfirmations : 1 //you need to wait for no. of blocks before verifying it on etherscan
    })
    //TODO: verify
    await delegate(governanceTokenContract.address, deployer);
    log("Delegated!")
}


const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
    const tx = await governanceToken.delegate(delegatedAccount);

    await tx.wait(1);
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}
 
export default deployGovernanceToken;