import { Masonry } from "@mui/lab";
import { Box, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setData } from "../../state/data";
import { useNavigate } from "react-router-dom";
import { NumPag } from "./NumPag";

export const ProductGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.data);
  const menu = useSelector((state) => state.menu);
  const page = useSelector((state) => state.page);
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if (menu === "general") {
      axios
        .get(`https://klimty.onrender.com/api/product`, {withCredentials: true})
        .then((data) => dispatch(setData(data.data)));
    }
    setLoader(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleProductClick(e, item) {
    navigate(`/product/${item.id}`);
  }

  return (
    <Box sx={{ margin: 2, width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column' }}>
      { loader ? (
        <LinearProgress />
      ):(
        <>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
        {data?.slice((page - 1) * 10, page * 10).map((item, index) => (
          <div key={index}>
            <img
              onClick={(e) => handleProductClick(e, item)}
              src={`${item.photo_url}`}
              srcSet={`${item.photo_url}`}
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
        </>
      )

}
    </Box>
  );
};
