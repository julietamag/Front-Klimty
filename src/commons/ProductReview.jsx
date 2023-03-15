import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useParams } from "react-router";

const ProductReview = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/review/product/${id}`)
      .then((data) => {
        if (data.data) setReviews(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(reviews);

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {reviews.map((item, i) => {
          return (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography component="legend"></Typography>
                    <Rating name="read-only" value={item.star} readOnly />{" "}
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.user.fullName}
                    </Typography>
                  </React.Fragment>
                }
              />
              <ListItemText>
                <Typography>{item.description}</Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default ProductReview;
