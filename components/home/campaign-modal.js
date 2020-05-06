import React from "react";
import styled from "styled-components";
import Modal from "../modal";
import { TextField, Button, Typography, FormLabel } from "@material-ui/core";
import { CampaignModalContext } from "./campaign-context";
import ipfs from "../../ethereum/ipfs";
import MainContract from "../../ethereum";
import { toast } from "react-toastify";
import web3 from "../../ethereum/web3";

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 8px;
  }
`;

const StyledFormLabel = styled(FormLabel)`
  && {
    display: block;
    margin-bottom: 8px;
  }
`;

const SubmitBtn = styled(Button)`
  && {
    padding: 13.5px 14px;
  }
`;

const ModalHeading = styled(Typography)`
  && {
    margin-bottom: 30px;
  }
`;

const CampaignModal = () => {
  const { isOpen, setIsOpen } = React.useContext(CampaignModalContext);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [state, setState] = React.useState({
    title: "",
    description: "",
    minDonation: 0,
    goal: 0,
    file: null,
  });

  React.useEffect(() => {
    return () => {
      setLoading(false);
      setSuccess(false);
      setError(false);
    };
  });

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setState({ ...state, file: Buffer(reader.result) });
    };
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    if (parseFloat(state.goal) < 1 || parseFloat(state.minDonation) < 0.0001) {
      toast.error("Minimum donation or goal are too low.");
      return;
    }
    try {
      ipfs.files.add(state.file, async (error, result) => {
        if (error) {
          throw error;
        } else {
          const ipfsImageHash = result[0].hash;

          const accounts = await web3.eth.getAccounts();
          await MainContract.methods
            .createCampaign(
              web3.utils.toWei(state.minDonation),
              web3.utils.toWei(state.goal),
              state.title,
              state.description,
              ipfsImageHash
            )
            .send({
              from: accounts[0],
              gas: "2000000",
            });
          setIsOpen(false);
          setLoading(false);
          setSuccess(true);
          toast.success("Campaign published successfully!");
        }
      });
    } catch (err) {
      console.log("ERR ", err);
      setLoading(false);
      setError(err.message);
      setState({
        title: "",
        description: "",
        minDonation: 0,
        goal: 0,
        file: null,
      });
    }
  };

  if (loading && !success && !error) {
    toast.info(
      "We are publishing your campaign. This will take about a minute.",
      { autoClose: 5000 }
    );
  }
  return (
    <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
      <ModalHeading variant="h5" align="center" color="textSecondary" paragraph>
        Create a new Campaign
      </ModalHeading>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <StyledTextField
          label="Title"
          value={state["title"]}
          name="title"
          onChange={onChange}
          fullWidth
          variant="outlined"
        />
        <StyledTextField
          label="Description"
          value={state["description"]}
          name="description"
          onChange={onChange}
          fullWidth
          variant="outlined"
          multiline
          rows={3}
        />
        <StyledTextField
          label="Minimum Donation (in Ether)"
          value={state["minDonation"]}
          name="minDonation"
          onChange={onChange}
          fullWidth
          variant="outlined"
          type="number"
        />
        {parseFloat(state.minDonation) < 0.0001 && (
          <div
            style={{
              color: "red",
              marginBottom: "8px",
              fontSize: "12px",
              paddingLeft: "14px",
            }}
          >
            Should be greater than 0.00001 Ether
          </div>
        )}
        <StyledTextField
          label="Goal (in Ether)"
          value={state["goal"]}
          name="goal"
          onChange={onChange}
          fullWidth
          variant="outlined"
          type="number"
        />
        {parseFloat(state.minDonation) < 0.0001 && (
          <div
            style={{
              color: "red",
              marginBottom: "8px",
              fontSize: "12px",
              paddingLeft: "14px",
            }}
          >
            Should be greater than 1 Ether
          </div>
        )}
        <StyledFormLabel>Cover Image</StyledFormLabel>
        <StyledTextField
          onChange={onChangeFile}
          fullWidth
          variant="outlined"
          type="file"
        />
        <SubmitBtn
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          {loading ? "Loading..." : "Create Campaign"}
        </SubmitBtn>
        {error && (
          <FormLabel error={true}>
            Oups! There was an error while processing your request.
          </FormLabel>
        )}
      </form>
    </Modal>
  );
};

export default CampaignModal;
