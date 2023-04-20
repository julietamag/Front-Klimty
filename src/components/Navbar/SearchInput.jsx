import { TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSearch } from "../../state/search";
import { setData } from "../../state/data";
import axios from "axios";

export const SearchInput = () => {
  const navigate = useNavigate();
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  useEffect(() => {
    axios
      .get(`https://klimty.onrender.com/api/search/product?input=${search}`)
      .then((res) => {
        dispatch(setData(res.data));
      })
      .then(() => {
        navigate("/");
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <TextField
        color="secondary"
        id="filled-basic"
        label="Search"
        variant="filled"
        onChange={(e) => handleSearchChange(e)}
      >
        <SearchOutlinedIcon />
      </TextField>
    </>
  );
};
