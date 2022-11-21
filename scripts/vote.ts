import { readFileSync } from "fs"
import { ethers, network } from "hardhat"
import { developmentChains, proposalsFile, VOTING_PERIOD } from "../helper-hardhat-config"
import { moveBlocks } from "../utils/move-blocks";

const index = 0; //first proposal from json file as this is theh only proposal we are creating.

async function main(proposalIndex: number) {
    const proposals = JSON.parse(readFileSync(proposalsFile, "utf8"))
    const proposalId = proposals[network.config.chainId!][proposalIndex];

    // 0 = against, 1 = for, 2 = abstain
    const voteWay = 1
    const reason = "I like a do da cha cha hu hey!"
    const governor = await ethers.getContract("GovernorContract")
    const voteTxResponse =await  governor.castVoteWithReason(proposalId, voteWay, reason)

    await voteTxResponse.wait(1);
    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1)
    }
    console.log("Voted! Ready to go...");
    //TODO : check proposal state

}
main(index).then(() => process.exit(0)).catch((e) => {
    console.log(e)
    process.exit(1)
})