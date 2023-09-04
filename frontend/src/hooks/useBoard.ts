import { useClient } from '@/contexts/AppContext';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { Database } from 'schema';
import { useSupabaseQuery, TypedUseSupabaseQuery } from 'supabase-query';

const useTypedSupabaseQuery: TypedUseSupabaseQuery<Database> = useSupabaseQuery;

const useBoard = (board_id: string) => {
  return useTypedSupabaseQuery((supabase) =>
    supabase
      .from('board')
      .select()
      .eq('id', board_id)
      .order('version', { ascending: true }),
  );
};

export default useBoard;
