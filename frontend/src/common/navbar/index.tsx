import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useIsLoggedIn } from '@/hooks';
import { AuthModal } from '@/components/common/AuthModal/AuthModal';
import { useLogOut } from '@/hooks/useLogOut';

const NavBar = () => {
  const isLoggedIn = useIsLoggedIn();
  const [performLogOut, logOutResult] = useLogOut();

  const [authModalOpen, setAuthModalOpen] = useState(false); // added this state

  const handleLogOut = async (event: React.MouseEvent) => {
    event.preventDefault(); // prevent default anchor behavior
    await performLogOut();
    window.location.href = '/'; // redirect to home after logout
  };

  return (
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
      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onSubmit={() => {
            window.location.reload();
          }}
        />
      )}
    </div>
  );
};

export default NavBar;
