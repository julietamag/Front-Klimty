import * as React from "react";
import { useState } from "react";
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

//import react tags
import ReactTags from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBooleano } from "../state/adminProduct";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ListAdminProduct({ item }) {
  // estado para confimar si abro el edit
  const [open, setOpen] = useState(false);
  // estados del edit en el modal
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
  const [category, setCategory] = useState(item.category);
  const dispatch = useDispatch()
  const openModal = () => {
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productId = item.id;
    const userId = localStorage.getItem("id");
    if (productId && userId) {
      axios
        .put(`https://klimty.onrender.com/api/product/${userId}/edit/${item.id}`, {
          name,
          price,
          description,
          category,
        }, {withCredentials: true})
        .catch((error) => {
          console.error(error);
        });
    }
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    dispatch(setBooleano())
    setOpen();
  };



  return (
    <>
      {open ? (
        <Modal open={open} openmodal={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFF",
              borderRadius: "8px",
              padding: "45px",
              width: 300,
              height: 350,
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginBottom: "50px", fontWeight: "bold" }}
            >
              Edit Item
            </Typography>
            <div>
              <form onSubmit={(e) => handleSubmit(e, item)}>
                <TextField
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ marginBottom: "10px", width: "100%", display: "block" }}
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
                  sx={{ marginBottom: "10px", width: "100%", display: "block" }}
                />
                <ReactTags
                  inputAttributes={{ style: { width: "100%" } }}
                  value={category}
                  onChange={setCategory}
                  inputProps={{ placeholder: "Add category" }}
                  sx={{ marginBottom: "8px", width: "100%", display: "block" }}
                />
                <Box
                  sx={{ display: "flex", justifyContent: "center", mt: "auto" }}
                >
                  <Button
                    variant="contained"
                    onClick={openModal}
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      mt: "auto",
                      width: "100%",
                      length: "30px",
                      marginRight: "8px",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      mt: "auto",
                      width: "100%",
                      length: "30px",
                      marginLeft: "8px",
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </form>
            </div>
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
              <Img alt="product art photo" src={item?.photo_url} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {item?.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {item.artist?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {item?.id}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Description...
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                  ${item?.price}
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Typography direction="column" component="div">
                {<EditRemoveButtons item={item} openModal={openModal} />}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
