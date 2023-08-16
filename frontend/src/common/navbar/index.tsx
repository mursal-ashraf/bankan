import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useIsLoggedIn } from '@/hooks';
import { useLogOut } from '@/hooks/useLogOut';
import { Routes } from '@/Router/AppRouter';
import AuthErrorAlert from '@/components/common/AuthDialog/AuthErrorAlert';

const NavBar = () => {
  const isLoggedIn = useIsLoggedIn();
  const [performLogOut, { error }] = useLogOut();
  const navigateTo = useNavigate();

  const handleLogOut = async (event: React.MouseEvent) => {
    event.preventDefault(); // prevent default anchor behavior
    await performLogOut();
    !error && window.location.reload();
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            KanBan
          </Typography>

          {/* If the user is logged in, show dashboard, board, and profile links */}
          {isLoggedIn && (
            <>
              <a href={Routes.Home} style={{ textDecoration: 'none' }}>
                <Button color="inherit">Home</Button>
              </a>
              <a href={Routes.Dashboard} style={{ textDecoration: 'none' }}>
                <Button color="inherit">Dashboard</Button>
              </a>
              <a href={Routes.Board} style={{ textDecoration: 'none' }}>
                <Button color="inherit">Board</Button>
              </a>
              <a href={Routes.Profile} style={{ textDecoration: 'none' }}>
                <Button color="inherit">Profile</Button>
              </a>
              <Button color="inherit" onClick={handleLogOut}>
                Log Out
              </Button>
            </>
          )}

          {/* If the user is not logged in, show the login/signup button */}
          {!isLoggedIn && (
            <>
              <Button color="inherit" onClick={() => navigateTo(Routes.Login)}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigateTo(Routes.Signup)}>
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {!!error && <AuthErrorAlert {...{ error }} />}
    </>
  );
};

export default NavBar;
