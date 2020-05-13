import web3 from "./web3";
import Main from "./build/CharityMain.json";

const MainContract = new web3.eth.Contract(
  Main.abi,
  "0x0D205b331C43bE86a58207DA08FbcEF35C6476A4" //deployed contract address
);

export default MainContract;
