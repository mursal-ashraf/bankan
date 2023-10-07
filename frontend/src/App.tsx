import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SupabaseQueryProvider } from 'supabase-query';
import AppRouter from './Router';
import { AppContext } from './contexts';
import getSupabaseClient from './utils/supabase';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DarkModeContext } from './components/common/navbar/DarkModeContext';
import { DarkModeProvider } from './components/common/navbar/DarkModeProvider';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);
  const supabaseClient = useMemo(() => getSupabaseClient(), []);
  const queryClient = new QueryClient();

  return (

    <AppContext.Provider value={{ client: supabaseClient }}>
      <SupabaseQueryProvider client={supabaseClient}>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DarkModeProvider>
              <AppRouter />
            </DarkModeProvider>
          </LocalizationProvider>
        </QueryClientProvider>
      </SupabaseQueryProvider>
    </AppContext.Provider>
  );
}

export default App;
