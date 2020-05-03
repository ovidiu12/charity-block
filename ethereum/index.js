import web3 from "./web3";
import Main from "./build/CharityMain.json";

const MainContract = new web3.eth.Contract(
  Main.abi,
  "0xD8EFA97536EF0532C55cD3E3a2976Aa31d6517bE" //deployer account
);

export default MainContract;
