<<<<<<< Updated upstream
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
=======
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useIsLoggedIn } from '@/hooks';
import { AuthModal } from '@/components/common/AuthModal/AuthModal';
import { useLogOut } from '@/hooks/useLogOut';
>>>>>>> Stashed changes


const NavBar = () => {
  const isLoggedIn = useIsLoggedIn();

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

<<<<<<< Updated upstream
const DrawerElement = ({ handleDrawerToggle, navItems }: DrawerProps) => (
  <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
    <Typography variant="h6" sx={{ my: 2 }}>
      MUI
    </Typography>
    <Divider />
    <List>
      {navItems.map((item: string) => (
        <ListItem key={item} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

const NavBar = ({ navItems }: NavbarProps) => {
  // const window = new Window();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
=======
  const [performLogOut, logOutResult] = useLogOut();

  const handleLogOut = async (event: React.MouseEvent) => {
    event.preventDefault(); // prevent default anchor behavior
    await performLogOut();
    window.location.href = '/'; // redirect to home after logout
>>>>>>> Stashed changes
  };

  return (
<<<<<<< Updated upstream
    <div style={{ position: "initial" }}>
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
=======
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            KanBan
          </Typography>
          
          {/* If the user is logged in, show dashboard, board, and profile links */}
          {isLoggedIn && (
            <>
              <a href="/" style={{ textDecoration: 'none' }}>
                <Button color="inherit">
                  Home
                </Button>
              </a>
              <a href="/dashboard" style={{ textDecoration: 'none' }}>
                <Button color="inherit">
                  Dashboard
                </Button>
              </a>
              <a href="/board" style={{ textDecoration: 'none' }}>
                <Button color="inherit">
                  Board
                </Button>
              </a>
              <a href="/profile" style={{ textDecoration: 'none' }}>
                <Button color="inherit">
                  Profile
                </Button>
              </a>
              <Button color="inherit" onClick={handleLogOut}>
                  Log Out
>>>>>>> Stashed changes
              </Button>
              {logOutResult.error && (
                <Typography variant="body2" color="error">
                {logOutResult.error.message}
                </Typography>
              )}
            </>
          )}

          {/* If the user is not logged in, show the login/signup button */}
          {!isLoggedIn && (
            <Button color="inherit" onClick={() => setAuthModalOpen(true)}>
              Login/Signup
            </Button>
          )}
        </Toolbar>
      </AppBar>
<<<<<<< Updated upstream
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerElement {...{ handleDrawerToggle, navItems }} />
        </Drawer>
      </Box>
=======

      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onSubmit={() => {
            window.location.reload();
          }}
        />
      )}
>>>>>>> Stashed changes
    </div>
  );
};


export default NavBar;
