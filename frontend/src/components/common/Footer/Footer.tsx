import React from 'react';
import { Button, Grid } from '@mui/material';

export const Footer: React.FC = () => (
  <Grid
    container
    justifyContent="end"
    alignItems="center"
    spacing={2}
    component="footer"
    style={{ borderTop: 'double', maxWidth: '100%' }}
  >
    <Grid item>
      <Button color="inherit">Terms of Use</Button>
    </Grid>
    <Grid item>
      <Button color="inherit">Privacy policy</Button>
    </Grid>
  </Grid>
);
