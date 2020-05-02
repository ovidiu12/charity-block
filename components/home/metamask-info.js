import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import Link from "next/link";

const MetamaskInfo = () => {
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
        Looks like you don't have the Metamask extension. In order to use this
        app you need to have a Metamask account.
      </Typography>
      <div>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Link passHref href="//metamask.io/">
              <a style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">
                  Install MetaMask
                </Button>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Link
              passHref
              href="//medium.com/@seanschoi/what-is-metamask-really-what-is-it-7bc1bf48c75"
            >
              <a style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="primary">
                  What is MetaMask?
                </Button>
              </a>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default MetamaskInfo;
