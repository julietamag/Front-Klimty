import { Masonry } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDetail } from "../../state/detail";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const ProductGrid = () => {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/product")
      .then((data) => setItemData(data.data))
      .then((res) => dispatch(setDetail(itemData[0])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleProductClick(e, item) {
    dispatch(setDetail(item));
    navigate(`/product/${item.id}`)
  }

  return (
    <>
      <Masonry columns={4} spacing={5}>
        {itemData?.map((item, index) => (
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
    </>
  );
};
