import web3 from "./web3";
import Main from "./build/CharityMain.json";

const MainContract = new web3.eth.Contract(
  Main.abi,
  "0x31684f35d7E6aD3DC1202aE0520250FeeD3ef368" //deployed contract address
);

export default MainContract;
