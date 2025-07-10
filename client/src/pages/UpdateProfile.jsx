



import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Save, Loader2, X, ImagePlus, Info, Plus } from 'lucide-react';
import BaseUrl from "../utils/basUrl";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UpdateProfile() {
  const [form, setForm] = useState({
    bio: '',
    gender: '',
    birthday: '',
    interests: ['', ''],
    photos: [],
  });

  const [existingPhotos, setExistingPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const getToken = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
      if (tokenCookie) token = tokenCookie.split('=')[1];
    }
    return token;
  };

  const fetchProfile = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${BaseUrl}api/profile`, {
        headers: {
          'Content-Type': 'application/json',
          token
        }
      });
      const data = await res.json();
      const user = data?.Data;
      if (user) {
        setForm({
          bio: user.bio || '',
          gender: user.gender || '',
          birthday: user.birthday?.split("T")[0] || '',
          interests: user.interests && user.interests.length > 0 ? user.interests : ['', ''],
          photos: [],
        });
        setExistingPhotos(user.profileImages || []);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleInterestChange = (index, value) => {
    const newInterests = [...form.interests];
    newInterests[index] = value;
    setForm(prev => ({ ...prev, interests: newInterests }));
  };

  const handleAddInterest = () => {
    setForm(prev => ({
      ...prev,
      interests: [...prev.interests, '']
    }));
  };

  const handleRemoveInterest = (index) => {
    if (form.interests.length > 2) { // Keep minimum 2 interests
      const newInterests = [...form.interests];
      newInterests.splice(index, 1);
      setForm(prev => ({ ...prev, interests: newInterests }));
    }
  };

  const handleAddMorePhoto = (e) => {
    const newFiles = Array.from(e.target.files);

    // ✅ Filter allowed image types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const validFiles = newFiles.filter(file => allowedTypes.includes(file.type));

    if (validFiles.length !== newFiles.length) {
    toast.error("Only JPG, JPEG, and PNG files are allowed.");
    return;
  }
  if (form.photos.length + existingPhotos.length + validFiles.length > 5) {
    toast.error("You can upload a maximum of 5 photos.");
    return;
  }

    setForm(prev => ({
      ...prev,
      photos: [...prev.photos, ...validFiles]
    }));
  };

  const handleRemoveNewPhoto = (index) => {
    const updatedPhotos = [...form.photos];
    updatedPhotos.splice(index, 1);
    setForm(prev => ({ ...prev, photos: updatedPhotos }));
  };

  // New function to remove existing photos
  const handleRemoveExistingPhoto = (index) => {
    const updatedExistingPhotos = [...existingPhotos];
    updatedExistingPhotos.splice(index, 1);
    setExistingPhotos(updatedExistingPhotos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("bio", form.bio);
      formData.append("gender", form.gender);
      formData.append("birthday", form.birthday);
      form.interests.forEach((interest) => formData.append("interests", interest));
      
     
     existingPhotos.forEach((photoUrl) => {
  const filename = photoUrl.split('/').pop(); // Extract only the filename
  formData.append("keptImages", filename);
});

      // Send new photos
      form.photos.forEach((photo) => formData.append("profileImages", photo));

      const res = await axios.post(
        `${BaseUrl}api/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: getToken(),
          },
        }
      );

      if (res.data.status) {
        setSuccess(true);
        await fetchProfile(); // Refresh profile to get updated image URLs
        setForm((prev) => ({ ...prev, photos: [] }));
      } else {
        setError("Update failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    } finally {
      setSaving(false);
    }
  };

  console.log("existing photos:", existingPhotos);
  console.log("new photos:", form.photos);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50">
        <Loader2 className="animate-spin text-violet-600 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-gradient-to-br from-pink-100 via-fuchsia-100 to-indigo-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-3xl space-y-6 border border-gray-200"
        encType="multipart/form-data"
      >
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">
          Update Your Profile ✨
        </h2>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-xl flex items-center justify-between">
            <p>{error}</p>
            <button type="button" onClick={() => setError(null)}><X className="w-5 h-5" /></button>
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-100 text-green-700 rounded-xl text-center font-medium">
            Profile updated successfully!
          </div>
        )}

        <div>
          <label className="flex items-center gap-2 text-violet-800 font-semibold mb-2">
            <Info className="w-5 h-5" /> Bio
          </label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about yourself..."
            className="w-full p-4 rounded-xl border border-pink-300 bg-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <input
          type="text"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          placeholder="Gender"
          className="w-full p-4 rounded-xl border border-fuchsia-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
        />
        <input
          type="date"
          name="birthday"
          value={form.birthday}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border border-violet-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-pink-800 font-semibold">Interests/Hobbies</label>
            <button
              type="button"
              onClick={handleAddInterest}
              className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform"
            >
              <Plus className="w-4 h-4" />
              Add Interest
            </button>
          </div>
          <div className="space-y-3">
            {form.interests.map((interest, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={interest}
                  onChange={(e) => handleInterestChange(index, e.target.value)}
                  placeholder={`Interest ${index + 1}`}
                  className="flex-1 p-4 rounded-xl border border-pink-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                {form.interests.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(index)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-fuchsia-800 font-semibold mb-2">
            <ImagePlus className="w-5 h-5" /> Profile Photos ({existingPhotos.length + form.photos.length}/9)
          </label>
          <div className="grid grid-cols-3 gap-4">
            {existingPhotos.map((url, index) => (
              <div key={`existing-${index}`} className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-300 group">
                <img src={url} alt={`existing-${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingPhoto(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  Existing
                </div>
              </div>
            ))}

            {form.photos.map((photo, index) => (
              <div key={`new-${index}`} className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-300 group">
                <img src={URL.createObjectURL(photo)} alt={`new-${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveNewPhoto(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  New
                </div>
              </div>
            ))}

            {form.photos.length + existingPhotos.length < 9 && (
              <div className="relative w-full aspect-square rounded-xl border-2 border-dashed border-fuchsia-400 flex items-center justify-center hover:border-fuchsia-600 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAddMorePhoto}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <ImagePlus className="w-8 h-8 text-fuchsia-600 mx-auto mb-2" />
                  <span className="text-fuchsia-600 text-sm font-medium">Add Photo</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full flex items-center justify-center py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
            saving
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 hover:scale-105 shadow-xl hover:shadow-2xl'
          }`}
        >
          {saving ? <Loader2 className="animate-spin w-6 h-6 mr-2" /> : <Save className="w-5 h-5 mr-2" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
      <ToastContainer
      position="top-center"
      autoClose={3000}
      toastClassName="backdrop-blur-sm"
      theme="light"
    />
    </div>
  );
}

export default UpdateProfile;