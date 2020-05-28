import web3 from "./web3";
import Main from "./build/CharityMain.json";

const MainContract = new web3.eth.Contract(
  Main.abi,
  "0x3C8b1820b9Ddeaa3C4A33E0B4e2bdEf3086EfBd4" //deployed contract address
);

export default MainContract;
