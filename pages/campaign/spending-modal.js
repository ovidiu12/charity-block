import React from "react";
import styled from "styled-components";
import Modal from "../../components/modal";
import { TextField, Button, Typography, FormLabel } from "@material-ui/core";
import Campaign from "../../ethereum/campaign";
import { toast } from "react-toastify";
import web3 from "../../ethereum/web3";

const StyledTextField = styled(TextField)`
  && {
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

const SpendingModal = ({ isOpen, setIsOpen, campaign }) => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [address, setAddress] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [state, setState] = React.useState({
    amount: 0,
    description: "",
    recipient: "",
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
      await campaign.methods
        .createSpendingRequest(
          web3.utils.toWei(state.amount),
          state.description,
          state.recipient
        )
        .send({
          from: accounts[0],
          gas: "2000000",
        });
      toast.success("Spending request created!");
    } catch (err) {
      console.log("ERR ", err);
      setLoading(false);
      setError(err.message);
      setState({
        amount: 0,
        description: "",
        recipient: "",
      });
    }
  };

  if (loading && !success && !error) {
    toast.info("We are creating your request. This will take about a minute.", {
      autoClose: 5000,
    });
  }
  return (
    <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
      <ModalHeading variant="h5" align="center" color="textSecondary" paragraph>
        Create a new spending request{" "}
      </ModalHeading>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <StyledTextField
          label="Amount (in Ether)"
          value={state["amount"]}
          name="amount"
          onChange={onChange}
          fullWidth
          variant="outlined"
          type="number"
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
          label="Recipient"
          value={state["recipient"]}
          name="recipient"
          onChange={onChange}
          fullWidth
          variant="outlined"
          multiline
        />
        <SubmitBtn
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          {loading ? "Loading..." : "Create"}
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

export default SpendingModal;
