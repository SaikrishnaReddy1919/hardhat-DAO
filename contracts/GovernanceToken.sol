// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
    uint256 public s_maxSupply = 1000000000000000000000000;

    constructor()
        ERC20("GovernanceToken", "GVT")
        ERC20Permit("GovernanceToken")
    {
        _mint(msg.sender, s_maxSupply);
    }

    /**
     *
     * We need to avoid :
     *  - If someone knows a proposal is coming up :
     *      -> Then they can buy a ton of tokens, and then they dump it after voting
     *      -> To avoid this we a need a snapshot of tokens people have
     *          at a certain block. At the time of making a proposal.
     *      -> This can be done using ERC20Votes.
     */

    /**
     * functions below are overrides required by solidity.
     * Reason : when we(this contracts) runs the following funtions, then this contracts
     *      - needs to tell/update the ERCvotes contract. So that, it can update the snapshot.
     * We need snapshot :
     *      -> when tokens are transferred.
     *      -> When new tokens are minted.
     *      -> when token are burned.
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20Votes)
    {
        super._burn(account, amount);
    }
}
