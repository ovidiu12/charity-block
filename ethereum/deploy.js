const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const Main = require("./build/CharityMain.json");

const provider = new HDWalletProvider(
  "elevator pelican basket tobacco drama chest differ rubber system cube refuse lesson",
  "https://rinkeby.infura.io/v3/5dfb2ede7e544b0ab4c5981074243981"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(Main.abi)
    .deploy({
      data: "0x" + Main.evm.bytecode.object,
      arguments: ["CharityTKN", "CTKN", 4, 0],
    })
    .send({ gas: "5000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  return;
};
deploy();
