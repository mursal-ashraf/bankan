import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SupabaseQueryProvider } from 'supabase-query';
import AppRouter from './Router';
import { AppContext } from './contexts';
import getSupabaseClient from './utils/supabase';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  const supabaseClient = useMemo(() => getSupabaseClient(), []);
  const queryClient = new QueryClient();

  return (
    <AppContext.Provider value={{ client: supabaseClient }}>
      <SupabaseQueryProvider client={supabaseClient}>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppRouter />
          </LocalizationProvider>
        </QueryClientProvider>
      </SupabaseQueryProvider>
    </AppContext.Provider>
  );
}

export default App;
