// pages/profile.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';

interface Profile {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  area: string;
  district: string;
  assembly: string;
  tag: string;
  avatar_url: string | null;
}

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    area: '',
    district: '',
    assembly: '',
    tag: '',
  });

  useEffect(() => {
    const getProfile = async () => {
      const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null;
      if (!user) {
        router.push('/login'); // redirect to login if no user
        return;
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        alert('Error loading profile');
        setLoading(false);
        return;
      }

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          phone: data.phone || '',
          email: data.email || '',
          area: data.area || '',
          district: data.district || '',
          assembly: data.assembly || '',
          tag: data.tag || '',
        });
      }
      setLoading(false);
    };

    getProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const uploadAvatar = async (userId: string) => {
    if (!avatarFile) return null;

    setUploading(true);

    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(fileName, avatarFile, { upsert: true });

    if (uploadError) {
      alert('Failed to upload avatar');
      setUploading(false);
      return null;
    }

    setUploading(false);

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${fileName}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null;
    if (!user) {
      alert('No user logged in');
      return;
    }

    let avatar_url = profile?.avatar_url || null;
    if (avatarFile) {
      const uploadedUrl = await uploadAvatar(user.id);
      if (!uploadedUrl) return;
      avatar_url = uploadedUrl;
    }

    const updates = {
      id: user.id,
      ...formData,
      avatar_url,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert('Failed to update profile');
      return;
    }

    alert('Profile updated successfully');
    router.push('/businesses'); // or wherever you want to redirect after update
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        {profile?.avatar_url && (
          <img
            src={profile.avatar_url}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
          />
        )}

        <div>
          <label className="block mb-1 font-semibold">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Area</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Assembly</label>
          <input
            type="text"
            name="assembly"
            value={formData.assembly}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Tag (e.g., LAWNA)</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-70"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
