import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ohsakzptwvzxhpiutoke.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oc2FrenB0d3Z6eGhwaXV0b2tlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNjk4NDIsImV4cCI6MTk4MTg0NTg0Mn0.JIhHS34afnvOGpae6qTFtuzd12Ylugho73IwoUcDQVU"
);
