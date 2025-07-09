











"use client";

import { useState, useEffect } from "react";
import { Heart, Eye, EyeOff, User, Mail, Lock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../utils/basUrl";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const testimonials = [
    {
      id: 1,
      text: "Amazing app! Met my partner here 6 months ago...",
      name: "Michael R.",
      initial: "M",
      rating: 5,
      gradient: "from-purple-400 to-pink-400",
    },
    {
      id: 2,
      text: "Found my soulmate within a week!",
      name: "Sarah M.",
      initial: "S",
      rating: 5,
      gradient: "from-pink-400 to-rose-400",
    },
    {
      id: 3,
      text: "Best dating app I've ever used.",
      name: "David L.",
      initial: "D",
      rating: 5,
      gradient: "from-rose-400 to-purple-400",
    },
    {
      id: 4,
      text: "Met so many wonderful people here.",
      name: "Emma K.",
      initial: "E",
      rating: 5,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 5,
      text: "Safe, secure, and effective.",
      name: "Alex T.",
      initial: "A",
      rating: 5,
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 2)
      newErrors.name = "Name must be at least 2 characters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});
    try {
      const response = await fetch(`${BaseUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/verifyuser", {
            state: { email: formData.email.trim(), fromRegistration: true },
          });
          setFormData({ name: "", email: "", password: "" });
        }, 2000);
      } else {
        if (data.message) setErrors({ submit: data.message });
        else if (data.errors) {
          const serverErrors = {};
          data.errors.forEach((error) => {
            if (error.field) serverErrors[error.field] = error.message;
          });
          setErrors(serverErrors);
        } else setErrors({ submit: "Registration failed. Please try again." });
      }
    } catch (error) {
      setErrors({
        submit: "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => navigate("/login");

  return (
    <>
    <div className="min-h-screen relative flex flex-col lg:flex-row">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1567309837661-5e9e8fd6a6de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGRhdGluZyUyMHBpdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
      alt="Dating app background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-black/20"></div>
  </div>

  {/* Success Toast */}
  {showSuccess && (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
      ✨ Account created successfully!
    </div>
  )}

  {/* Left Side - Welcome Content */}
  <div className="relative z-10 flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-16 w-full lg:w-3/5">
    <div className="max-w-lg text-center lg:text-left w-full">
      {/* Logo */}
      <div className="absolute top-4 left-4 sm:left-6 flex items-center gap-4">
        <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
          <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
          LoveConnect
        </h1>
      </div>

      {/* Welcome Text & Features */}
      <div className="space-y-6 mt-20 sm:mt-28">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
          Begin Your
          <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Journey to Love
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-white/90 leading-relaxed drop-shadow-lg">
          Connect with amazing people who share your interests. Build meaningful relationships and find your perfect companion.
        </p>

        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          {[
            ["Smart Matching", "bg-purple-400"],
            ["Real Connections", "bg-pink-400"],
            ["Privacy First", "bg-rose-400"]
          ].map(([text, color], idx) => (
            <div key={idx} className="flex items-center space-x-2 text-white/80">
              <div className={`w-2 h-2 ${color} rounded-full`}></div>
              <span className="text-sm">{text}</span>
            </div>
          ))}
        </div>

        {/* Testimonial Slider */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <p className="text-white/90 italic mb-4 min-h-[3rem]">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{testimonial.initial}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Heart key={i} className="w-3 h-3 text-purple-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-purple-400 w-6" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Right Side - Registration Form */}
   {/* Right Side - Registration Form */}
      <div className="relative z-10 w-full lg:w-2/5 xl:w-1/3 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Create Account</h3>
            <p className="text-white/80 drop-shadow">Join thousands finding love every day</p>
          </div>

          {/* Registration Form */}
          <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-black/25 border border-white/20 hover:bg-white/20 transition-all duration-500">
            <form onSubmit={handleSubmit} className=" space-y-6">
              {/* Name Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/95 tracking-wide">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/60 group-focus-within:text-pink-300 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 focus:bg-white/20 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm hover:bg-white/15 ${
                      errors.name ? "border-red-400/50" : "border-white/20"
                    }`}
                    disabled={loading}
                  />
                </div>
                {errors.name && <p className="text-red-300 text-sm">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/95 tracking-wide">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/60 group-focus-within:text-pink-300 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 focus:bg-white/20 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm hover:bg-white/15 ${
                      errors.email ? "border-red-400/50" : "border-white/20"
                    }`}
                    disabled={loading}
                  />
                </div>
                {errors.email && <p className="text-red-300 text-sm">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/95 tracking-wide">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/60 group-focus-within:text-pink-300 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className={`w-full pl-12 pr-12 py-4 bg-white/10 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 focus:bg-white/20 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm hover:bg-white/15 ${
                      errors.password ? "border-red-400/50" : "border-white/20"
                    }`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-pink-300 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-300 text-sm">{errors.password}</p>}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-3 backdrop-blur-sm">
                  <p className="text-red-200 text-sm">💔 {errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 relative z-10">
                    <Heart className="w-5 h-5" />
                    <span>Start My Journey</span>
                    <Sparkles className="w-5 h-5" />
                  </div>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                {/* <span className="px-6 bg-white/10 text-white/80 backdrop-blur-sm rounded-full border border-white/20">
                  or continue with
                </span> */}
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              {/* <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 group backdrop-blur-sm">
                <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Google
                </span>
              </button>

              <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 group backdrop-blur-sm">
                <svg
                  className="w-5 h-5 text-white/80 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="ml-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Facebook
                </span>
              </button> */}
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-8">
            <p className="text-white/80 drop-shadow">
              Already have an account?{" "}
              <button
                onClick={navigateToLogin}
                className="text-purple-300 hover:text-purple-200 font-semibold transition-colors hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-6">
            <p className="text-xs text-white/60 drop-shadow">
              By creating an account, you agree to our{" "}
              <a href="/terms" className="text-pink-300 hover:text-pink-200 transition-colors hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-pink-300 hover:text-pink-200 transition-colors hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>


  {/* Floating Elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-28 sm:w-40 h-28 sm:h-40 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
    <div className="absolute top-1/2 right-1/3 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-rose-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-500" />
  </div>
</div>

    </>
    
     





    
  );
};

export default Register;
