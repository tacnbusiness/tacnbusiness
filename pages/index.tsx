import Link from 'next/link';

const categories = [
  { name: 'Vehicles', icon: '/icons/vehicles.svg', slug: 'vehicles' },
  { name: 'Property', icon: '/icons/property.svg', slug: 'property' },
  { name: 'Phones & Tablets', icon: '/icons/phones.svg', slug: 'phones-tablets' },
  { name: 'Electronics', icon: '/icons/electronics.svg', slug: 'electronics' },
  { name: 'Beauty & Personal Care', icon: '/icons/beauty.svg', slug: 'beauty-personal-care' },
  // add all other categories...
];

const states = [
  'Lagos', 'Oyo', 'Abuja', 'Rivers', 'Anambra' // popular states
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-700">TACNBUSINESS</h1>
        <nav>
          <Link href="/add-business" className="btn-primary mr-4">Add Your Business</Link>
          <Link href="/login" className="btn-outline">Login</Link>
        </nav>
      </header>

      {/* Search */}
      <div className="mb-8">
        <input
          type="search"
          placeholder="Search businesses or categories..."
          className="w-full p-3 border rounded-md"
          // implement live search/filtering later
        />
      </div>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/businesses?category=${cat.slug}`}
              className="flex flex-col items-center p-4 border rounded-md hover:shadow-md transition"
            >
              <img src={cat.icon} alt={cat.name} className="w-12 h-12 mb-2" />
              <span className="text-center text-sm">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Businesses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder cards */}
          <div className="border p-4 rounded shadow">
            <img src="/logos/sample1.png" alt="Business Logo" className="mb-3 h-20 mx-auto" />
            <h3 className="font-bold text-lg">Sample Business 1</h3>
            <p className="text-sm text-gray-600 mb-2">Best electronics store in Lagos.</p>
            <p className="text-xs text-gray-500">Lagos, Ikeja</p>
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noreferrer"
              className="text-green-600 font-semibold"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Browse by Location</h2>
        <div className="flex flex-wrap gap-4">
          {states.map(state => (
            <Link
              key={state}
              href={`/businesses?state=${state}`}
              className="px-4 py-2 border rounded hover:bg-blue-600 hover:text-white transition"
            >
              {state}
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mb-12">
        <Link href="/subscribe" className="btn-primary px-6 py-3">
          Subscribe to Get Featured
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} TACNBUSINESS. All rights reserved.
      </footer>
    </div>
  );
}
