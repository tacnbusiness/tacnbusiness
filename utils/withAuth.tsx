import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

type WithAuthProps = {
  // Any props your wrapped component might have
};

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
      const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          router.replace('/login');
        } else {
          setUser(session.user);
          setLoading(false);
        }
      };

      checkUser();
    }, [router]);

    if (loading) {
      return <p>Loading...</p>;
    }

    // Pass down user and any other props
    return <WrappedComponent {...props} user={user} />;
  };

  return ComponentWithAuth;
}
