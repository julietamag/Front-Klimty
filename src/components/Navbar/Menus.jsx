// import {
//   Box,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import React from "react";
// import Dashboard from "./Dashboard";

// //Redux
// import { useSelector, useDispatch } from "react-redux";
// import { setMenu } from "../../state/menu";

// export const Menus = () => {
//   const pages = ["categories", "artists"];
//   const menu = useSelector((state) => state.menu);
//   const dispatch = useDispatch();

//   const handlerMenu = (menulist) => {
//     dispatch(setMenu({ menulist }));
//     console.log("ESTE ESTADO CAMBIO", menu);
//   };

//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   return (
//     <>
//       <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="menu-appbar"
//           aria-haspopup="true"
//           onClick={handleOpenNavMenu}
//           color="inherit"
//         >
//           <MenuIcon />
//         </IconButton>

//         <Menu
//           id="menu-appbar"
//           anchorEl={anchorElNav}
//           anchorOrigin={{
//             vertical: "bottom",
//             horizontal: "left",
//           }}
//           keepMounted
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "left",
//           }}
//           open={Boolean(anchorElNav)}
//           onClose={handleCloseNavMenu}
//           sx={{
//             display: { xs: "block", md: "none" },
//           }}
//         >
//           {pages.map((menulist) => (
//             <MenuItem key={menulist} onClick={() => handlerMenu(menulist)}>
//               <Dashboard menulist={menulist} />
//             </MenuItem>
//           ))}
//         </Menu>
//       </Box>

//       <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//         {pages.map((menulist) => (
//           <Button
//             key={menulist}
//             onClick={() => {
//               handleCloseNavMenu();
//               handlerMenu(menulist);
//             }}
//             sx={{ my: 2, color: "white", display: "block" }}
//           >
//             <MenuItem key={menulist}>
//               <Typography>
//                 <Dashboard menulist={menulist} />
//               </Typography>
//             </MenuItem>
//           </Button>
//         ))}
//       </Box>
//     </>
//   );
// };
