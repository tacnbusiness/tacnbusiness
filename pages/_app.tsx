import { AppProps } from 'next/app';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { supabase } from '../lib/supabaseClient';

export default function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
