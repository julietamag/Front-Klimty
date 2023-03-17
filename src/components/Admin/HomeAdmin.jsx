import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

export const HomeAdmin = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: '3rem'
      }}
    >
      <Typography variant="h1">Hey Admin!</Typography>
      <Typography variant="h4">What do you want to do?</Typography>
      <Box>
        <Button sx={{margin: '1rem'}} variant="contained">
          <Link variant="contained" to="/admin/user">
            <Typography color='secondary' >User</Typography>
          </Link>
        </Button>
        <Button sx={{margin: '1rem'}} variant="contained">
          <Link variant="contained" to="/admin/artist">
            <Typography color='secondary'>Artist</Typography>
          </Link>
        </Button>
        <Button sx={{margin: '1rem'}} variant="contained">
          <Link variant="contained" to="/admin/product">
            <Typography color='secondary'>Product</Typography>
          </Link>
        </Button>
      </Box>
    </Box>
  );
};
