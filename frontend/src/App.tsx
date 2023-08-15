import { useMemo } from 'react';
import AppRouter from './Router';
import { AppContext } from './contexts';
import getSupabaseClient from './utils/supabase';
import NavBar from './common/navbar';

function App() {
  const client = useMemo(() => getSupabaseClient(), []);

  return (
    <AppContext.Provider value={{ client }}>
      <NavBar navItems={['Dashboard']} />
      <></>
      <AppRouter />
    </AppContext.Provider>
  );
}

export default App;
