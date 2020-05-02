import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
  Button,
} from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import styled from "styled-components";
import Modal from "react-modal";

const Navbar = styled(AppBar)`
  && {
    margin-bottom: 50px;
  }
`;

const Actions = styled.div`
  margin-left: auto;
  display: flex;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Layout = ({ children }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <CssBaseline />
      <Navbar color="primary" position="relative">
        <Container>
          <Toolbar>
            <WhatshotIcon />
            <Typography variant="h6" color="inherit" noWrap>
              Charity Block
            </Typography>
            <Actions>
              <Button onClick={openModal} variant="contained">
                New Campaign
              </Button>
            </Actions>
          </Toolbar>
        </Container>
      </Navbar>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
