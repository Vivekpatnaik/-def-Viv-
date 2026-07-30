/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';

// Clean environment check to avoid exposing or hardcoding any secrets
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Unified Database query runner supporting offline testing and local mock transitions.
 * This guarantees we don't block development when direct database integrations are being updated.
 */
export class DbClient {
  public static async query<T>(
    tableName: string,
    operation: 'select' | 'insert' | 'update' | 'delete',
    payload?: any,
    filters?: Record<string, any>
  ): Promise<T[]> {
    const isMock = supabaseUrl.includes('placeholder-project');

    if (isMock) {
      console.log(`[DbClient] Simulating database operation '${operation}' on table '${tableName}'`);
      return (payload ? [payload] : []) as T[];
    }

    const queryBuilder = supabase.from(tableName);

    if (operation === 'select') {
      let run = queryBuilder.select('*');
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          run = run.eq(key, value);
        }
      }
      const { data, error } = await run;
      if (error) throw error;
      return data as T[];
    }

    if (operation === 'insert') {
      const { data, error } = await queryBuilder.insert(payload).select();
      if (error) throw error;
      return data as T[];
    }

    if (operation === 'update') {
      let run = queryBuilder.update(payload);
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          run = run.eq(key, value);
        }
      }
      const { data, error } = await run.select();
      if (error) throw error;
      return data as T[];
    }

    if (operation === 'delete') {
      let run = queryBuilder.delete();
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          run = run.eq(key, value);
        }
      }
      const { data, error } = await run.select();
      if (error) throw error;
      return data as T[];
    }

    return [];
  }
}
