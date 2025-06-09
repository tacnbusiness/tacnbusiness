import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

const categoryMeta: Record<string, { title: string; description: string }> = {
  fashion: {
    title: 'Fashion',
    description: 'Explore clothing, tailoring, and accessories from TACN members.',
  },
  'food-drinks': {
    title: 'Food & Drinks',
    description: 'Discover local foods, catering, and drinks services.',
  },
  automobile: {
    title: 'Automobile',
    description: 'Car repairs, sales, and services you can trust.',
  },
  electronics: {
    title: 'Electronics',
    description: 'Gadgets, repairs, and accessories from verified sellers.',
  },
  'health-beauty': {
    title: 'Health & Beauty',
    description: 'Health products, skincare, and wellness services.',
  },
  education: {
    title: 'Education',
    description: 'Tutors, schools, and educational services.',
  },
  'real-estate': {
    title: 'Real Estate',
    description: 'Rent, buy or lease properties from reliable agents.',
  },
  events: {
    title: 'Events',
    description: 'Event planners, MCs, rentals, and more.',
  },
  services: {
    title: 'Repairs & Services',
    description: 'Skilled services including plumbing, carpentry, and repairs.',
  },
  technology: {
    title: 'Technology',
    description: 'Web, software, and tech solutions built by believers.',
  },
};

export default function CategoryPage({ params }: Props) {
  const category = categoryMeta[params.slug];

  if (!category) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
        {category.title}
      </h1>
      <p className="text-gray-600 mb-8">{category.description}</p>

      {/* Placeholder for future business listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 border rounded shadow text-center">
          <p className="text-gray-500">No businesses listed yet for this category.</p>
        </div>
      </div>
    </main>
  );
}
