import React from "react";
import Campaign from "../../../../ethereum/campaign";
import Layout from "../../../../components/layout";
import styled from "styled-components";
import web3 from "../../../../ethereum/web3";
import Image from "react-image";
import {
  LinearProgress,
  IconButton,
  useTheme,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import ETHIcon from "../../../../svgs/eth.svg";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MuiAlert from "@material-ui/lab/Alert";
import BuildIcon from "@material-ui/icons/Build";
import SpendingModal from "../spending-modal";
import Link from "next/link";
import DonateModal from "../../../../components/home/donate-modal";
import FlagIcon from "@material-ui/icons/Flag";
import { toast } from "react-toastify";

const CoverImage = styled.div`
  width: 100%;
  position: relative;
  height: 500px;
  margin-top: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(
      0deg,
      rgba(83, 109, 254, 0.6) 0%,
      rgba(255, 255, 255, 0) 55%
    );
  }
`;

const Progress = styled.div`
  margin-top: -5px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  .MuiLinearProgress-root {
    height: 12px !important;
  }
  span {
    display: block;
    font-size: 16px;
    padding: 10px 30px;
  }

  :after {
    content: "${(props) => props.progress}%";
    border-radius: 50px;
    background: ${({ theme }) => theme.palette.primary.main};
    color: white;
    position: absolute;
    left: ${(props) => props.progress}%;
    transform: translateX(-50%);
    top: -50px;
    width: 45px;
    display: flex;
    height: 45px;
    justify-content: center;
    align-items: center;
  }
`;

const MinDonation = styled(IconButton)`
  img {
    width: 24px;
  }

  div {
    display: flex;
  }
  && {
    span {
      display: flex;
      flex-direction: column;
    }
    p {
      font-size: 12px;
      margin-bottom: 0;
    }
    border-radius: 0;
    :hover {
      cursor: inherit;
      background: white;
    }
    background: white;
    position: absolute;
    top: 0;
    right: 0;
    border-bottom-left-radius: 5px;
  }
`;

const Supporters = styled(MinDonation)`
  && {
    left: 0;
    right: auto;
    min-height: 78px;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 5px;
    color: white;
    ${({ theme }) => `
    background-color: ${theme.palette.primary.main}`};
    :hover {
      ${({ theme }) => `
      background-color: ${theme.palette.primary.main}`};
    }
    span {
      font-size: 24px;
    }
  }
`;

const Title = styled.div`
  display: flex;
  margin-top: 50px;
  margin-bottom: 20px;
  && {
    div {
      margin-left: auto;
    }
    p {
      font-weight: bold;
    }
  }
`;

const Actions = styled.div``;

const StyledAlert = styled(MuiAlert)`
  && {
    align-items: center;
    button {
      border-color: white;
      color: white;
      margin-left: 10px;
    }
    ${({ isInfo, theme }) =>
      isInfo &&
      `
      background: ${theme.palette.primary.main};
    `}
    a {
      color: white;
    }
  }
`;

function Alert(props) {
  return (
    <div
      style={{
        marginBottom: "10px",
      }}
    >
      <StyledAlert
        theme={props.theme}
        isInfo={props.isInfo}
        elevation={6}
        variant="filled"
        {...props}
      />
    </div>
  );
}

const CampaignPage = (props) => {
  const [userAccounts, setUserAccounts] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const muiTheme = useTheme();
  const minDonation = web3.utils.fromWei(props.minDonation, "ether");
  const [spendingModalIsOpen, setSpendingModalIsOpen] = React.useState(false);
  const [donateModalIsOpen, setDonateModalIsOpen] = React.useState(false);

  React.useEffect(() => {
    //get current user addresses
    web3.eth.getAccounts().then((acc) => setUserAccounts(acc));
  }, []);

  const endCampaign = async () => {
    setLoading(true);
    const campaign = Campaign(props.address);
    try {
      await campaign.methods.finishCampaign().send({
        from: userAccounts[0],
      });
      setLoading(false);
      toast.success("Campaign ended!");
      return;
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Oups! There was an error while processing your request.", {
        autoClose: 5000,
      });
      return;
    }
  };

  return (
    <Layout>
      <Link href={`/home`} passHref>
        <a style={{ textDecoration: "none" }}>
          <Button color="primary" variant="contained">
            Go Back
          </Button>
        </a>
      </Link>
      <CoverImage>
        <MinDonation aria-label="delete">
          <div>
            <img src={ETHIcon} />
            <span>{minDonation.substr(0, 6)}</span>
          </div>
          <p>MIN DONATION</p>
        </MinDonation>
        <Supporters theme={muiTheme}>
          <div>
            <span>{props.donorsCount}</span>
          </div>
          <p>{props.donorsCount > 1 ? "DONATIONS" : "DONATION"}</p>
        </Supporters>
        <Image src={`https://ipfs.io/ipfs/${props.imageHash}`} />
      </CoverImage>
      <Paper
        elevation={4}
        style={{ padding: "70px 30px 30px 30px", position: "relative" }}
      >
        <Progress
          progress={(
            (web3.utils.fromWei(props.balance, "ether") * 100) /
            web3.utils.fromWei(props.goal, "ether")
          ).toFixed(1)}
          theme={muiTheme}
        >
          <LinearProgress
            variant="determinate"
            value={
              (web3.utils.fromWei(props.balance, "ether") * 100) /
              web3.utils.fromWei(props.goal, "ether")
            }
            color="primary"
          />
          <span>
            {web3.utils.fromWei(props.balance, "ether")} ETH out of{" "}
            {web3.utils.fromWei(props.goal, "ether")} ETH funded
          </span>
        </Progress>
        {userAccounts &&
          userAccounts.includes(props.admin) &&
          props.balance >= props.goal && (
            <div>
              <Alert severity="success">
                Wohooo! This campaign has been funded.
                <Button
                  onClick={endCampaign}
                  disabled={loading}
                  variant="outlined"
                  style={{ marginRight: "5px" }}
                  startIcon={<FlagIcon />}
                >
                  {loading ? "Loading..." : "End Campaign"}
                </Button>
              </Alert>
              <Typography style={{ marginBottom: "10px" }} variant="body1">
                You can now end the end the campaign and add new spending
                requests.
              </Typography>
            </div>
          )}
        <Alert theme={muiTheme} isInfo severity="info">
          This campaign was published at address:{" "}
          <a href={`https://rinkeby.etherscan.io/address/${props.address}`}>
            {props.address}
          </a>
        </Alert>
        {props.isFunded && (
          <Alert isInfo theme={muiTheme} severity="info">
            This campaign has {props.spendingRequests} spending requests.
            <Link
              passHref
              href={`/home/campaign/${props.address}/spending-requests`}
            >
              <a>
                <Button
                  variant="outlined"
                  style={{ marginRight: "5px" }}
                  startIcon={<BuildIcon />}
                >
                  View Spending Requests
                </Button>
              </a>
            </Link>
          </Alert>
        )}

        <Title>
          <Typography
            variant="h5"
            font
            align="left"
            color="textSecondary"
            paragraph
          >
            {props.title}
          </Typography>
          <Actions>
            {userAccounts &&
              userAccounts.includes(props.admin) &&
              props.isFunded && (
                <Button
                  onClick={() => setSpendingModalIsOpen(true)}
                  variant="outlined"
                  style={{ marginRight: "5px" }}
                  color="secondary"
                  startIcon={<BuildIcon />}
                >
                  New Spending Request
                </Button>
              )}

            <Button
              variant="contained"
              color="primary"
              onClick={() => setDonateModalIsOpen(true)}
              startIcon={<WhatshotIcon />}
            >
              DONATE
            </Button>
          </Actions>
        </Title>
        <Typography
          variant="subtitle1"
          font
          align="left"
          color="textSecondary"
          paragraph
        >
          {props.description}
        </Typography>
      </Paper>
      {spendingModalIsOpen && (
        <SpendingModal
          isOpen={spendingModalIsOpen}
          campaign={{ ...props }}
          setIsOpen={setSpendingModalIsOpen}
        />
      )}
      {donateModalIsOpen && (
        <DonateModal
          isOpen={donateModalIsOpen}
          campaign={{ ...props }}
          setIsOpen={setDonateModalIsOpen}
        />
      )}
    </Layout>
  );
};

CampaignPage.getInitialProps = async (props) => {
  const campaign = Campaign(props.query.id);
  const data = await campaign.methods.getData().call();

  return {
    goal: data[0],
    minDonation: data[1],
    balance: data[2],
    spendingRequests: data[3],
    donorsCount: data[4],
    admin: data[5],
    isFunded: data[6],
    title: data[7],
    description: data[8],
    imageHash: data[9],
    address: props.query.id,
  };
};

export default CampaignPage;
