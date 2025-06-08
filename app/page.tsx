import CategoriesGrid from '../components/CategoriesGrid';

export default function HomePage() {
  return (
    <section className="text-center py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Discover Trusted Businesses Near You
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Connect with reliable services by members of The Apostolic Church Nigeria.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4">
          <input
            type="text"
            placeholder="What are you looking for? (e.g. tailor, printer, plumber)"
            className="w-full sm:w-96 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md">
            Search
          </button>
        </div>
      </div>
      <CategoriesGrid />
    </section>
  );
}
