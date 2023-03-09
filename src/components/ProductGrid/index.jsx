import { Label } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDetail } from "../../state/detail";
import axios from "axios";

export const ProductGrid = () => {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/product")
      .then(
        (data) => setItemData(data.data)
      )
      .then(res => dispatch(setDetail(itemData[0])));
  }, []);

  return (
    <Masonry columns={4} spacing={2}>
      {itemData?.map((item, index) => (
        <div key={index}>
          <Label>{index + 1}</Label>
          <img
            onClick={() => dispatch(setDetail(item))}
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
  );
};