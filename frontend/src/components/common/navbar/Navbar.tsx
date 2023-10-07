import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useIsLoggedIn, useUser } from '@/hooks';
import { useLogOut } from '@/hooks/useLogOut';
import { Routes } from '@/Router/AppRouter';
import AuthErrorAlert from '@/components/common/AuthDialog/AuthErrorAlert';
import { FormControlLabel, FormGroup } from '@mui/material';
import { DarkModeContext } from './DarkModeContext';
import MaterialUISwitch from './MaterialUISwitch ';

export const NavBar: React.FC = () => {
  const darkModeContext = React.useContext(DarkModeContext);
  if (!darkModeContext) {
    console.error("NavBar must be used within a DarkModeProvider");
    return null;
  }
  const { darkMode, toggleDarkMode } = darkModeContext;
  const isLoggedIn = useIsLoggedIn();
  const [performLogOut, { error }] = useLogOut();
  const navigateTo = useNavigate();
  const user = useUser();

  const handleLogOut = async (event: React.MouseEvent) => {
    event.preventDefault(); // prevent default anchor behavior
    await performLogOut();
    !error && navigateTo(Routes.Home);
  };
  const profileRoute = user?.id
    ? `${Routes.Profile.replace(':user_id', user.id)}`
    : Routes.Profile;


  return (
    <>
      <AppBar position="sticky">
        <Toolbar style={{ backgroundColor: darkMode ? '#273c75' : 'var(--custom-blue)' }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            KanBan
          </Typography>
          <FormGroup>
            <FormControlLabel
              label={darkMode ? 'Dark Mode' : 'Light Mode'}
              control={
                <MaterialUISwitch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
              }
            />
          </FormGroup>
          {/* If the user is logged in, show dashboard, board, and profile links */}
          {isLoggedIn && (
            <>
              <a href={Routes.Home} style={{ textDecoration: 'none' }}>
                <Button color="inherit">Home</Button>
              </a>
              <a href={Routes.Dashboard} style={{ textDecoration: 'none' }}>
                <Button color="inherit">Dashboard</Button>
              </a>
              <a href={profileRoute} style={{ textDecoration: 'none' }}>
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
