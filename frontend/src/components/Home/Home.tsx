import React from 'react';
import { useNavigate } from 'react-router-dom';
import boardImage from './Boards.jpeg';
import { Button, Grid, List, ListItem, Stack, Typography } from '@mui/material';
import { Routes } from '@/Router/AppRouter';
import ComponentContainer from '../common/ComponentContainer';
import { useIsLoggedIn } from '@/hooks';

const InnerHome: React.FC = () => {
  const isLoggedIn = useIsLoggedIn();
  const navigateTo = useNavigate();

  return (
    <Stack spacing={2}>
      <Grid container style={{ backgroundColor: '#FFCD29' }}>
        <Grid xs={4} item>
          <div className="m-4">
            <Typography variant="h5">Team Management</Typography>
            <Typography paragraph>
              Use Bankan to track, manage, complete, and bring tasks together
              like the pieces of a puzzle, and make your team's projects a
              cohesive success every time.
            </Typography>
          </div>

          {!isLoggedIn && (
            <>
              <Button
                style={{ backgroundColor: 'white' }}
                onClick={() => navigateTo(Routes.Login)}
              >
                Login
              </Button>
              <Button
                style={{ backgroundColor: 'white' }}
                onClick={() => navigateTo(Routes.Signup)}
              >
                Signup
              </Button>
            </>
          )}
        </Grid>
        <Grid xs={8} item>
          <img src={boardImage} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={4} item>
          <div className="m-4">
            <Typography variant="h5">About Bankan</Typography>
            <Typography>
              Bankan is a versatile tool for managing work that allows teams to
              generate ideas, work together on projects, arrange workflows, and
              monitor progress using a visual, efficient, and satisfying
              approach.
            </Typography>
          </div>
        </Grid>
        <Grid xs={4} item>
          <Typography variant="h5">Contact Us</Typography>
          <List>
            <ListItem>Email: Monash@monash.monash.edu</ListItem>
            <ListItem>Phone Number: 0987654321</ListItem>
          </List>
        </Grid>
        <Grid xs={4} item>
          <Typography variant="h5">Support</Typography>
          <List>
            <ListItem>What this policy covers</ListItem>
            <ListItem>Help Center</ListItem>
            <ListItem>Hire a Professional</ListItem>
            <ListItem>Report Abuse</ListItem>
            <ListItem>System Status</ListItem>
          </List>
        </Grid>
      </Grid>
    </Stack>
  );
};

export const Home: React.FC = () => {
  return (
    <ComponentContainer>
      <InnerHome />
    </ComponentContainer>
  );
};
