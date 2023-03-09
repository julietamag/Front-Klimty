import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "../ProductCard";
import { ProductGrid } from "../ProductGrid";

export const Home = () => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <ProductCard />
      </Grid>
      <Grid item xs={8}>
        <ProductGrid />
      </Grid>
    </Grid>
  );
};
