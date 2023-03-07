import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Logo } from "./Logo";
import { BoardUser } from "./BoardUser";
import { Menus } from "./Menus";


export const Navbar = () => {
  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Menus/>
          <BoardUser />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
