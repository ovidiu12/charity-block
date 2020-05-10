import Layout from "../../components/layout";
import { CircularProgress, Typography } from "@material-ui/core";
import MetamaskInfo from "../../components/home/metamask-info";
import CampaignsList from "../../components/home/campaigns-list";
import NewCampaignModal from "../../components/home/campaign-modal";
import { CampaignModalContext } from "../../components/home/campaign-context";
import MainContract from "../../ethereum";
import Campaign from "../../ethereum/campaign";
import DonateModal from "../../components/home/donate-modal";

const Home = ({ campaigns }) => {
  const [metamaskEnabled, setMetamaskEnabled] = React.useState(false);
  const [campaignModalIsOpen, setCampaignModalIsOpen] = React.useState(false);
  const [donateModalIsOpen, setDonateModalIsOpen] = React.useState(false);
  const [donateModalCampaign, setDonateModalCampaign] = React.useState(null);

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

  const handleOpenDonateModal = (campaign) => {
    setDonateModalCampaign(campaign);
    setDonateModalIsOpen(true);
  };
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
            {campaigns.length > 0 ? (
              <CampaignsList
                handleOpenDonateModal={handleOpenDonateModal}
                campaigns={campaigns}
              />
            ) : (
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                No active campaigns.
              </Typography>
            )}
          </>
        ) : (
          <MetamaskInfo />
        )}
        <NewCampaignModal />
        {donateModalCampaign && donateModalIsOpen && (
          <DonateModal
            isOpen={donateModalIsOpen}
            campaign={donateModalCampaign}
            setIsOpen={setDonateModalIsOpen}
          />
        )}
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
      goal: element[0],
      minDonation: element[1],
      balance: element[2],
      spendingRequests: element[3],
      donorsCount: element[4],
      admin: element[5],
      isFunded: element[6],
      title: element[7],
      description: element[8],
      imageHash: element[9],
      address: campaignsAddress[index],
    };
  });

  return { campaigns: campaignss };
};
export default Home;
