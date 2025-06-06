import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { withAuth } from '../../../utils/withAuth';

function EditBusiness() {
  const router = useRouter();
  const { id } = router.query;

  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load business data on mount
  useEffect(() => {
    const fetchBusiness = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Failed to fetch business');
      } else if (data) {
        setBusinessName(data.business_name);
        setDescription(data.description || '');
        setCategory(data.category || '');
      }

      setLoading(false);
    };

    fetchBusiness();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    const { error } = await supabase.from('businesses').update({
      business_name: businessName,
      description,
      category
    }).eq('id', id);

    if (error) {
      setError('Failed to update business');
    } else {
      router.push('/my-businesses');
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow">
        <h1 className="text-2xl font-bold mb-4">Edit Business</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <label className="block mb-2 font-medium">Business Name</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-4"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />

            <label className="block mb-2 font-medium">Category</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-4"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <label className="block mb-2 font-medium">Description</label>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              onClick={handleSave}
              disabled={saving}
              className={`w-full py-2 rounded text-white ${
                saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default withAuth(EditBusiness);
