import web3 from "./web3";
import Main from "./build/CharityMain.json";

const MainContract = new web3.eth.Contract(
  Main.abi,
  "0x5629CFE15DE8C1D2678642898AC2B529f1E9C02B" //deployed contract address
);

export default MainContract;
