

"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Heart,
  User,
  Calendar,
  MapPin,
  Sparkles,
  Camera,
  Upload,
  CheckCircle,
} from "lucide-react";
import BaseUrl from "../utils/basUrl";

const AddProfileDetails = () => {
  const [form, setForm] = useState({
    bio: "",
    gender: "male",
    birthday: "",
    latitude: "",
    longitude: "",
    interests: [],
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [locationLoading, setLocationLoading] = useState(true);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // Get token using the same logic as your sidebar
  const getToken = () => {
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (cookieToken) return cookieToken;
    return localStorage.getItem("token");
  };

  const token = getToken();

  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const latitude = pos.coords.latitude.toString();
          const longitude = pos.coords.longitude.toString();

          setForm((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const addressString = data?.display_name;
            setAddress(addressString);

            toast.success("📍 Location detected successfully!", {
              position: "top-right",
              autoClose: 3000,
            });
          } catch (error) {
            console.error("Error fetching address:", error);
            toast.warn("⚠️ Location found but address lookup failed.", {
              position: "top-right",
              autoClose: 4000,
            });
          }

          setLocationLoading(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLocationLoading(false);
          toast.error("📍 Location access denied. Please enable location.", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      );
    } else {
      setLocationLoading(false);
      toast.error("📍 Geolocation not supported by your browser", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestsChange = (e) => {
    const value = e.target.value;
    const interestList = value
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i);
    setForm((prev) => ({ ...prev, interests: interestList }));
  };

  const handleImageChange = (e) => {
    const files = [...e.target.files];

    // Allowed image types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      toast.error("❌ Only JPG, JPEG, and PNG formats are allowed", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (validFiles.length > 6) {
      toast.warning("📸 Maximum 6 images allowed", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setImages(validFiles);

    // Create preview URLs
    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);

    toast.success(`📸 ${validFiles.length} image(s) selected`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);

    setImages(newImages);
    setImagePreview(newPreviews);

    toast.info("🗑️ Image removed", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if token exists
    if (!token) {
      toast.error("🔐 Please login first", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!form.latitude || !form.longitude) {
      toast.error("📍 Location not detected. Please allow location access.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    if (images.length === 0) {
      toast.error("📸 Please upload at least one profile photo", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();

    // Append normal fields
    Object.entries(form).forEach(([key, value]) => {
      if (key === "interests") {
        value.forEach((item, i) => {
          formData.append(`interests[${i}]`, item);
        });
      } else {
        formData.append(key, value);
      }
    });

    // Append images
    images.forEach((img) => {
      formData.append("profileImages", img);
    });

    try {
      setLoading(true);

      const loadingToast = toast.loading(
        "✨ Creating your amazing profile...",
        {
          position: "top-right",
        }
      );

      const response = await fetch(`${BaseUrl}api/profile/insert`, {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
        body: formData,
      });

      const res = await response.json();
      setLoading(false);
      toast.dismiss(loadingToast);

      if (res?.status === true) {
        toast.success("🎉 Profile created successfully! Welcome aboard!", {
          position: "top-right",
          autoClose: 4000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else if (res?.message === "Profile Already created") {
        toast.warning("⚠️ Profile already exists!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(`❌ Error: ${res?.message || "Something went wrong"}`, {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch (err) {
      setLoading(false);
      console.error("Error details:", err);
      toast.error("❌ Failed to create profile. Please try again.", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "30s" }}
        ></div>
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <Heart className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Create Your Profile
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Let's build something amazing together and help you find your
              perfect match ✨
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Bio Section */}
                <div className="group">
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                    <User className="w-6 h-6 mr-3 text-purple-500" />
                    About You
                  </label>
                  <textarea
                    name="bio"
                    placeholder="Share your story, passions, and what makes you unique... ✨"
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 resize-none text-gray-700 placeholder-gray-400"
                    rows={4}
                    required
                  />
                </div>

                {/* Birthday and Gender Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                      <Calendar className="w-6 h-6 mr-3 text-pink-500" />
                      Birthday
                    </label>
                    <input
                      name="birthday"
                      type="date"
                      value={form.birthday}
                      onChange={handleChange}
                      className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-300 text-gray-700"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                      <User className="w-6 h-6 mr-3 text-indigo-500" />
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-gray-700"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="group bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-shadow duration-300">
                  <label className="flex items-center text-xl font-semibold text-gray-800 mb-2">
                    <MapPin className="w-6 h-6 mr-3 text-blue-500 animate-pulse" />
                    Location{" "}
                    {locationLoading && (
                      <span className="ml-2 text-sm text-blue-500 animate-pulse">
                        (Detecting...)
                      </span>
                    )}
                  </label>

                  {address ? (
                    <div className="mt-3 bg-purple-50/60 p-4 rounded-xl border border-purple-200 text-purple-800 shadow-md animate-fade-in">
                      <p className="text-sm leading-relaxed">
                        📍{" "}
                        <span className="font-semibold">Detected Address:</span>{" "}
                        <span className="text-purple-700">{address}</span>
                      </p>
                    </div>
                  ) : (
                    !locationLoading && (
                      <p className="text-sm text-red-500 mt-2">
                        ⚠️ Could not detect your location. Please enable
                        location services.
                      </p>
                    )
                  )}
                </div>

                {/* Interests */}
                <div className="group">
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                    <Sparkles className="w-6 h-6 mr-3 text-emerald-500" />
                    Interests & Hobbies
                  </label>
                  <input
                    name="interests"
                    placeholder="Coding, Singing, Travelling, Photography, Cooking, Dancing... 🎨"
                    onChange={handleInterestsChange}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-gray-700 placeholder-gray-400"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2 ml-1">
                    Separate multiple interests with commas
                  </p>
                  {form.interests.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {form.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Profile Images */}
                <div className="group">
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                    <Camera className="w-6 h-6 mr-3 text-amber-500" />
                    Profile Photos
                  </label>

                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors duration-300 bg-white/50 backdrop-blur">
                    <input
                      type="file"
                      name="profileImages"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                      required
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Upload Your Photos
                      </p>
                      <p className="text-sm text-gray-500">
                        Click to select up to 6 amazing photos of yourself
                      </p>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {imagePreview.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                      {imagePreview.map((preview, index) => (
                        <div
                          key={index}
                          className="relative group aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-white"
                        >
                          <img
                            src={preview || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <button
                    type="submit"
                    className={`w-full py-4 px-8 rounded-2xl text-white font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                      loading
                        ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 hover:shadow-3xl"
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Creating Your Amazing Profile...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Heart className="w-6 h-6 mr-3" />
                        Create My Profile ✨
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-600">
            <p className="text-lg">Ready to find your perfect match? 💕</p>
            <p className="text-sm mt-2 opacity-75">
              Your journey to love starts here ✨
            </p>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="backdrop-blur-sm"
      />
    </div>
  );
};

export default AddProfileDetails;
