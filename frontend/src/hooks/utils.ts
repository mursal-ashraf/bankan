import { Database } from 'schema';
import {
  useSupabaseQuery,
  TypedUseSupabaseQuery,
  useSupabaseMutation,
  TypedUseSupabaseMutation,
} from 'supabase-query';

export const useTypedSupabaseQuery: TypedUseSupabaseQuery<Database> =
  useSupabaseQuery;

export const useTypedSupabaseMutation: TypedUseSupabaseMutation<Database> =
  useSupabaseMutation;
