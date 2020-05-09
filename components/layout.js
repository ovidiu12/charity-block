import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import styled from "styled-components";
import { CampaignModalContext } from "./home/campaign-context";
import Link from "next/link";

const Navbar = styled(AppBar)`
  && {
    margin-bottom: 50px;
  }
`;

const Actions = styled.div`
  margin-left: auto;
  display: flex;
`;

const NewCampaign = styled(Button)`
  && {
    border-color: white;
    color: white;
  }
`;

const Layout = ({ children }) => {
  const { setIsOpen } = React.useContext(CampaignModalContext);
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
              <NewCampaign onClick={() => setIsOpen(true)} variant="outlined">
                New Campaign
              </NewCampaign>
            </Actions>
          </Toolbar>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
