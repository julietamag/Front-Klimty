import {
  Box,
  Button,
  Divider,
  List,
  SwipeableDrawer,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { dropCart } from "../../state/cart";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer("right", true)}
      onKeyDown={toggleDrawer("right", false)}
    >
      <List>
        {cart?.map((product) => (
          <ImageListItem sx={{ width: 250, height: 180 }} key={product.img}>
            <img
              src={`${product.img}?w=248&fit=crop&auto=format`}
              srcSet={`${product.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={product.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={product.title}
              //subtitle={item.artist}
              actionIcon={
              
                <IconButton
                onClick={() => {
                  console.log(product)
                  dispatch(dropCart(product))
                }}
                  aria-label={`info about ${product.title}`}
                >
                  <DeleteOutlineOutlinedIcon
                  color="secondary"
               
                />
                </IconButton>
              }
            >
              <Button>
               
              </Button>
            </ImageListItemBar>
         
          </ImageListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={"right"}>
          <Button color="secondary" onClick={toggleDrawer("right", true)}>
            {"right"}
          </Button>
          <SwipeableDrawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
};
