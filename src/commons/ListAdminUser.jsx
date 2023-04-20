import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EditRemoveButtons from "./EditRemoveButtons";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBooleano } from "../state/adminProduct";
import { ButtonBase, FormGroup, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ListAdminUser({ item }) {
  // estado para confimar si abro el edit
  const [open, setOpen] = useState(false);
  // estados del edit en el modal
  const [isAdmin, setIsAdmin] = useState(item.isAdmin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openModal = () => {
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");

    if (userId) {
      axios
        .put(`https://klimty.onrender.com/api/user/${userId}/edit/${item.id}`, {
          isAdmin,
        }, {withCredentials: true})
        .catch((error) => {
          console.error(error);
        });
    }
    dispatch(setBooleano());
    setOpen();
  };

  function handleClickUser() {
    navigate(`/admin/user/history/${item.id}`);
  }

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
              width: "70%",
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginBottom: "50px", fontWeight: "bold" }}
            >
              Edit Item
            </Typography>

            <div style={{ width: "100%" }}>
              <form onSubmit={(e) => handleSubmit(e, item)}>
                <FormGroup>
                  <Typography>{`IS ADMIN: ${isAdmin}`}</Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={isAdmin}
                    label="isAdmin"
                    onChange={(e) => setIsAdmin(e.target.value)}
                  >
                    <MenuItem value={false}>FALSE</MenuItem>
                    <MenuItem value={true}>TRUE</MenuItem>
                  </Select>
                </FormGroup>

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
              <Img
                alt="userPhoto"
                src={
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  {item.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {item.id}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  {item.email}
                </Typography>
              </Grid>
            </Grid>

            <Grid item sx={{display:'flex', alignItems:'center', justifyContent:'space-between', flexDirection:'column'}}>
              <Typography direction="column" component="div">
                {<EditRemoveButtons item={item} openModal={openModal} />}
              </Typography>
              <Button variant="contained" onClick={handleClickUser}>
                HISTORY
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
