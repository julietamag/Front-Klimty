import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { Link } from "react-router-dom";
import { logOut } from "../../utils/functions";
import { setUid } from "../../state/uid";
import { setPhoto } from "../../state/photo";
import { useDispatch, useSelector } from "react-redux";
import LoginIcon from '@mui/icons-material/Login';

export const BoardUser = () => {
  const photo = useSelector((state) => state.photo);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("id"))

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogOut = () => {
    logOut(auth);
    dispatch(setUid(""));
    dispatch(
      setPhoto(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
      )
      );
      setName('')
  };

  useEffect(() => {
    axios.get(`https://klimty.onrender.com/api/user/${userId}`, {withCredentials: true})
    .then((data) => setIsAdmin(data.data.isAdmin))
    onAuthStateChanged(auth, (user) => {
      dispatch(setPhoto(user.photoURL))
      if (user.providerData[0].providerId === "password") {
        axios.get(`https://klimty.onrender.com/api/user/${userId}`, {withCredentials: true}).then((data) => {
          setName(data.data.fullName);
        });
      
      } else if (user.providerData[0].providerId === "google.com") {
        setName(user.displayName);
      }
    });

  }, [dispatch, userId]);

  useEffect(()=> {
     setUserId(localStorage.getItem("id"))
  }, [dispatch, name])

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open User Settings">
        <IconButton
          onClick={handleOpenUserMenu}
          color="secondary"
          sx={{ p: 0 }}
        >
          {userId ? (
<>
            <Avatar alt={`${name}`} src={`${photo}`} />
            <Typography sx={{ ml: 2 }}>{`${name?.split(" ")[0]}`}</Typography>
</>
          ) : (
            <Button variant="contained" color="secondary"><LoginIcon /></Button>
          )}
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
            {isAdmin ? (<Link style={{ textDecoration: "none", color: "#000" }} to="admin">
              <MenuItem>admin</MenuItem>
            </Link>) : null}
          </MenuList>
        ) : (
          <MenuList>
            <Link style={{ textDecoration: "none", color: "#000" }} to="signup">
              <MenuItem onClick={handleCloseUserMenu}>Register</MenuItem>
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
