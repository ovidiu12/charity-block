import React from "react";

const useMetamask = () => {
  const [loading, setLoading] = React.useState(true);
  const [metamaskEnabled, setMetamaskEnabled] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("metamask")) {
      enableEth();
    }
    setLoading(false);
  }, []);

  const enableEth = async () => {
    setLoading(true);
    const { ethereum } = window;
    if (ethereum) {
      try {
        const web3 = new Web3(ethereum);
        const selectedAccount = await ethereum.enable();
        if (!selectedAccount) {
          // User didn't give permission for dapp to access wallet
          setMetamaskEnabled(false);
          setLoading(false);
        } else {
          // User allowed access
          localStorage.setItem("metamask", true);
          setMetamaskEnabled(true);
          setLoading(false);
        }
        return web3;
      } catch (error) {
        setLoading(false);
        // whoopsie!
        console.log(error);
      }
    } else {
      setMetamaskEnabled(false);
      setLoading(false);
    }
  };

  return {
    loading,
    metamaskEnabled,
    enableEth,
  };
};

export default useMetamask;
