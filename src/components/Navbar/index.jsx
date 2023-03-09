import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Logo } from "./Logo";
import { BoardUser } from "./BoardUser";
import { Menus } from "./Menus";
import { SearchInput } from "./SearchInput";
import { Cart } from "./Cart";



export const Navbar = () => {
  
  return (
    <AppBar position="sticky" sx={{mb:2}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Menus/>
          <SearchInput/>
          <BoardUser />
         <Cart/>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
