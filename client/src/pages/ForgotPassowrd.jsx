"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Mail,
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage("");
      setIsSuccess(false);
      const res = await axios.post(
        "http://127.0.0.1:4000/auth/forgot-password",
        {
          email: data.email,
        }
      );
      setMessage(res.data.message || "Reset link sent to your email.");
      setIsSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      //className="min-h-screen relative flex"
      className="min-h-screen relative flex flex-col lg:flex-row"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1693462467023-a60e9b74c434?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fGRhdGluZyUyMHBpdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Forgot password background"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/60"></div>
      </div>

      {/* Success Animation Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 text-center max-w-md mx-4 animate-bounce">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Email Sent! ✨
            </h3>
            <p className="text-gray-600">Check your inbox for the reset link</p>
          </div>
        </div>
      )}

      <>
        {/* Logo - Moved outside of content to avoid overlap */}

        <div className="absolute top-4 left-6 z-20 hidden lg:flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            LoveConnect
          </h1>
        </div>

        {/* Left Side - Welcome Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-lg text-center lg:text-left">
            {/* Welcome Text */}
            <div className="space-y-6">
              <h4 className="text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                Secure Your
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Account Recovery
                </span>
              </h4>
              <p className="text-xl text-white/90 leading-relaxed drop-shadow-lg">
                Don't worry! It happens to the best of us. Enter your email
                address and we'll send you a secure link to reset your password.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center space-x-2 text-white/80">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Secure Process</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm">Quick Recovery</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      Bank-Level Security
                    </h3>
                    <p className="text-white/80 text-sm">
                      Your data is protected with enterprise-grade encryption
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
                    <div className="text-2xl mb-1">🔒</div>
                    <div className="text-white/90 text-xs font-medium">
                      SSL Encrypted
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-white/90 text-xs font-medium">
                      Instant Reset
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
                    <div className="text-2xl mb-1">✅</div>
                    <div className="text-white/90 text-xs font-medium">
                      Verified Safe
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* Right Side - Reset Form */}
      <div className="relative z-10 w-full lg:w-2/5 xl:w-1/3 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <div className="absolute top-6 left-75 z-30">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Login</span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Reset Password
            </h3>
            <p className="text-white/80 drop-shadow">
              Enter your email to receive a reset link
            </p>
          </div>

          {/* Reset Form */}
          <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-black/25 border border-white/20 hover:bg-white/20 transition-all duration-500">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/95 tracking-wide">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/60 group-focus-within:text-blue-300 transition-colors" />
                  </div>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter your email address"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 focus:bg-white/20 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm hover:bg-white/15 ${
                      errors.email ? "border-red-400/50" : "border-white/20"
                    }`}
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-2 text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email.message}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending Reset Link...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 relative z-10">
                    <Mail className="w-5 h-5" />
                    <span>Send Reset Link</span>
                    <Sparkles className="w-5 h-5" />
                  </div>
                )}
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div
                className={`mt-6 p-4 rounded-2xl backdrop-blur-sm border ${
                  isSuccess
                    ? "bg-green-500/20 border-green-400/30 text-green-200"
                    : "bg-red-500/20 border-red-400/30 text-red-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isSuccess ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                  <p className="text-sm font-medium">{message}</p>
                </div>
              </div>
            )}

            {/* Help Text */}
            <div className="mt-8 text-center">
              <p className="text-white/70 text-sm mb-4">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-blue-300 hover:text-blue-200 font-semibold transition-colors hover:underline"
                >
                  Sign In
                </Link>
              </p>
              <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
                <Heart className="w-3 h-3" />
                <span>Secure password recovery powered by LoveConnect</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-6">
            <p className="text-xs text-white/60 drop-shadow">
              Need help?{" "}
              <a
                href="/support"
                className="text-blue-300 hover:text-blue-200 transition-colors hover:underline"
              >
                Contact Support
              </a>{" "}
              or visit our{" "}
              <a
                href="/help"
                className="text-blue-300 hover:text-blue-200 transition-colors hover:underline"
              >
                Help Center
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
}

export default ForgotPassword;
