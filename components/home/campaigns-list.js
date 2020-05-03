import React from "react";
import {
  Grid,
  CardMedia,
  Button,
  CardActions,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledCardMedia = styled(CardMedia)`
  min-height: 200px;
  paddingtop: 56.25%;
`;

const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
`;

const CampaignsList = ({ campaigns }) => {
  return (
    <Grid container spacing={4}>
      {campaigns.map((campaign) => (
        <Grid item key={campaign.image} xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardMedia
              image={`https://ipfs.io/ipfs/${campaign.imageHash}`}
              title="Image title"
            />
            <StyledCardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {campaign.title}
              </Typography>
              <Typography>
                This is a media card. You can use this section to describe the
                content.
              </Typography>
            </StyledCardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary">
                Donate
              </Button>
              <Button size="small" color="primary">
                View
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default CampaignsList;
