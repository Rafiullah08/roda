
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';

// Configure Supabase client for better session persistence
import { supabase } from './integrations/supabase/client';

// Ensure Supabase client is properly configured for session persistence
console.log("Supabase client initialized with session persistence");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
