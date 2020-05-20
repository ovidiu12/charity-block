import React from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  Typography,
  Container,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Paper,
  Divider,
} from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ETHIllustration from "../public/illustration.svg";

const Navbar = styled(AppBar)`
  && {
    margin-bottom: 50px;
  }
`;

const Actions = styled.div`
  margin-left: auto;
  display: flex;
`;

const GoToApp = styled(Button)`
  && {
    margin-right: 30px;
    border-color: white;
    color: white;
  }
`;

const Hero = styled.div`
  display: flex;
  margin-bottom: 100px;
`;
const HeroImg = styled.img`
  margin-left: auto;
  max-width: 50%;
`;
const Text = styled.div`
  margin-top: 10%;
  max-width: 40%;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
`;

const HowItWorks = styled.div`
  margin-bottom: 100px;
`;
const Info = styled.div`
  margin-bottom: 100px;
`;
const Index = () => {
  return (
    <>
      <Navbar color="primary" position="relative">
        <Container>
          <Toolbar style={{ padding: 0 }}>
            <WhatshotIcon />
            <Link href="/">
              <Typography
                style={{ cursor: "pointer" }}
                variant="h6"
                color="inherit"
                noWrap
              >
                Charity Block
              </Typography>
            </Link>
            <Actions>
              <Link href="/home" passhref>
                <a style={{ textDecoration: "none" }}>
                  <GoToApp variant="outlined">Access DApp</GoToApp>
                </a>
              </Link>
            </Actions>
          </Toolbar>
        </Container>
      </Navbar>
      <Container>
        <Hero>
          <Text>
            <Typography
              variant="h2"
              style={{
                fontWeight: "bold",
                lineHeight: "1.1",
                marginBottom: "15px",
              }}
              color="primary"
            >
              Charity through The Blockchain
            </Typography>
            <Typography
              variant="h6"
              style={{ color: "#b1b1b1", marginBottom: "20px" }}
            >
              Donate directly to people, lose the middle man, make a difference.
            </Typography>
            <Link href="/home" passhref>
              <a style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px" }}
                >
                  Access DApp
                </Button>
              </a>
            </Link>
          </Text>
          <HeroImg src={ETHIllustration} alt="Illustration" />
        </Hero>
        <HowItWorks>
          <Typography variant="h5" style={{ marginBottom: "20px" }}>
            How it works
          </Typography>
          <Divider style={{ marginBottom: "50px", width: "15%" }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <StyledPaper elevation={2}>
                <Typography variant="h6">Setup a Metamask Account</Typography>
                <Typography variant="body2" style={{ color: "#b1b1b1" }}>
                  In order to access this app you need a Metamask Account.{" "}
                  <Link
                    href="//medium.com/@seanschoi/what-is-metamask-really-what-is-it-7bc1bf48c75"
                    passHref
                  >
                    <a>Read about Metamask</a>
                  </Link>
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper elevation={2}>
                <Typography variant="h6">Connect to the App</Typography>
                <Typography variant="body2" style={{ color: "#b1b1b1" }}>
                  Access the app and then connect to it using your Metamask
                  account.
                </Typography>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper elevation={2}>
                <Typography variant="h6">That's it. Donate!</Typography>
                <Typography variant="body2" style={{ color: "#b1b1b1" }}>
                  That's all you need in order to start donating to campaigns.
                </Typography>
              </StyledPaper>
            </Grid>
          </Grid>
        </HowItWorks>
        <Info>
          <Typography variant="h5" style={{ marginBottom: "20px" }}>
            What is Metamask?
          </Typography>
          <Divider style={{ marginBottom: "50px", width: "15%" }} />
          <StyledPaper elevation={3}>
            <Typography
              variant="body1"
              style={{
                color: "#b1b1b1",
                lineHeight: "1.6",
                marginBottom: "10px",
              }}
            >
              Metamask is a web browser extension that behaves like an Ethereum
              wallet and gives users the possibility to interact with
              Ethereum-based Apps (or Dapps - Decentralized Applications).
              <br />
              It also allows users to perform any Ethereum related actions, such
              as: interacting with Smart Contracts, send/receive Ethereum or
              like mentioned already, interacting with Dapps. The main benefit
              of Metamask is that it's pretty much a plug and play tool avoiding
              users having to run the necessary software.
            </Typography>
            <Link
              href="//medium.com/@seanschoi/what-is-metamask-really-what-is-it-7bc1bf48c75"
              passhref
            >
              <a style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="secondary">
                  Learn more
                </Button>
              </a>
            </Link>
          </StyledPaper>
        </Info>
      </Container>
    </>
  );
};

export default Index;
