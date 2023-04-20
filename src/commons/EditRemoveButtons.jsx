import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBooleano } from "../state/adminProduct";

export default function EditRemoveButtons({ item, openModal }) {
  const dispatch = useDispatch();

  // funcion para destruir el item en el back
  function handleClick() {
    const userId = localStorage.getItem("id");
    if (item.price) {
      return axios
        .delete(`https://klimty.onrender.com/api/product/${userId}/${item.id}`)
        .then((res) => {
          dispatch(setBooleano());
        });
    } else if (item.uid) {
      return axios
        .delete(`https://klimty.onrender.com/api/user/${userId}/delete/${item.id}`)
        .then((res) => {
          dispatch(setBooleano());
        });
    } else if (item.title) {
      return axios
        .delete(`https://klimty.onrender.com/api/artist/${userId}/delete/${item.id}`)
        .then((res) => {
          dispatch(setBooleano());
        });
    }
  }

  return (
    <Box sx={{ "& > :not(style)": { m: 1 }, margin: "auto auto auto 0" }}>
      <Fab color="secondary" aria-label="edit">
        <EditIcon onClick={() => openModal()} />
      </Fab>
      {!item.uid && (
        <Fab color="error">
          <DeleteIcon onClick={handleClick} />
        </Fab>
      )}
    </Box>
  );
}
