import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { InputLabel, MenuItem, Select } from "@mui/material";

const ReviewFormAdmin = ({ cart }) => {
  const userId = localStorage.getItem("id");
  const [state, setState] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:3001/api/user/${userId}/status/${cart.id}`, {
        state,
      })
      .then(() => {
        toast.success("State changed successfully");
      })
      .catch(() => toast.error("State could not be changed"));
  };

  function handleChange(e) {
    setState(e.target.value);
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <InputLabel id="demo-simple-select-label">
          State: {cart.state}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="state"
          value={state}
          onChange={handleChange}
          sx={{ width: "10rem" }}
        >
          <MenuItem value={"pending"}>pending</MenuItem>
          <MenuItem value={"completed"}>completed</MenuItem>
          <MenuItem value={"rejected"}>rejected</MenuItem>
        </Select>
        <Box sx={{ "& button": { m: 1 } }}>
          <Button size="small" type="submit">
            Done!
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ReviewFormAdmin;
