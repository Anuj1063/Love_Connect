import { useState, useEffect } from "react";
import {
  Heart,
  Users,
  MessageCircle,
  Shield,
  Star,
  Sparkles,
  Zap,
  Play,
  CheckCircle,
  Camera,
  MapPin,
  Clock,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Reviews from "../components/Reviews";
import { Link } from "react-router-dom";

function TinderScroll() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "Met my soulmate here! We've been together for 2 years and just got engaged. This app changed my life completely.",
      name: "Sarah & Michael",
      image:
        "https://images.unsplash.com/photo-1660287370509-1053f69da850?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGRhdGluZyUyMHBpdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      location: "New York, NY",
      time: "2 years together",
    },
    {
      id: 2,
      text: "I was skeptical about dating apps, but LoveConnect's matching algorithm is incredible. Found my perfect match in just 3 weeks!",
      name: "Emma & James",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
      location: "Los Angeles, CA",
      time: "1 year together",
    },
    {
      id: 3,
      text: "The best dating app I've ever used. Real people, genuine connections, and amazing features. Highly recommend!",
      name: "Lisa & David",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
      location: "Chicago, IL",
      time: "8 months together",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Smart AI Matching",
      description:
        "Our advanced algorithm learns your preferences and finds compatible matches based on personality, interests, and values.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient:
        "from-purple-50 to-pink-50 dark:from-purple-900/20 to-pink-900/20",
    },
    {
      icon: Shield,
      title: "Safe & Verified",
      description:
        "Photo verification, background checks, and 24/7 moderation ensure a safe and authentic dating experience.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient:
        "from-blue-50 to-cyan-50 dark:from-blue-900/20 to-cyan-900/20",
    },
    {
      icon: MessageCircle,
      title: "Meaningful Conversations",
      description:
        "Conversation starters, voice messages, and video calls help you connect on a deeper level.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient:
        "from-green-50 to-emerald-50 dark:from-green-900/20 to-emerald-900/20",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ff69b4' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-sm font-semibold mb-6 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Join 10M+ Happy Couples
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Find Your
                <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent block">
                  Perfect Match
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Connect with amazing people who share your interests. Your love
                story starts with a simple swipe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to={"/register"}
                  className="btn btn-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Start Dating Now
                </Link>

                <button className="btn btn-lg btn-outline border-2 border-pink-200 dark:border-pink-700 hover:border-pink-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-full">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-pink-500">
                    10M+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-rose-500">
                    500K+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Matches Daily
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-red-500">
                    50K+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Success Stories
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Photo Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Main large photo */}
                <div className="col-span-2 relative overflow-hidden rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1660287370509-1053f69da850?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGRhdGluZyUyMHBpdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Happy couple"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                      <span className="font-semibold">
                        Perfect Match Found!
                      </span>
                    </div>
                  </div>
                </div>

                {/* Smaller photos */}
                <div className="relative overflow-hidden rounded-2xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1678489819892-f58fb78d38eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGRhdGluZyUyMHBpdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Profile"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1588285210516-0ad37ef7f09e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxkYXRpbmclMjBwaXR1cmV8ZW58MHx8MHx8fDA%3D"
                    alt="Profile"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose LoveConnect?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We make finding love simple, safe, and exciting with cutting-edge
              features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`card bg-gradient-to-br ${feature.bgGradient} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700`}
              >
                <div className="card-body items-center text-center p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="card-title text-xl text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Three simple steps to find your perfect match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-300">
                <img
                  src="https://images.unsplash.com/photo-1610816720184-cae3dc324c8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDA2fHxkYXRpbmclMjBwaXR1cmV8ZW58MHx8MHx8fDA%3D"
                  alt="Create profile"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Camera className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Create Your Profile
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Add your best photos and tell us about yourself. Show your
                personality and what makes you unique.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-rose-500 to-red-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-rose-400/20 to-red-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-300">
                <img
                  src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=300&fit=crop&crop=faces"
                  alt="Start swiping"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 right-4 text-white">
                  <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Start Swiping
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse through potential matches and swipe right on people
                you're interested in meeting.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-300">
                <img
                  src="https://plus.unsplash.com/premium_photo-1670588775998-4fc1bc6d7177?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDA5fHxkYXRpbmclMjBwaXR1cmV8ZW58MHx8MHx8fDA%3D"
                  alt="Make connections"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <MessageCircle className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Make Connections
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                When you both swipe right, it's a match! Start chatting and plan
                your first date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real couples who found love on LoveConnect
            </p>
          </div>

          {/* Featured Testimonial */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="card bg-gradient-to-r from-pink-50 to-rose-50 dark:from-gray-700 dark:to-gray-600 shadow-2xl border border-pink-100 dark:border-gray-600">
              <div className="card-body p-8 md:p-12">
                <div className="flex items-center justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-yellow-400 mx-1"
                    />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 text-center mb-8 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <img
                      src={
                        testimonials[currentTestimonial].image ||
                        "/placeholder.svg"
                      }
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-4 text-center">
                    <p className="font-semibold text-gray-900 dark:text-white text-lg">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {testimonials[currentTestimonial].location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {testimonials[currentTestimonial].time}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Grid of Happy Couples */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1592841517689-d0ba7edaa4fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnV0aWZ1bGwlMjBnaXJsJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
              "https://plus.unsplash.com/premium_photo-1741614161451-d18c3adf10bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGJ1dGlmdWxsJTIwbWFuJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
              "https://images.unsplash.com/photo-1670408377169-7babedc25a58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJ1dGlmdWxsJTIwbWFuJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
              "https://images.unsplash.com/photo-1640465978467-fa011a5dfb0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGJ1dGlmdWxsJTIwZ2lybCUyMHBob3RvfGVufDB8fDB8fHww",
            ].map((src, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Happy couple ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='30' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-6 shadow-md">
            <CheckCircle className="w-5 h-5 mr-2" />
            Free to Join • No Credit Card Required
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-md">
            Ready to Find Your Perfect Match?
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-pink-100 mb-6 max-w-2xl mx-auto leading-relaxed">
            Join millions of singles who have found love on{" "}
            <span className="font-semibold text-white">LoveConnect</span>. Your
            story could be next!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/register"
              className="btn btn-md bg-white text-pink-600 hover:bg-pink-100 border-0 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 inline-flex items-center"
            >
              <Users className="mr-2 h-5 w-5" />
              Join Free Now
            </Link>

            <button className="btn btn-md btn-outline border-white text-white hover:bg-white hover:text-pink-600 rounded-full transition-transform duration-300 hover:scale-105">
              <Play className="mr-2 h-5 w-5" />
              Watch Stories
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto text-center">
            {[
              { title: "2 min", desc: "Setup Time" },
              { title: "24/7", desc: "Support" },
              { title: "100%", desc: "Safe" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 py-2 px-3 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-xl font-bold text-white">{item.title}</div>
                <div className="text-pink-100 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-gray-900 text-white">
        <aside>
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500 mr-2" />
            <span className="text-2xl font-bold">LoveConnect</span>
          </div>
          <p className="text-gray-400 mb-6">
            Connecting hearts, one swipe at a time
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-6">
            <a href="#" className="link link-hover">
              Privacy Policy
            </a>
            <a href="#" className="link link-hover">
              Terms of Service
            </a>
            <a href="#" className="link link-hover">
              Contact Us
            </a>
            <a href="#" className="link link-hover">
              Help Center
            </a>
            <a href="#" className="link link-hover">
              Safety Tips
            </a>
            <a href="#" className="link link-hover">
              Community Guidelines
            </a>
            <a href="#" className="link link-hover">
              Success Stories
            </a>
            <a href="#" className="link link-hover">
              Blog
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 LoveConnect. All rights reserved.
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default TinderScroll;
