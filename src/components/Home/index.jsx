import React from "react";

import { ProductGrid } from "../ProductGrid";
import { Grid } from "@mui/material";

export const Home = () => {
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
        <ProductGrid />
      </Grid>
    </Grid>
  );
};
