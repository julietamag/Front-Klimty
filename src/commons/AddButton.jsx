import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton({ openModal }) {
  return (
    <Box>
      <Fab color="primary" aria-label="add" >
        <AddIcon
          onClick={() => {
            openModal();
          }}
        />
      </Fab>
    </Box>
  );
}