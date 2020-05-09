import React from "react";
import styled from "styled-components";
import Modal from "../modal";
import { TextField, Button, Typography, FormLabel } from "@material-ui/core";
import Campaign from "../../ethereum/campaign";
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

const DonateModal = ({ isOpen, setIsOpen, campaign }) => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [address, setAddress] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [state, setState] = React.useState({
    amount: 0,
  });

  React.useEffect(() => {
    setAddress(campaign.address);
    return () => {
      setLoading(false);
      setSuccess(false);
      setError(false);
    };
  }, []);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    const campaign = address && Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.donateToCampaign().send({
        from: accounts[0],
        value: web3.utils.toWei(state.amount, "ether"),
        gas: "2000000",
      });
      toast.success("Thanks for your donation!");
      setIsOpen(false);
    } catch (err) {
      console.log("ERR ", err);
      setLoading(false);
      setError(err.message);
      setState({
        amount: 0,
      });
    }
  };

  if (loading && !success && !error) {
    toast.info("We are sending your donation. This will take about a minute.", {
      autoClose: 5000,
    });
  }
  return (
    <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
      <ModalHeading variant="h5" align="center" color="textSecondary" paragraph>
        Support{" "}
        <em>
          <b>{campaign.title}</b>
        </em>
      </ModalHeading>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <StyledTextField
          label="Donation (in Ether)"
          value={state["amount"]}
          name="amount"
          onChange={onChange}
          fullWidth
          variant="outlined"
          type="number"
        />
        {parseFloat(state.amount) >= campaign.minDonation && (
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
        <SubmitBtn
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          {loading ? "Loading..." : "Donate"}
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

export default DonateModal;
