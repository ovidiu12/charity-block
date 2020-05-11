import React from "react";
import Layout from "../../../../components/layout";
import Campaign from "../../../../ethereum/campaign";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import web3 from "../../../../ethereum/web3";
import { Chip, useTheme, Button, Typography } from "@material-ui/core";
import styled from "styled-components";
import { toast } from "react-toastify";
import Link from "next/link";

const ErrorChip = styled(Chip)`
  && {
    background: ${({ theme }) => theme.palette.error.main};
    color: white;
  }
`;

const SuccessChip = styled(Chip)`
  && {
    background: ${({ theme }) => theme.palette.success.main};
    color: white;
`;

const SpendingRequests = (props) => {
  const [userAccounts, setUserAccounts] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    accDonated: false,
    donatedAmounts: null,
    requests: [],
  });
  React.useEffect(() => {
    //get current user addresses
    web3.eth.getAccounts().then((acc) => setUserAccounts(acc));
  }, []);

  React.useEffect(() => {
    props.spendingRequests &&
      props.spendingRequests.map((req) =>
        setState({ ...state, requests: [...state.requests, { ...req }] })
      );
  }, [props]);

  React.useEffect(() => {
    const donated = async (acc) => {
      const campaign = Campaign(props.address);
      const didDonate = await campaign.methods.donors(acc).call();
      if (didDonate) {
        setState({ ...state, accDonated: true });
      } else {
        setState({ ...state, accDonated: false });
      }
    };

    const getDonatedAmount = async (acc) => {
      const campaign = Campaign(props.address);
      const donatedAmounts = await campaign.methods
        .getAmountDonated(acc)
        .call();
      setState({ ...state, donatedAmounts: donatedAmounts });
    };

    if (userAccounts) {
      donated(userAccounts[0]);
      getDonatedAmount(userAccounts[0]);
    }
  }, [userAccounts]);
  const muiTheme = useTheme();
  console.log(state);
  const finalizeRequest = async (data) => {
    const approvalsNeeded =
      props.donorsCount / 2 > 1 ? Math.round(props.donorsCount / 2) : 1;
    if (data.nrOfApprovals < approvalsNeeded) {
      toast.error(
        `You need at least ${approvalsNeeded} approvals to finalize this request.`
      );
      return;
    }
    setLoading(true);
    const campaign = Campaign(props.address);
    try {
      const completeRequest = await campaign.methods
        .completeSpendingRequest(data.id)
        .send({
          from: userAccounts[0],
        });
      const newRequests = state.requests;
      newRequests.map(
        (req, index) =>
          index === data.id && {
            ...req,
            isComplete: true,
          }
      );
      setLoading(false);
      setState({ ...state, requests: newRequests });
      return;
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Oups! There was an error while processing your request.", {
        autoClose: 5000,
      });
    }
  };

  const approveRequest = async (id) => {
    if (!state.accDonated) {
      toast.error(
        `You need to donate to this campaign in order to approve or decline requests.`
      );
      return;
    }
    setLoading(true);
    const campaign = Campaign(props.address);
    const alreadyApproved = await campaign.methods
      .didApprovedRequest(id, userAccounts[0])
      .call();
    if (alreadyApproved) {
      toast.error(`You already approved this request.`);
      setLoading(false);
      return;
    }
    toast.info(
      "We are submitting your request. This will take about a minute.",
      { autoClose: 5000 }
    );
    try {
      await campaign.methods.approveSpendingRequest(id).send({
        from: userAccounts[0],
      });
      toast.success("Request approved!");
      const newRequests = state.requests;
      newRequests.map(
        (req, index) =>
          index === id && {
            ...req,
            nrOfApprovals: parseInt(req.nrOfApprovals++).toString(),
          }
      );
      setState({ ...state, requests: newRequests });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Oups! There was an error while processing your request.", {
        autoClose: 5000,
      });
    }
  };

  return (
    <Layout>
      <Link href={`/home/campaign/${props.address}`} passHref>
        <a style={{ textDecoration: "none" }}>
          <Button color="primary" variant="contained">
            Go Back
          </Button>
        </a>
      </Link>
      {state.donatedAmounts && (
        <>
          <Typography
            style={{ marginTop: "50px" }}
            variant="h5"
            align="left"
            color="textSecondary"
            paragraph
          >
            Your donations for this campaign:
          </Typography>
          <div style={{ marginBottom: "20px" }}>
            {state.donatedAmounts.map((amount) => (
              <span
                style={{
                  marginLeft: "10px",
                  background: muiTheme.palette.primary.main,
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "50px",
                }}
                variant="body1"
              >
                {web3.utils.fromWei(amount, "ether")} ETH{" "}
              </span>
            ))}
          </div>
          <Typography style={{ marginBottom: "50px" }} variant="body1">
            You earned {state.donatedAmounts.length} approvals for each spending
            request.
          </Typography>
        </>
      )}

      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Spending Requests
      </Typography>
      <p>{}</p>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Recipient</TableCell>
              <TableCell align="left">Nr of approvals</TableCell>
              <TableCell align="left">Approvals needed</TableCell>
              <TableCell align="left">Complete</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.requests &&
              state.requests.map((row, index) => {
                const approvalsNeeded =
                  props.donorsCount / 2 > 1
                    ? Math.round(props.donorsCount / 2)
                    : 1;
                return (
                  <TableRow key={`spending-req-${index}`}>
                    <TableCell component="th" scope="row">
                      {web3.utils.fromWei(row.amount)} ETH
                    </TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">
                      <a
                        href={`https://rinkeby.etherscan.io/address/${row.recipient}`}
                      >
                        {row.recipient}
                      </a>
                    </TableCell>
                    <TableCell align="left">{row.nrOfApprovals}</TableCell>
                    <TableCell align="left">{approvalsNeeded}</TableCell>
                    <TableCell align="left">
                      {row.isComplete ? (
                        <SuccessChip theme={muiTheme} label="True" />
                      ) : (
                        <ErrorChip theme={muiTheme} label="False" />
                      )}
                    </TableCell>
                    {row.isComplete ? (
                      <TableCell>None</TableCell>
                    ) : (
                      <TableCell align="left">
                        {userAccounts && userAccounts.includes(props.admin) ? (
                          <Button
                            disabled={loading}
                            style={{ marginRight: "5px" }}
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              finalizeRequest({ id: index, ...row })
                            }
                          >
                            {loading ? "Loading..." : "Finalize Request"}
                          </Button>
                        ) : (
                          <Button
                            disabled={loading}
                            style={{ marginBottom: "5px", marginRight: "5px" }}
                            variant="contained"
                            color="primary"
                            onClick={() => approveRequest(index)}
                          >
                            {loading ? "Loading..." : "Approve"}
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

SpendingRequests.getInitialProps = async (props) => {
  const campaign = Campaign(props.query.id);
  const data = await campaign.methods.getData().call();
  const requests = await Promise.all(
    Array.from({ length: data[3] }).map((element, index) => {
      return campaign.methods.spendingRequests(index).call();
    })
  );

  return {
    goal: data[0],
    minDonation: data[1],
    balance: data[2],
    requestsCount: data[3],
    spendingRequests: requests,
    donorsCount: data[4],
    admin: data[5],
    address: props.query.id,
    title: data[6],
    description: data[7],
    imageHash: data[8],
  };
};

export default SpendingRequests;
