import React from 'react';
import { SupabaseClient } from '@supabase/supabase-js';

interface AppContext {
  client: SupabaseClient | null;
}

export default React.createContext<AppContext>({ client: null });
