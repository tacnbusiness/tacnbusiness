// pages/businesses.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Business {
  id: number;
  business_name: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  state: string;
  assembly: string;
  district: string;
  area: string;
  tag: string;
  image_url?: string;
}

export default function Businesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    area: '',
    district: '',
    assembly: '',
    tag: '',
  });

  const [uniqueFilters, setUniqueFilters] = useState({
    states: [] as string[],
    cities: [] as string[],
    areas: [] as string[],
    districts: [] as string[],
    assemblies: [] as string[],
    tags: [] as string[],
  });

  useEffect(() => {
    const loadBusinesses = async () => {
      const { data, error } = await supabase.from('businesses').select('*');
      if (error) {
        console.error('Failed to load businesses:', error.message);
        return;
      }

      setBusinesses(data || []);
      setFilteredBusinesses(data || []);

      const states = new Set<string>();
      const cities = new Set<string>();
      const areas = new Set<string>();
      const districts = new Set<string>();
      const assemblies = new Set<string>();
      const tags = new Set<string>();

      data?.forEach((b) => {
        if (b.state) states.add(b.state);
        if (b.city) cities.add(b.city);
        if (b.area) areas.add(b.area);
        if (b.district) districts.add(b.district);
        if (b.assembly) assemblies.add(b.assembly);
        if (b.tag) tags.add(b.tag);
      });

      setUniqueFilters({
        states: Array.from(states),
        cities: Array.from(cities),
        areas: Array.from(areas),
        districts: Array.from(districts),
        assemblies: Array.from(assemblies),
        tags: Array.from(tags),
      });
    };

    loadBusinesses();
  }, []);

  useEffect(() => {
    const filtered = businesses
      .filter((b) => {
        const matchesFilters =
          (!filters.state || b.state === filters.state) &&
          (!filters.city || b.city === filters.city) &&
          (!filters.area || b.area === filters.area) &&
          (!filters.district || b.district === filters.district) &&
          (!filters.assembly || b.assembly === filters.assembly) &&
          (!filters.tag || b.tag === filters.tag);

        const matchesSearch =
          b.business_name.toLowerCase().includes(search.toLowerCase()) ||
          b.description.toLowerCase().includes(search.toLowerCase());

        return matchesFilters && matchesSearch;
      })
      .sort((a, b) => a.business_name.localeCompare(b.business_name));

    setFilteredBusinesses(filtered);
  }, [filters, search, businesses]);

  const handleSearchClick = () => {
    setSearch(searchInput.trim());
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Business Directory</h1>

      <div className="flex flex-col sm:flex-row mb-4 gap-2">
        <input
          type="text"
          placeholder="Search businesses..."
          className="flex-grow p-2 border rounded-md"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearchClick();
          }}
        />
        <button
          onClick={handleSearchClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(uniqueFilters).map(([key, values]) => (
          <select
            key={key}
            className="p-2 rounded-md border w-full"
            value={filters[key as keyof typeof filters]}
            onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
          >
            <option value="">{`Filter by ${key}`}</option>
            {values.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        ))}
      </div>

      {filteredBusinesses.length === 0 ? (
        <p>No businesses found.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
            >
              {b.image_url && (
                <img
                  src={b.image_url}
                  alt={`${b.business_name} image`}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{b.business_name}</h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-3">{b.description}</p>
                <p className="text-sm text-gray-500">{b.address}, {b.city}, {b.state}</p>
                <p className="text-sm text-gray-500">Area: {b.area}, District: {b.district}, Assembly: {b.assembly}</p>
                <div className="mt-2 flex flex-col space-y-1 text-sm">
                  <a href={`tel:${b.phone}`} className="text-blue-600 hover:underline">📞 {b.phone}</a>
                  <a href={`mailto:${b.email}`} className="text-blue-600 hover:underline">📧 {b.email}</a>
                  {b.website && (
                    <a href={b.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      🌐 Visit Website
                    </a>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-2">Tag: {b.tag}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
