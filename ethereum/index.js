import web3 from "./web3";
import Main from "./build/CharityMain.json";

const MainContract = new web3.eth.Contract(
  Main.abi,
  "0x32b456409f3ECCC29C68472bdE304511DF0D9E54" //deployed contract address
);

export default MainContract;
