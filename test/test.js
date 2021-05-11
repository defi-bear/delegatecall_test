const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test", function() {
    it("Deploy contracts and test the things", async function() {
        const [owner] = await ethers.getSigners();
        const supply = 1000000000;
        const sendAmount = 100000000;

        // Deploy test erc20
        const ERC20 = await ethers.getContractFactory("MockERC20");

        const Token1 = await ERC20.deploy("Token1", "TKN1", owner.address, supply);
        const Token2 = await ERC20.deploy("Token2", "TKN2", owner.address, supply);
        const Token3 = await ERC20.deploy("Token3", "TKN3", owner.address, supply);

        // Deploy Logic and Proxy contracts
        const ContractLogic = await ethers.getContractFactory("ContractLogic");
        const Logic = await ContractLogic.deploy();
        const ContractProxy = await ethers.getContractFactory('ContractProxy');
        const Proxy = await ContractProxy.deploy(Logic.address);

        // send token to proxy
        await Token1.transfer(Proxy.address, sendAmount * 2);
        await Token2.transfer(Proxy.address, sendAmount * 2);
        await Token3.transfer(Proxy.address, sendAmount * 2);

        // create random wallet
        const wallet = ethers.Wallet.createRandom();

        // checking transfer method
        await Proxy.connect(owner).transfer(Token1.address, wallet.address, sendAmount);
        let tokenBalance = await Token1.balanceOf(wallet.address);
        expect(sendAmount).to.equal(tokenBalance);

        await Proxy.connect(owner).transfer(Token2.address, wallet.address, sendAmount);
        tokenBalance = await Token2.balanceOf(wallet.address);
        expect(sendAmount).to.equal(tokenBalance);

        await Proxy.connect(owner).transfer(Token3.address, wallet.address, sendAmount);
        tokenBalance = await Token3.balanceOf(wallet.address);
        expect(sendAmount).to.equal(tokenBalance);
    });
})