import {
  Box,
  Button,
  Divider,
  List,
  SwipeableDrawer,
  ImageListItem,
  ImageListItemBar,
  Typography,
  IconButton,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { dropCart } from "../../state/cart";
import axios from "axios";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const uid = useSelector((state) => state.uid);
  const [userId, setUserid] = useState("");
  // borrar
  const [count, setCount] = React.useState(1);
  //
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

  // // GET USER ID
  // axios.get(`http://localhost:3001/api/user/uid/${uid2}`)
  // .then(user => setUserid(user.data.id))
  // .catch(err => console.error(err))

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer("right", true)}
      onKeyDown={toggleDrawer("right", false)}
    >
      <List>
        {cart?.map((product) => (
          <ImageListItem
            sx={{ width: 400, height: 350 }}
            key={product.photo_url}
          >
            <img
              src={`${product.photo_url}?w=248&fit=crop&auto=format`}
              srcSet={`${product.photo_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={product.title}
              loading="lazy"
            />
            <ImageListItemBar
            sx={{display: 'flex', flexDirection:'column' , justifyContent: 'center', alignContent: 'center'}}
              title={`${product.name}   ${product.price}$`}
              actionIcon={
                <>
                <div style={{display: 'flex', flexDirection: 'row'}}>

                 <IconButton
                 color="secondary"
                 size="sm"
                 variant="outlined"
                 onClick={() => setCount((c) => c - 1)}
               >
                 <Remove />
               </IconButton>
               <Typography fontWeight="md" color="secondary" >
                 {count}
               </Typography>
               <IconButton
                 color="secondary"
                 size="sm"
                 variant="outlined"
                 onClick={() => setCount((c) => c + 1)}
                 >
                 <Add />
               </IconButton>
                 </div>
                <IconButton
                  onClick={() => {
                    dispatch(dropCart(product));
                  }}
                  aria-label={`info about ${product.name}`}
                >
                  <DeleteOutlineOutlinedIcon color="secondary" />
                </IconButton>
                 </>
              }
            >
            </ImageListItemBar>
          </ImageListItem>
        ))}
    
      </List>
      <Divider />

    <List sx={{ display: "flex", justifyContent:"space-evenly", alignContent:"center"}}>
      <Button sx={{ fontSize: '1.5rem' }} >{'CHECKOUT'}</Button>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "2rem" }}>{123456789}</Typography>
    </List>
    </Box>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={"right"}>
          <Button color="secondary" onClick={toggleDrawer("right", true)}>
            {<ShoppingBasketIcon />}
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
