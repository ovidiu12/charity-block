import web3 from "./web3";
import Main from "./build/CharityMain.json";

const MainContract = new web3.eth.Contract(
  Main.abi,
  "0xE1bE282a4d8d8F5bd300a0726c81bbA93bceC20e" //deployed contract address
);

export default MainContract;
