// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ContractLogic.sol";

contract ContractProxy {
    address owner = msg.sender;
    address delegate;

    constructor(address newDelegateAddress) {
        require(msg.sender == owner);
        delegate = newDelegateAddress;
    }

    function transfer(address contractAddress, address recipient, uint256 amount) external {
        (bool value,) = delegate.delegatecall(abi.encodeWithSignature("transfer(address,address,uint256)", contractAddress, recipient, amount));
        require(value);
    }
}