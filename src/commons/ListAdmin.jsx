import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import EditRemoveButtons from "./EditRemoveButtons";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ListAdmin({ item, handleClick }) {
  // estado para confimar si abro el edit
  const [open, setOpen] = useState(false);
  // estados del edit en el modal
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
  const [category, setCategory] = useState(item.category);

  const openModal = () => {
    setOpen(!open);
  };

  const editProducts = (updatedItem, productId) => {
    const userId = localStorage.getItem("id");
    axios
      .put(`http://localhost:3001/api/product/${userId}/edit/${productId}`, {
        updatedItem,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productId = item.id;
    const updatedItem = { ...item, name, price, description, category };
    editProducts(updatedItem, productId);
    openModal();
  };

  return (
    <>
      {open ? (
        <Modal open={open} openModal={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "-10%",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFF",
              borderRadius: "4px",
              padding: "16px",
              width: 600,
              height: 700,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "50px" }}>
              Edit Item
            </Typography>

            <form onSubmit={(e) => handleSubmit(e, item)}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: "8px", width: "100%", display: "block" }}
              />
              <TextField
                label="Price"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={{ marginBottom: "8px", width: "100%", display: "block" }}
              />
              <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ marginBottom: "8px", width: "100%", display: "block" }}
              />
              <TextField
                label="Category"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ marginBottom: "8px", width: "100%", display: "block" }}
              />
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: "auto" }}
              >
                <Button variant="contained" onClick={openModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      ) : (
        ""
      )}
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          borderRadius: 0,
          borderBottom: "2px solid #f4f0e8",
          maxWidth: 750,
          flexGrow: 1,
          minHeight: 200,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 270, height: 200 }}>
              <Img alt="product art photo" src={item.photo_url} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {item.artist.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {item.id}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Description...
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                  ${item.price}
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Typography direction="column" component="div">
                {
                  <EditRemoveButtons
                    item={item}
                    handleClick={handleClick}
                    openModal={openModal}
                  />
                }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
