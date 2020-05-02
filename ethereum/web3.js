import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // we are in the browser and metamask is runnig.
  web3 = new Web3(window.ethereum);

  (async () => {
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (accounts.length == 0) {
      console.log("No accounts found. Metamask is not active");
    } else {
      console.log(`MetaMask installed and connected to ${network} Network.`);
    }
  })();
} else {
  console.log("No MetaMask");
  // we are on the server *OR* the user is not runnig metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/5dfb2ede7e544b0ab4c5981074243981"
  );
  web3 = new Web3(provider);
}

export default web3;
