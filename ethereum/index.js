import web3 from "./web3";
import Main from "./build/CharityMain.json";

const MainContract = new web3.eth.Contract(
  Main.abi,
  "0x451486D2d776FfeCfB1Cc3888cF03A6C608852E3" //deployed contract address
);

export default MainContract;
