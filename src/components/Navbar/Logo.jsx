import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <>
  <Link style={{ textDecoration: "none" ,color:"#fff" }} to="/" >
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        KLIMTY
      </Typography>
      </Link>
      <Link  style={{ textDecoration: "none",color:"#fff" }}  to="/">
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        KLIMTY
      </Typography>
      </Link>
    </>
  );
};
