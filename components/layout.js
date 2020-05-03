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

const Navbar = styled(AppBar)`
  && {
    margin-bottom: 50px;
  }
`;

const Actions = styled.div`
  margin-left: auto;
  display: flex;
`;

const Layout = ({ children }) => {
  const { setIsOpen } = React.useContext(CampaignModalContext);
  return (
    <>
      <Navbar color="primary" position="relative">
        <Container>
          <Toolbar>
            <WhatshotIcon />
            <Typography variant="h6" color="inherit" noWrap>
              Charity Block
            </Typography>
            <Actions>
              <Button onClick={() => setIsOpen(true)} variant="contained">
                New Campaign
              </Button>
            </Actions>
          </Toolbar>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
