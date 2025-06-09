'use client';

import Link from 'next/link';
import {
  Shirt,
  Utensils,
  Car,
  Tv,
  HeartPulse,
  BookOpen,
  Home,
  Calendar,
  Wrench,
  Laptop
} from 'lucide-react';

const categories = [
  { name: 'Fashion', icon: <Shirt className="w-8 h-8 text-blue-600" />, slug: 'fashion' },
  { name: 'Food & Drinks', icon: <Utensils className="w-8 h-8 text-blue-600" />, slug: 'food-drinks' },
  { name: 'Automobile', icon: <Car className="w-8 h-8 text-blue-600" />, slug: 'automobile' },
  { name: 'Electronics', icon: <Tv className="w-8 h-8 text-blue-600" />, slug: 'electronics' },
  { name: 'Health & Beauty', icon: <HeartPulse className="w-8 h-8 text-blue-600" />, slug: 'health-beauty' },
  { name: 'Education', icon: <BookOpen className="w-8 h-8 text-blue-600" />, slug: 'education' },
  { name: 'Real Estate', icon: <Home className="w-8 h-8 text-blue-600" />, slug: 'real-estate' },
  { name: 'Events', icon: <Calendar className="w-8 h-8 text-blue-600" />, slug: 'events' },
  { name: 'Repairs & Services', icon: <Wrench className="w-8 h-8 text-blue-600" />, slug: 'services' },
  { name: 'Technology', icon: <Laptop className="w-8 h-8 text-blue-600" />, slug: 'technology' },
];

export default function CategoriesGrid() {
  return (
    <section className="mt-16 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Browse by Category</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/categories/${category.slug}`}
            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition p-4 flex flex-col items-center justify-center text-center hover:bg-blue-50"
          >
            {category.icon}
            <span className="mt-2 text-gray-700 text-sm sm:text-base font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
