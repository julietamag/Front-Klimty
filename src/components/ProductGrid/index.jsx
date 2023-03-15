import { Masonry } from "@mui/lab";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setData } from "../../state/data";
import { useNavigate, useLocation } from "react-router-dom";
import { NumPag } from "./NumPag";

export const ProductGrid = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.data);
  const menu = useSelector((state) => state.menu);
  const page = useSelector((state) => state.page);
  const type = useSelector((state) => state.type);

  useEffect(() => {
    if (menu === "general") {
      axios
        .get("http://localhost:3001/api/product")
        .then((data) => dispatch(setData(data.data)));
    } else if (menu === "artist") {
      // axios
      //   .get(`http://localhost:3001/api/search/artworks/${type}`)
      //   .then((res) => {
      //     dispatch(setData(res.data));
      //   });
    } else {
      // axios
      //   .get(`http://localhost:3001/api/search/products/${type}`)
      //   .then((res) => {
      //     dispatch(setData(res.data));
      //   });
    }
  }, []);

  function handleProductClick(e, item) {
    navigate(`/product/${item.id}`);
  }

  return (
    <Box sx={{ margin: 2, width: "100%" }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
        {data?.slice((page - 1) * 10, page * 10).map((item, index) => (
          <div key={index}>
            <img
              onClick={(e) => handleProductClick(e, item)}
              src={`${item.photo_url}?w=162&auto=format`}
              srcSet={`${item.photo_url}?w=162&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: "block",
                width: "100%",
              }}
            />
          </div>
        ))}
      </Masonry>

      <NumPag />
    </Box>
  );
};
