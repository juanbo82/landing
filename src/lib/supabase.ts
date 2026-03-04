import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://odgmkquuhhpartjehsmk.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kZ21rcXV1aGhwYXJ0amVoc21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDE2MzcsImV4cCI6MjA4NjU3NzYzN30.fMqxbExUk1lgucXpex1HOaKpQJaie3JQVxl4kh-bgCk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { SUPABASE_URL };
