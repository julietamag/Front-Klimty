import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import axios from "axios";
//Redux
import { useSelector } from "react-redux";
import { MenuItem, Typography } from "@mui/material";

const Dashboard = ({ menulist }) => {
  const [artists, setArtists] = useState([]);
  const menu = useSelector((state) => state.menu);

  //MUI desplegable
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //useEffect busqueda de artistas

  useEffect(() => {
    axios.get(`http://localhost:3001/api/${menulist}`).then((data) => {
      const artistsBack = data.data;
      const artists = artistsBack.map((artist) => artist.title);
      setArtists(artists);
      console.log("esto llega del back", artists);
    });
  }, [menu]);
  console.log("ACA LLEGO", menulist);

  return (
    <>
      <Button
        color="secondary"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Typography color="secondary">{menulist}</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {artists.map((artist, index) => {
          return <MenuItem key={index}>{artist}</MenuItem>;
        })}
      </Menu>
    </>
  );
};

export default Dashboard;
