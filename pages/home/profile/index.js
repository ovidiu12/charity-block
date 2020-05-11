import React from "react";
import Layout from "../../../components/layout";
import {
  Typography,
  CircularProgress,
  Grid,
  CardContent,
  CardMedia,
  CardActions,
  Card,
  Button,
} from "@material-ui/core";
import MainContract from "../../../ethereum";
import web3 from "../../../ethereum/web3";
import styled from "styled-components";
import FoodPanda from "../../../public/foodpanda.jpg";
import Bolt from "../../../public/bolt.png";

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

const Profile = () => {
  const [tokens, setTokens] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    web3.eth.getAccounts().then((acc) => {
      if (acc && acc[0]) {
        MainContract.methods
          .balanceOf(acc[0])
          .call()
          .then((tokens) => {
            setTokens(tokens);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }
    });
  });
  if (loading) {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    );
  }
  return (
    <Layout>
      <Typography variant="h5" align="left" color="textSecondary" paragraph>
        You currently have:
      </Typography>
      <Typography variant="h3" align="left" color="textPrimary">
        {tokens} Charity Tokens
      </Typography>
      <Typography
        style={{ marginTop: "100px" }}
        variant="h6"
        align="left"
        color="textSecondary"
        paragraph
      >
        <b>What are these tokens?</b>
      </Typography>
      <Typography
        variant="h5"
        align="left"
        color="textSecondary"
        variant="body1"
        paragraph
      >
        Charity Tokens are a form of rewarding the donors in exchange for their
        generosity. You can earn Charity Tokens by donating to active campaigns.
        The formula to calculate the rewarded tokens is:{" "}
        <b>rewardedTokens = donatedAmount (in wei) / rate (rate = 1 finney);</b>
      </Typography>
      <Typography
        style={{ marginTop: "100px" }}
        variant="h6"
        align="left"
        color="textSecondary"
        paragraph
      >
        <b>What can I do with them?</b>
      </Typography>
      <Typography
        variant="h5"
        align="left"
        color="textSecondary"
        variant="body1"
        paragraph
      >
        You can use the Charity Tokens to get special deals from our partners
        listed bellow.
      </Typography>
      <Grid style={{ marginBottom: "80px" }} container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardMedia
              image={`https://s6t6p5e2.stackpathcdn.com/wp-content/uploads/Udemy-Account-Deletion.jpg`}
              title="Udemy"
            />
            <StyledCardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Udemy Deals
              </Typography>
              <Typography>
                Get a discount on Udemy using Charity Tokens
              </Typography>
            </StyledCardContent>
            <StyledCardActions>
              <Button size="small" variant="contained" color="primary">
                Get Deal
              </Button>
            </StyledCardActions>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardMedia image={FoodPanda} title="Food Panda" />
            <StyledCardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Foodpanda Discount
              </Typography>
              <Typography>
                Spend Charity Tokens and get a discount on your meal ordered
                through Food Panda.
              </Typography>
            </StyledCardContent>
            <StyledCardActions>
              <Button size="small" variant="contained" color="primary">
                Get Deal
              </Button>
            </StyledCardActions>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardMedia image={Bolt} title="Bolt" />
            <StyledCardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Bolt Discount
              </Typography>
              <Typography>
                Donate and spend your Charity Tokens with Bolt.
              </Typography>
            </StyledCardContent>
            <StyledCardActions>
              <Button size="small" variant="contained" color="primary">
                Get Deal
              </Button>
            </StyledCardActions>
          </StyledCard>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Profile;
