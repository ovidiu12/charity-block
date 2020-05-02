import web3 from "./web3";
import Main from "./build/Main.json";

const instance = new web3.eth.Contract(
  Main.abi,
  "0x0B721574F48e8fB33f4486531a014416b7F1B0c8" //deployer account
);

export default instance;
