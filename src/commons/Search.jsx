import { TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React from "react";

export const Search = ({ setSearch }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <TextField
        color="secondary"
        id="filled-basic"
        label="Search"
        variant="filled"
        onChange={(e) => handleSearchChange(e)}
      >
        <SearchOutlinedIcon />
      </TextField>
    </>
  );
};
