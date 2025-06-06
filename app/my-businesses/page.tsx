import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { withAuth } from '../utils/withAuth';
import Link from 'next/link';

function MyBusinesses() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', session.user.id);

      if (error) {
        setError('Failed to load businesses');
      } else {
        setBusinesses(data);
      }

      setLoading(false);
    };

    fetchBusinesses();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this business?')) return;

    const { error } = await supabase.from('businesses').delete().eq('id', id);

    if (error) {
      alert('Failed to delete business');
    } else {
      setBusinesses((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow">
        <h1 className="text-2xl font-bold mb-4">My Businesses</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : businesses.length === 0 ? (
          <p>No businesses added yet.</p>
        ) : (
          <ul className="space-y-4">
            {businesses.map((biz) => (
              <li
                key={biz.id}
                className="border p-4 rounded-md flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold text-lg">{biz.business_name}</h2>
                  <p className="text-sm text-gray-600">{biz.category}</p>
                </div>
                <div className="space-x-2">
                  <Link
                    href={`/edit-business/${biz.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(biz.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default withAuth(MyBusinesses);
