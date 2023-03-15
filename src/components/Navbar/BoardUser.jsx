import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { Link } from "react-router-dom";
import { logOut } from "../../utils/functions";
import { setUid } from "../../state/uid";
import { setPhoto } from "../../state/photo";
import { useDispatch, useSelector } from "react-redux";



export const BoardUser = () => {
  const photo = useSelector((state) => state.photo);
  const uid = useSelector((state) => state.uid);
  const dispath = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const userId = localStorage.getItem("id");

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogOut = () => {
    logOut(auth);
    dispath(setUid(""));
    dispath(
      setPhoto(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
      )
    );
  };

  useEffect(()=>{
    onAuthStateChanged(auth , user=>{
      console.log(user)
    })
  },[])

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src={`${photo}`} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {userId ? (
          <MenuList>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="profile"
            >
              <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
            </Link>
            <Link style={{ textDecoration: "none", color: "#000" }} to="/">
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Link>
          </MenuList>
        ) : (
          <MenuList>
            <Link style={{ textDecoration: "none", color: "#000" }} to="signup">
              <MenuItem onClick={handleCloseUserMenu}>Signup</MenuItem>
            </Link>
            <Link style={{ textDecoration: "none", color: "#000" }} to="login">
              <MenuItem onClick={handleCloseUserMenu}>Login</MenuItem>
            </Link>
          </MenuList>
        )}
      </Menu>
    </Box>
  );
};
