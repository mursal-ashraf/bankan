import { useMemo } from 'react';
import AppRouter from './Router';
import { AppContext } from './contexts';
import getSupabaseClient from './utils/supabase';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  const client = useMemo(() => getSupabaseClient(), []);

  return (
    <AppContext.Provider value={{ client }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppRouter />
      </LocalizationProvider>
    </AppContext.Provider>
  );
}

export default App;
