export const MIN_DELAY = 3600 //1 hour - fter a vote passes, you have 1 hour before you can enact
// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests. So use below one
export const VOTING_PERIOD = 5; //5-blocks
export const VOTING_DELAY = 1; //1 block - How many blocks till a proposal vote becomes active
export const QUORUM_PERCENTAGE = 4; // 4% of always need to vote
export const ZERO_ADDRESS = 0x0000000000000000000000000000000000000000;

export const NEW_STORE_VALUE = 100;
export const FUNCTION_NAME = "store"
export const PROPOSAL_DESCRIPTION = "Propossal #1 : store 100 in the box"

export const developmentChains = ["hardhat", "localhost"]
export const proposalsFile = "proposals.json"