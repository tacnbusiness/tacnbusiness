'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function AddBusiness() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    business_name: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const categories = [
    'Vehicles',
    'Property',
    'Phones and Tablets',
    'Electronics',
    'Home appliances',
    'Beauty & Personal Care',
    'Fashion',
    'Leisure & Activities',
    'Services',
    'Jobs',
    'Babies & Kids',
    'Pets',
    'Food & Agriculture',
    'Commercial Equipments',
    'Repair & Construction',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    // ✅ Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert('You must be logged in to submit a business.');
      setUploading(false);
      return;
    }

    let imageUrl = '';

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('business-logos')
        .upload(fileName, imageFile);

      if (uploadError) {
        alert('Image upload failed.');
        setUploading(false);
        return;
      }

      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/business-logos/${fileName}`;
    }

    // 👇 Add user_id reference and image_url
    const { error } = await supabase.from('businesses').insert([
      {
        ...formData,
        image_url: imageUrl,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert('Business submission failed.');
    } else {
      alert('Business submitted successfully!');
      router.push('/businesses');
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Your Business</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <input name="business_name" placeholder="Business Name" className="input" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" className="input" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" className="input" onChange={handleChange} required />
        <input name="email" placeholder="Email" className="input" onChange={handleChange} />
        <input name="website" placeholder="Website" className="input" onChange={handleChange} />
        <input name="address" placeholder="Address" className="input" onChange={handleChange} required />
        <input name="city" placeholder="City" className="input" onChange={handleChange} required />
        <input name="state" placeholder="State" className="input" onChange={handleChange} required />

        {/* Category Dropdown */}
        <select name="category" className="input" onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Logo / Business Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="input" />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={uploading}
        >
          {uploading ? 'Submitting...' : 'Submit Business'}
        </button>
      </form>
    </div>
  );
}
