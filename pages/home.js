import Layout from "../components/layout";
import { CircularProgress, Typography } from "@material-ui/core";
import MetamaskInfo from "../components/home/metamask-info";
import CampaignsList from "../components/home/campaigns-list";
import NewCampaignModal from "../components/home/campaign-modal";
import { CampaignModalContext } from "../components/home/campaign-context";
import MainContract from "../ethereum";
import Campaign from "../ethereum/campaign";

const Home = ({ campaigns }) => {
  const [metamaskEnabled, setMetamaskEnabled] = React.useState(false);
  const [campaignModalIsOpen, setCampaignModalIsOpen] = React.useState(false);

  const [loading, setLoading] = React.useState(true);

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
        setLoading(false);
        // whoopsie!
        console.log(error);
      }
    } else {
      setMetamaskEnabled(false);
      setLoading(false);
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
    <CampaignModalContext.Provider
      value={{
        isOpen: campaignModalIsOpen,
        setIsOpen: setCampaignModalIsOpen,
      }}
    >
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
        <NewCampaignModal />
      </Layout>
    </CampaignModalContext.Provider>
  );
};

Home.getInitialProps = async () => {
  const campaignsAddress = await MainContract.methods
    .getActiveCampaigns()
    .call();
  const campaigns = await Promise.all(
    Array.from({ length: campaignsAddress.length }).map((element, index) => {
      const campaign = Campaign(campaignsAddress[index]);
      return campaign.methods.getData().call();
    })
  );

  const campaignss = campaigns.map((element, index) => {
    return {
      minDonation: element[0],
      address: campaignsAddress[index],
      balance: element[1],
      spendingRequests: element[2],
      donorsCount: element[3],
      title: element[5],
      imageHash: element[6],
    };
  });

  return { campaigns: campaignss };
};
export default Home;
