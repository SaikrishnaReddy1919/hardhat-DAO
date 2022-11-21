import { ethers, network } from "hardhat";
import { developmentChains, FUNCTION_NAME, NEW_STORE_VALUE, proposalsFile, PROPOSAL_DESCRIPTION, VOTING_DELAY } from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";
import {fstat, readFileSync, writeFileSync} from "fs"
export async function propose(args : any[], functionToCall : string, proposalDescription : string) {
    const governor = await ethers.getContract("GovernorContract")
    const box = await ethers.getContract("Box")

    /**
     * propose() is expecting follow params
        *   address[] memory targets,
            uint256[] memory values,
            bytes[] memory calldatas, -> is the information about function that governor want to propose in encoded format.
            string memory description
     */

    // to pass in param : calldatas
    const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args)
    console.log(encodedFunctionCall)
    console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`)
    console.log(`Proposal description is : \n ${proposalDescription}`)
    console.log("Making a proposal...📍")

    const proposeTx = await governor.propose(
        [box.address], //target contract address
        [0], // value sending to call function
        [encodedFunctionCall],
        proposalDescription
    )
    const proposalReceipt = await proposeTx.wait(1)

    /**
     * Now proposal is made.
     * Now for people to starting a voting, there is voting delay VOTING_DELAY.
     * On a local chain no one processing blocks so we need to move blocks.For that,...
     */
    if (developmentChains.includes(network.name)) {
        //move blocks
        await moveBlocks(VOTING_DELAY + 1)
    }

    //we need propsal id for voting. So to grab this.
    const proposalId = await proposalReceipt.events[0].args.proposalId;
    let proposals = JSON.parse(readFileSync(proposalsFile, "utf8"))
    proposals[network.config.chainId!.toString()].push(proposalId.toString())
    writeFileSync(proposalsFile, JSON.stringify(proposals))
}

propose([NEW_STORE_VALUE], FUNCTION_NAME, PROPOSAL_DESCRIPTION).then(() => process.exit(0)).catch((e) => {
    console.log(e)
    process.exit(1)
})