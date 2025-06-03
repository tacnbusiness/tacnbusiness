// pages/businesses/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function BusinessDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [business, setBusiness] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBusiness = async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Failed to fetch business:', error.message);
      } else {
        setBusiness(data);
      }
    };

    fetchBusiness();
  }, [id]);

  if (!business) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Directory
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        {/* IMAGE / LOGO */}
        {business.image_url && (
          <img
            src={business.image_url}
            alt={`${business.business_name} logo`}
            className="w-full max-h-64 object-contain mb-4 rounded-lg"
          />
        )}

        {/* BUSINESS NAME + DESCRIPTION */}
        <h1 className="text-2xl font-bold mb-2">{business.business_name}</h1>
        <p className="text-gray-700 mb-4">{business.description}</p>

        {/* CONTACT + INFO */}
        <div className="space-y-2 text-gray-600 text-sm">
          <p><strong>Address:</strong> {business.address}, {business.city}, {business.state}</p>
          <p><strong>Assembly:</strong> {business.assembly}</p>
          <p><strong>District:</strong> {business.district}</p>
          <p><strong>Area:</strong> {business.area}</p>
          <p><strong>Tag:</strong> {business.tag}</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex flex-wrap gap-3">
          {business.phone && (
            <>
              <a
                href={`tel:${business.phone}`}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                📞 Call
              </a>
              <a
                href={`https://wa.me/${business.phone.replace(/^0/, '234')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                💬 WhatsApp
              </a>
            </>
          )}

          {business.email && (
            <a
              href={`mailto:${business.email}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              📧 Email
            </a>
          )}

          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              🌐 Visit Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
