import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { Link } from "react-router-dom";
import { logOut } from "../../utils/functions";
import { setUid } from "../../state/uid";
import { useDispatch,useSelector } from "react-redux";

export const BoardUser = () => {
  const uid = useSelector(state=>state.uid)
  const dispath = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [photo, setPhoto] = React.useState("");

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogOut = () => {
    logOut(auth);
    dispath(setUid(""));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setPhoto(user.photoURL);
    });
  }, []);

  return (
    <>
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
          {uid ? (
            <>
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to="profile"
              >
                <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
              </Link>
              <Link style={{ textDecoration: "none", color: "#000" }} to="/">
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to="signup"
              >
                <MenuItem onClick={handleCloseUserMenu}>Signup</MenuItem>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to="login"
              >
                <MenuItem onClick={handleCloseUserMenu}>Login</MenuItem>
              </Link>
            </>
          )}
        </Menu>
      </Box>
    </>
  );
};
