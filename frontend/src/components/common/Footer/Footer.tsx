import React from 'react';
import { Button, Grid } from '@mui/material';

export const Footer: React.FC = () => (
  <Grid
    container
    justifyContent="end"
    alignItems="center"
    spacing={2}
    component="footer"
    style={{
      borderTop: 'double',
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      marginTop: '0',
      padding: '0'
    }}
  >
    <Grid item style={{ padding: '0' }}>
      <Button color="inherit">Terms of Use</Button>
    </Grid>
    <Grid item style={{ padding: '0' }}>
      <Button color="inherit">Privacy policy</Button>
    </Grid>
  </Grid>
);
