import { useMemo } from 'react';
import AppRouter from './Router';
import { AppContext } from './contexts';
import getSupabaseClient from './utils/supabase';

function App() {
  const client = useMemo(() => getSupabaseClient(), []);

  return (
    <AppContext.Provider value={{ client }}>
      <AppRouter />
    </AppContext.Provider>
  );
}

export default App;
