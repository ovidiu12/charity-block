import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import Link from "next/link";

const MetamaskInfo = ({ enableEth }) => {
  return (
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Important note!
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        This app uses Ethereum Blockchain.In order to use this app you need to
        have a Metamask account.
      </Typography>
      <div>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="contained" onClick={enableEth} color="primary">
              Enable Metamask
            </Button>
          </Grid>
          <Grid item>
            <Link passHref href="//metamask.io/">
              <a style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="primary">
                  Install MetaMask
                </Button>
              </a>
            </Link>
          </Grid>
          <Grid style={{ width: "100%" }} item>
            <div style={{ textAlign: "center" }}>
              <Link
                passHref
                href="//medium.com/@seanschoi/what-is-metamask-really-what-is-it-7bc1bf48c75"
              >
                <a style={{ textDecoration: "none" }}>WHAT IS METAMASK?</a>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default MetamaskInfo;
