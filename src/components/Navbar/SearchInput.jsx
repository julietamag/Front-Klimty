import { TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React from "react";

export const SearchInput = () => {
  return (
    <TextField
      color="secondary"
      id="filled-basic"
      label="Search"
      variant="filled"
    >
      <SearchOutlinedIcon />
    </TextField>
  );
};
