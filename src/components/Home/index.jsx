import React, { useState } from "react";

import { ProductGrid } from "../ProductGrid";
import { Grid, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";

export const Home = () => {
  const data = useSelector((state) => state.data);
  return (
    <Grid
      container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid
        item
        xs={12}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {data.length > 0 ? <ProductGrid /> : <LinearProgress />}
      </Grid>
    </Grid>
  );
};
