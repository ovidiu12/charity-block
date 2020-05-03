import React from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import Close from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

const CloseBtn = styled(IconButton)`
  && {
    position: absolute;
    right: 20px;
    top: 20px;
  }
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

ReactModal.setAppElement("#__next");

const Modal = ({ isOpen, closeModal, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <CloseBtn onClick={closeModal} aria-label="delete">
        <Close />
      </CloseBtn>
      {children}
    </ReactModal>
  );
};

export default Modal;
