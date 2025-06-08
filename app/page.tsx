// app/page.tsx
export default function HomePage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-6">
        Welcome to tacnbusiness.com
      </h1>
      <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
        Connect with trusted businesses owned by members of The Apostolic Church Nigeria.
        Discover services, promote your own business, and grow within the faith community.
      </p>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <a
          href="/list-business"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          List Your Business
        </a>
        <a
          href="/browse"
          className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-50 transition"
        >
          Browse Businesses
        </a>
      </div>
    </section>
  );
}
