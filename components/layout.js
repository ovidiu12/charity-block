import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Avatar,
  IconButton,
} from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import styled from "styled-components";
import { CampaignModalContext } from "./home/campaign-context";
import Link from "next/link";
import AvatarImg from "../public/avatar.jpg";
import useMetamask from "./hooks/metamask";

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
    margin-right: 30px;
    border-color: white;
    color: white;
  }
`;

const Layout = ({ children }) => {
  const { setIsOpen } = React.useContext(CampaignModalContext);
  const { metamaskEnabled } = useMetamask();
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
            {metamaskEnabled && (
              <Actions>
                <NewCampaign onClick={() => setIsOpen(true)} variant="outlined">
                  New Campaign
                </NewCampaign>
                <Link href="/home/profile" passhref>
                  <a style={{ textDecoration: "none" }}>
                    <IconButton style={{ padding: 0 }}>
                      <Avatar alt="User Avatar" src={AvatarImg} />
                    </IconButton>
                  </a>
                </Link>
              </Actions>
            )}
          </Toolbar>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
