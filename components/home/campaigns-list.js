import React from "react";
import {
  Grid,
  CardMedia,
  Button,
  CardActions,
  Card,
  CardContent,
  Typography,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import styled from "styled-components";
import ETHIcon from "../../svgs/eth.svg";
import web3 from "../../ethereum/web3";
import Link from "next/link";

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const StyledCardActions = styled(CardActions)`
  && {
    padding: 20px;
    a {
      text-decoration: none;
    }
  }
`;
const StyledCardMedia = styled(CardMedia)`
  min-height: 300px;
  paddingtop: 56.25%;
`;

const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
  && {
    padding: 20px;
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
      background: white;
    }
    background: white;
    position: absolute;
    top: 0;
    right: 0;
    border-bottom-left-radius: 5px;
  }
`;

const Progress = styled.div`
  .MuiLinearProgress-root {
    height: 7px !important;
  }
  span {
    display: block;
    padding: 10px 20px;
  }
`;

const CampaignsList = ({ campaigns, handleOpenDonateModal }) => {
  return (
    <Grid container spacing={4}>
      {campaigns.map((campaign) => {
        const progress = (
          (web3.utils.fromWei(campaign.balance, "ether") * 100) /
          web3.utils.fromWei(campaign.goal, "ether")
        ).toFixed(1);
        const description = campaign.description;
        const minDonation = web3.utils.fromWei(campaign.minDonation, "ether");
        return (
          <Grid item key={campaign.imageHash} xs={12} sm={6} md={4}>
            <StyledCard>
              <MinDonation aria-label="delete">
                <div>
                  <img src={ETHIcon} />
                  <span>{minDonation.substr(0, 6)}</span>
                </div>
                <p>MIN DONATION</p>
              </MinDonation>
              <StyledCardMedia
                image={`https://ipfs.io/ipfs/${campaign.imageHash}`}
                title="Image title"
              />
              {campaign.isFunded ? (
                <Progress>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    color="primary"
                  />
                  <span>
                    This campaign has been funded! It raised{" "}
                    <b>{web3.utils.fromWei(campaign.goal, "ether")} ETH</b>
                  </span>
                </Progress>
              ) : (
                <Progress>
                  <LinearProgress
                    variant="determinate"
                    value={progress >= 100 ? 100 : progress}
                    color="primary"
                  />
                  <span>
                    {web3.utils.fromWei(campaign.balance, "ether")} Ether out of{" "}
                    {web3.utils.fromWei(campaign.goal, "ether")} funded
                  </span>
                </Progress>
              )}

              <StyledCardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {campaign.title}
                </Typography>
                <Typography>
                  {description.length > 100
                    ? description.substr(0, 100) + "..."
                    : description}
                </Typography>
              </StyledCardContent>
              <StyledCardActions>
                {!campaign.isFunded && (
                  <Button
                    onClick={() => handleOpenDonateModal(campaign)}
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Donate
                  </Button>
                )}

                <Link href={`/home/campaign/${campaign.address}`} passHref>
                  <a>
                    <Button size="small" color="primary">
                      View
                    </Button>
                  </a>
                </Link>
              </StyledCardActions>
            </StyledCard>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CampaignsList;
