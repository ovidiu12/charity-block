import React from "react";
import Campaign from "../../ethereum/campaign";
import Layout from "../../components/layout";
import styled from "styled-components";
import web3 from "../../ethereum/web3";
import Image from "react-image";
import {
  LinearProgress,
  IconButton,
  useTheme,
  Typography,
  Button,
} from "@material-ui/core";
import ETHIcon from "../../svgs/eth.svg";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MuiAlert from "@material-ui/lab/Alert";

const CoverImage = styled.div`
  width: 100%;
  position: relative;
  height: 500px;
  margin-bottom: 80px;
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
      rgba(255, 87, 34, 0.6) 0%,
      rgba(255, 255, 255, 0) 55%
    );
  }
`;

const Progress = styled.div`
  margin-top: -5px;
  .MuiLinearProgress-root {
    height: 12px !important;
  }
  span {
    display: block;
    font-size: 16px;
    padding: 10px 20px;
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

  && {
    button {
      margin-left: auto;
    }
    p {
      font-weight: bold;
    }
  }
`;

function Alert(props) {
  return (
    <div style={{ marginBottom: "50px" }}>
      <MuiAlert elevation={6} variant="filled" {...props} />
    </div>
  );
}

const CampaignPage = (props) => {
  console.log(props);
  const muiTheme = useTheme();
  const minDonation = web3.utils.fromWei(props.minDonation, "ether");
  return (
    <Layout>
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
          <p>SUPPORTERS</p>
        </Supporters>
        <Image src={`https://ipfs.io/ipfs/${props.imageHash}`} />
        <Progress>
          <LinearProgress
            variant="determinate"
            value={
              (web3.utils.fromWei(props.balance, "ether") * 100) /
              web3.utils.fromWei(props.goal, "ether")
            }
            color="primary"
          />
          <span>
            {web3.utils.fromWei(props.balance, "ether")} Ether out of{" "}
            {web3.utils.fromWei(props.goal, "ether")} funded
          </span>
        </Progress>
      </CoverImage>
      <Alert severity="info">
        This campaign was published at address:{" "}
        <a href={`https://etherscan.io/address/${props.address}`}>
          {props.address}
        </a>
      </Alert>
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
        <Button
          variant="contained"
          color="primary"
          startIcon={<WhatshotIcon />}
        >
          DONATE
        </Button>
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
    address: data[5],
    title: data[6],
    description: data[7],
    imageHash: data[8],
  };
};

export default CampaignPage;
