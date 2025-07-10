

"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Clock,
  Shield,
  Sparkles,
  CheckCircle,
  RefreshCw,
  AlertCircle,
  ArrowLeft,
  Star,
  Zap,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import BaseUrl from "../utils/basUrl";

const VerifyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get email and flag from registration page
  const emailFromRegistration = location.state?.email || "";
  const cameFromRegistration = location.state?.fromRegistration || false;

  // Local state
  const [email, setEmail] = useState(emailFromRegistration);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  // Redirect if no email or not from registration
  useEffect(() => {
    if (!cameFromRegistration && !email) {
      navigate("/register");
    }
  }, [cameFromRegistration, email, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsExpired(true);
    }
  }, [timeLeft]);

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  // Handle OTP digit change
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }

    if (value && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    const otpString = otp.join("");
    if (!otpString || otpString.length !== 4) {
      newErrors.otp = "Please enter the complete 4-digit OTP";
    }

    if (isExpired) {
      newErrors.expired = "OTP has expired. Please request a new one.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle OTP verification
  const handleVerify = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otp.join(""),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        throw new Error(data.message || "Verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setErrors({
        submit: error.message || "Verification failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Please enter a valid email first" });
      return;
    }
    setResending(true);
    try {
      const response = await fetch("http://127.0.0.1:4000/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setTimeLeft(120);
        setIsExpired(false);
        setOtp(["", "", "", ""]);
        setErrors({});
        otpRefs[0].current.focus();
      } else {
        throw new Error(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setErrors({
        submit: error.message || "Failed to resend OTP. Please try again.",
      });
    } finally {
      setResending(false);
    }
  };

  // Go back to registration
  const navigateBack = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen relative flex">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          //src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0"
          src="https://images.unsplash.com/photo-1578641214267-c33356f49df2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc2fHxkYXRpbmclMjBwaXR1cmV8ZW58MHx8MHx8fDA%3D"
          alt="Verification background"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/70"></div>
      </div>

      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 text-center max-w-md mx-4 animate-bounce">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Verification Complete! ✨
            </h3>
            <p className="text-gray-600">Welcome to LoveConnect family</p>
          </div>
        </div>
      )}

      {/* Left Side - Verification Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="max-w-lg text-center lg:text-left">
          {/* Logo */}
          <div className="flex items-center justify-center lg:justify-start mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-2xl shadow-emerald-500/30">
              <Shield className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="ml-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                LoveConnect
              </h1>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-6">
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
              Almost
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                There!
              </span>
            </h2>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-lg">
              We've sent a secure verification code to your email. Enter it
              below to activate your account and start your journey to finding
              love.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center space-x-2 text-white/80">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm">Secure Verification</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-sm">Quick Process</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-sm">Instant Access</span>
              </div>
            </div>

            {/* Verification Steps */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Verification Steps
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-sm">Email sent to your inbox</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <span className="text-sm">Enter the 4-digit code</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <span className="text-sm">Account activated & ready!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Verification Form */}
      <div className="relative z-10 w-full lg:w-2/5 xl:w-1/3 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back Button */}

          <div className="flex justify-end mb-6">
            <button
              onClick={navigateBack}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Registration</span>
            </button>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Verify Your Email
            </h3>
            <p className="text-white/80 drop-shadow">
              Enter the code we sent to your email
            </p>
          </div>

          {/* Verification Form */}
          <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-black/25 border border-white/20 hover:bg-white/20 transition-all duration-500">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/95 tracking-wide">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/60 group-focus-within:text-emerald-300 transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-300 focus:bg-white/20 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm hover:bg-white/15 ${
                      errors.email ? "border-red-400/50" : "border-white/20"
                    } ${cameFromRegistration ? "opacity-75" : ""}`}
                    readOnly={cameFromRegistration}
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-2 text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
                {cameFromRegistration && (
                  <div className="flex items-center gap-2 text-emerald-300 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Email from registration</span>
                  </div>
                )}
              </div>

              {/* Timer Display */}
              <div className="text-center">
                <div
                  className={`inline-flex items-center space-x-2 px-6 py-3 rounded-2xl backdrop-blur-sm border ${
                    isExpired
                      ? "bg-red-500/20 border-red-400/30 text-red-200"
                      : timeLeft <= 30
                      ? "bg-orange-500/20 border-orange-400/30 text-orange-200"
                      : "bg-emerald-500/20 border-emerald-400/30 text-emerald-200"
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <span className="font-mono font-bold text-lg">
                    {isExpired ? "Expired" : formatTime(timeLeft)}
                  </span>
                </div>
                {isExpired && (
                  <p className="text-red-300 text-sm mt-2">
                    Code has expired. Please request a new one.
                  </p>
                )}
              </div>

              {/* OTP Input */}
              <div className="space-y-4">
                <p
                className="block text-sm font-normal text-white/95 tracking-wide text-center"
                >verify before time</p>
                <label className="block text-sm font-semibold text-white/95 tracking-wide text-center">
                  Enter 4-Digit Verification Code
                </label>
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-16 h-16 text-center text-2xl font-bold bg-white/10 border-2 rounded-2xl focus:border-emerald-400 focus:bg-white/20 focus:outline-none transition-all duration-300 text-white backdrop-blur-sm hover:bg-white/15 ${
                        errors.otp ? "border-red-400/50" : "border-white/20"
                      } ${isExpired ? "opacity-50" : ""}`}
                      disabled={isExpired}
                    />
                  ))}
                </div>
                {errors.otp && (
                  <div className="flex items-center justify-center gap-2 text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.otp}</span>
                  </div>
                )}
                {errors.expired && (
                  <div className="flex items-center justify-center gap-2 text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.expired}</span>
                  </div>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-200 text-sm">{errors.submit}</p>
                  </div>
                </div>
              )}

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={loading || isExpired}
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 relative z-10">
                    <Shield className="w-5 h-5" />
                    <span>Verify & Activate</span>
                    <Sparkles className="w-5 h-5" />
                  </div>
                )}
              </button>

              {/* Resend OTP */}
              <div className="text-center space-y-3">
                <p className="text-white/70 text-sm">
                  Didn't receive the code?
                </p>
                <button
                  onClick={handleResendOtp}
                  disabled={resending || (!isExpired && timeLeft > 60)}
                  className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 font-semibold hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${resending ? "animate-spin" : ""}`}
                  />
                  <span>
                    {resending
                      ? "Sending New Code..."
                      : "Resend Verification Code"}
                  </span>
                </button>
                {!isExpired && timeLeft > 60 && (
                  <p className="text-white/50 text-xs">
                    You can resend after {formatTime(timeLeft - 60)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-4 h-4 text-emerald-400" />
                <span className="text-white/90 text-sm font-semibold">
                  Secure & Private
                </span>
              </div>
              <p className="text-white/70 text-xs">
                Your verification code expires in 2 minutes for maximum
                security. We never share your personal information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-teal-400/10 to-emerald-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default VerifyAccount;
