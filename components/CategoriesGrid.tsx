import Link from 'next/link';
import { categories } from '../data/categories';

export default function CategoriesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">Browse Business Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <span className="text-4xl mb-2">{category.emoji}</span>
            <span className="text-center text-sm font-medium text-gray-700">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
