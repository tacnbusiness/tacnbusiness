import React, { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    console.log("User session:", data.session);
  });
}, []);
