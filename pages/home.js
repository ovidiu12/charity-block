import Layout from "../components/layout";
import { CircularProgress, Typography } from "@material-ui/core";
import MetamaskInfo from "../components/home/metamask-info";
import CampaignsList from "../components/home/campaigns-list";

const Home = () => {
  const [metamaskEnabled, setMetamaskEnabled] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  let campaigns = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ];

  const enableEth = async () => {
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
          setMetamaskEnabled(true);
          setLoading(false);
        }
        return web3;
      } catch (error) {
        // whoopsie!
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    enableEth();
  }, []);

  if (loading) {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    );
  }
  return (
    <Layout>
      {metamaskEnabled ? (
        <>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Campaigns in Progress
          </Typography>
          <CampaignsList campaigns={campaigns} />
        </>
      ) : (
        <MetamaskInfo />
      )}
    </Layout>
  );
};

export default Home;
