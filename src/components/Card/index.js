import React from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductCard = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title="name" subheader="artist_id" />
        <CardMedia
          component="img"
          height="194"
          /////////// image={photo_url}
          image="https://collectionapi.metmuseum.org/api/collection/v1/iiif/436535/796067/main-image"
          alt="Paella dish"
        />
        <CardContent>
        <Typography variant="body2" color="text.secondary">
            PRICE
          </Typography>
        <Typography variant="body2" color="text.secondary">
            CATEGORY
          </Typography>
          <Typography variant="body2" color="text.secondary">
            DESCRIPTION 
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <AddShoppingCartOutlinedIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>REVIEW</Typography>
            <Typography paragraph>REVIEW ID</Typography>
            <Typography paragraph>
              REVIEW TEXT.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default ProductCard;
