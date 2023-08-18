import { useMemo } from 'react';
import AppRouter from './Router';
import { AppContext } from './contexts';
import getSupabaseClient from './utils/supabase';
import NavBar from './common/navbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  const client = useMemo(() => getSupabaseClient(), []);

  return (
    <AppContext.Provider value={{ client }}>
      <NavBar />
      <></>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppRouter />
      </LocalizationProvider>
    </AppContext.Provider>
  );
}

export default App;
