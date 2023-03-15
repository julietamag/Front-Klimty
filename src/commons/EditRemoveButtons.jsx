import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EditRemoveButtons({ item, handleClick, openModal }) {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 }, margin: "auto auto auto 0" }}>
      <Fab color="secondary" aria-label="edit">
        <EditIcon onClick={() => openModal()} />
      </Fab>
      <Fab color="error">
        <DeleteIcon onClick={() => handleClick(item)} />
      </Fab>
    </Box>
  );
}
