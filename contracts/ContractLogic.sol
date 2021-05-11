// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ContractLogic {
    function transfer(address contractAddress, address recipient, uint256 amount) public {
        require(contractAddress != address(0), "Token should be not null");
        IERC20(contractAddress).transfer(recipient, amount);
    }
}