// import { Heart, Users, MessageCircle, Shield, Star, ArrowRight, Sparkles, Zap } from "lucide-react"
// import Navbar from "../components/Navbar"

// function TinderScroll() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative overflow-hidden pt-20 pb-32">
//         <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-red-500/10" />
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="badge badge-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 mb-6">
//               <Sparkles className="w-4 h-4 mr-2" />
//               Join 10M+ Happy Couples
//             </div>
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
//               Find Your Perfect
//               <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent block">
//                 Match Today
//               </span>
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
//               Swipe, match, and connect with amazing people near you. Your love story starts with a simple scroll.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <button className="btn btn-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
//                 Start Swiping Now
//                 <Heart className="ml-2 h-5 w-5" />
//               </button>
//               <button className="btn btn-lg btn-outline border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50 text-pink-600 rounded-full">
//                 Watch How It Works
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Floating Hearts Animation */}
//         <div className="absolute top-20 left-10 animate-bounce">
//           <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
//         </div>
//         <div className="absolute top-32 right-16 animate-bounce delay-300">
//           <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
//         </div>
//         <div className="absolute bottom-20 left-20 animate-bounce delay-700">
//           <Heart className="w-10 h-10 text-red-400 fill-red-400" />
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose TinderScroll?</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               We make finding love simple, safe, and exciting with cutting-edge features
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="card bg-gradient-to-br from-pink-50 to-rose-50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
//               <div className="card-body items-center text-center">
//                 <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mb-6">
//                   <Zap className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="card-title text-xl text-gray-900 mb-4">Smart Matching</h3>
//                 <p className="text-gray-600">
//                   Our AI-powered algorithm finds your perfect match based on interests, values, and compatibility.
//                 </p>
//               </div>
//             </div>

//             <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
//               <div className="card-body items-center text-center">
//                 <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-6">
//                   <Shield className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="card-title text-xl text-gray-900 mb-4">Safe & Secure</h3>
//                 <p className="text-gray-600">
//                   Advanced verification and privacy controls keep you safe while you search for love.
//                 </p>
//               </div>
//             </div>

//             <div className="card bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
//               <div className="card-body items-center text-center">
//                 <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
//                   <MessageCircle className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="card-title text-xl text-gray-900 mb-4">Easy Conversations</h3>
//                 <p className="text-gray-600">
//                   Break the ice with conversation starters and connect meaningfully with your matches.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-24 bg-gradient-to-r from-pink-50 to-rose-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
//             <p className="text-xl text-gray-600">Three simple steps to find your perfect match</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
//                 1
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Your Profile</h3>
//               <p className="text-gray-600">
//                 Add your best photos and tell us about yourself. Show your personality and what makes you unique.
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
//                 2
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">Start Swiping</h3>
//               <p className="text-gray-600">
//                 Browse through potential matches and swipe right on people you're interested in meeting.
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
//                 3
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">Make Connections</h3>
//               <p className="text-gray-600">
//                 When you both swipe right, it's a match! Start chatting and plan your first date.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Success Stories Section */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
//             <p className="text-xl text-gray-600">Real couples who found love on TinderScroll</p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <div className="flex items-center mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-4">
//                   "We matched on TinderScroll and had our first date within a week. Two years later, we're engaged!"
//                 </p>
//                 <div className="flex items-center">
//                   <div className="avatar placeholder mr-3">
//                     <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full w-10">
//                       <span className="text-sm font-semibold">S&J</span>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Sarah & James</p>
//                     <p className="text-sm text-gray-500">Together 2 years</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <div className="flex items-center mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-4">
//                   "I never believed in online dating until I tried TinderScroll. Found my soulmate in just 3 weeks!"
//                 </p>
//                 <div className="flex items-center">
//                   <div className="avatar placeholder mr-3">
//                     <div className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-full w-10">
//                       <span className="text-sm font-semibold">M&A</span>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Mike & Anna</p>
//                     <p className="text-sm text-gray-500">Together 1 year</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <div className="flex items-center mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-4">
//                   "The smart matching really works! We have so much in common and couldn't be happier."
//                 </p>
//                 <div className="flex items-center">
//                   <div className="avatar placeholder mr-3">
//                     <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-full w-10">
//                       <span className="text-sm font-semibold">L&D</span>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Lisa & David</p>
//                     <p className="text-sm text-gray-500">Together 6 months</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500">
//         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Find Your Perfect Match?</h2>
//           <p className="text-xl text-pink-100 mb-8">
//             Join millions of singles who have found love on TinderScroll. Your story could be next!
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="btn btn-lg bg-white text-pink-500 hover:bg-pink-50 border-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
//               <Users className="mr-2 h-5 w-5" />
//               Join Free Now
//             </button>
//             <button className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-pink-500 rounded-full">
//               Learn More
//             </button>
//           </div>
//           <p className="text-pink-100 text-sm mt-6">
//             Free to join • No credit card required • Start matching instantly
//           </p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer footer-center p-10 bg-gray-900 text-white">
//         <aside>
//           <div className="flex items-center justify-center mb-4">
//             <Heart className="w-8 h-8 text-pink-500 fill-pink-500 mr-2" />
//             <span className="text-2xl font-bold">TinderScroll</span>
//           </div>
//           <p className="text-gray-400 mb-6">Connecting hearts, one swipe at a time</p>
//           <div className="flex justify-center space-x-8 text-sm text-gray-400">
//             <a href="#" className="link link-hover">
//               Privacy Policy
//             </a>
//             <a href="#" className="link link-hover">
//               Terms of Service
//             </a>
//             <a href="#" className="link link-hover">
//               Contact Us
//             </a>
//             <a href="#" className="link link-hover">
//               Help Center
//             </a>
//           </div>
//           <p className="text-gray-500 text-sm mt-6">© 2024 TinderScroll. All rights reserved.</p>
//         </aside>
//       </footer>
//     </div>
//   )
// }

// export default TinderScroll

////////////////////





"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import Navbar from "../components/Navbar"
import Reviews from "../components/Reviews"

function TinderScroll() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      text: "Met my soulmate here! We've been together for 2 years and just got engaged. This app changed my life completely.",
      name: "Sarah & Michael",
      image: "https://images.unsplash.com/photo-1660287370509-1053f69da850?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGRhdGluZyUyMHBpdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      location: "New York, NY",
      time: "2 years together",
    },
    {
      id: 2,
      text: "I was skeptical about dating apps, but LoveConnect's matching algorithm is incredible. Found my perfect match in just 3 weeks!",
      name: "Emma & James",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
      location: "Los Angeles, CA",
      time: "1 year together",
    },
    {
      id: 3,
      text: "The best dating app I've ever used. Real people, genuine connections, and amazing features. Highly recommend!",
      name: "Lisa & David",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
      location: "Chicago, IL",
      time: "8 months together",
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Smart AI Matching",
      description:
        "Our advanced algorithm learns your preferences and finds compatible matches based on personality, interests, and values.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 to-pink-900/20",
    },
    {
      icon: Shield,
      title: "Safe & Verified",
      description:
        "Photo verification, background checks, and 24/7 moderation ensure a safe and authentic dating experience.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 to-cyan-900/20",
    },
    {
      icon: MessageCircle,
      title: "Meaningful Conversations",
      description: "Conversation starters, voice messages, and video calls help you connect on a deeper level.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 to-emerald-900/20",
    },
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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
                Connect with amazing people who share your interests. Your love story starts with a simple swipe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="btn btn-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Heart className="mr-2 h-5 w-5" />
                  Start Dating Now
                </button>
                <button className="btn btn-lg btn-outline border-2 border-pink-200 dark:border-pink-700 hover:border-pink-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-full">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-pink-500">10M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-rose-500">500K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Matches Daily</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-red-500">50K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Stories</div>
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
                      <span className="font-semibold">Perfect Match Found!</span>
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
              We make finding love simple, safe, and exciting with cutting-edge features
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
                  <h3 className="card-title text-xl text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Three simple steps to find your perfect match</p>
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create Your Profile</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Add your best photos and tell us about yourself. Show your personality and what makes you unique.
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Start Swiping</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse through potential matches and swipe right on people you're interested in meeting.
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Make Connections</h3>
              <p className="text-gray-600 dark:text-gray-300">
                When you both swipe right, it's a match! Start chatting and plan your first date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Real couples who found love on LoveConnect</p>
          </div>

          {/* Featured Testimonial */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="card bg-gradient-to-r from-pink-50 to-rose-50 dark:from-gray-700 dark:to-gray-600 shadow-2xl border border-pink-100 dark:border-gray-600">
              <div className="card-body p-8 md:p-12">
                <div className="flex items-center justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400 mx-1" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 text-center mb-8 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <img
                      src={testimonials[currentTestimonial].image || "/placeholder.svg"}
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

            {/* Testimonial Dots */}
            {/* <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-pink-500 w-8" : "bg-gray-300 dark:bg-gray-600 hover:bg-pink-300"
                  }`}
                />
              ))}
            </div> */}
           
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

 <Reviews/>



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
      Join millions of singles who have found love on <span className="font-semibold text-white">LoveConnect</span>. Your story could be next!
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
      <button className="btn btn-md bg-white text-pink-600 hover:bg-pink-100 border-0 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105">
        <Users className="mr-2 h-5 w-5" />
        Join Free Now
      </button>
      <button className="btn btn-md btn-outline border-white text-white hover:bg-white hover:text-pink-600 rounded-full transition-transform duration-300 hover:scale-105">
        <Play className="mr-2 h-5 w-5" />
        Watch Stories
      </button>
    </div>

    {/* Features */}
    <div className="grid grid-cols-3 gap-6 max-w-md mx-auto text-center">
      {[
        { title: '2 min', desc: 'Setup Time' },
        { title: '24/7', desc: 'Support' },
        { title: '100%', desc: 'Safe' },
      ].map((item, index) => (
        <div key={index} className="bg-white/10 py-2 px-3 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
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
          <p className="text-gray-400 mb-6">Connecting hearts, one swipe at a time</p>
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
          <p className="text-gray-500 text-sm">© 2024 LoveConnect. All rights reserved.</p>
        </aside>
      </footer>
    </div>
  )
}

export default TinderScroll



///////////////////////////






// "use client"

// import { useState, useEffect } from "react"
// import {
//   Heart,
//   Users,
//   MessageCircle,
//   Shield,
//   Star,
//   Sparkles,
//   Zap,
//   Play,
//   CheckCircle,
//   Camera,
//   MapPin,
//   Clock,
//   Download,
//   ArrowRight,
//   Globe,
//   Lock,
//   Award,
//   Smartphone,
// } from "lucide-react"
// import Navbar from "../components/Navbar"

// function TinderScroll() {
//   const [currentTestimonial, setCurrentTestimonial] = useState(0)
//   const [currentPhotoSet, setCurrentPhotoSet] = useState(0)

//   const testimonials = [
//     {
//       id: 1,
//       text: "Met my soulmate here! We've been together for 2 years and just got engaged. This app changed my life completely.",
//       name: "Sarah & Michael",
//       image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=400&fit=crop&crop=faces",
//       location: "New York, NY",
//       time: "2 years together",
//       rating: 5,
//     },
//     {
//       id: 2,
//       text: "I was skeptical about dating apps, but LoveConnect's matching algorithm is incredible. Found my perfect match in just 3 weeks!",
//       name: "Emma & James",
//       image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
//       location: "Los Angeles, CA",
//       time: "1 year together",
//       rating: 5,
//     },
//     {
//       id: 3,
//       text: "The best dating app I've ever used. Real people, genuine connections, and amazing features. Highly recommend!",
//       name: "Lisa & David",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
//       location: "Chicago, IL",
//       time: "8 months together",
//       rating: 5,
//     },
//   ]

//   const photoSets = [
//     [
//       "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
//     ],
//     [
//       "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=300&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop",
//     ],
//   ]

//   const features = [
//     {
//       icon: Zap,
//       title: "Smart AI Matching",
//       description:
//         "Our advanced algorithm learns your preferences and finds compatible matches based on personality, interests, and values.",
//       gradient: "from-purple-500 to-pink-500",
//       bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30",
//       iconBg: "bg-gradient-to-r from-purple-500 to-pink-500",
//     },
//     {
//       icon: Shield,
//       title: "Safe & Verified",
//       description:
//         "Photo verification, background checks, and 24/7 moderation ensure a safe and authentic dating experience.",
//       gradient: "from-blue-500 to-cyan-500",
//       bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30",
//       iconBg: "bg-gradient-to-r from-blue-500 to-cyan-500",
//     },
//     {
//       icon: MessageCircle,
//       title: "Meaningful Conversations",
//       description: "Conversation starters, voice messages, and video calls help you connect on a deeper level.",
//       gradient: "from-green-500 to-emerald-500",
//       bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30",
//       iconBg: "bg-gradient-to-r from-green-500 to-emerald-500",
//     },
//   ]

//   const stats = [
//     { number: "10M+", label: "Active Users", icon: Users, color: "text-pink-500" },
//     { number: "500K+", label: "Matches Daily", icon: Heart, color: "text-rose-500" },
//     { number: "50K+", label: "Success Stories", icon: Award, color: "text-red-500" },
//     { number: "4.8★", label: "App Rating", icon: Star, color: "text-yellow-500" },
//   ]

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   // Auto-rotate photo sets
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentPhotoSet((prev) => (prev + 1) % photoSets.length)
//     }, 8000)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative overflow-hidden pt-24 pb-20 min-h-screen flex items-center">
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-rose-100/30 to-red-100/50 dark:from-pink-900/20 dark:via-rose-900/10 dark:to-red-900/20"></div>
//           <div className="absolute inset-0 opacity-30 dark:opacity-20">
//             <div
//               className="absolute inset-0 animate-pulse"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ff69b4' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//               }}
//             />
//           </div>
//         </div>

//         {/* Floating Hearts */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 animate-bounce delay-0">
//             <Heart className="w-8 h-8 text-pink-400 fill-pink-400 opacity-60" />
//           </div>
//           <div className="absolute top-32 right-16 animate-bounce delay-1000">
//             <Heart className="w-6 h-6 text-rose-400 fill-rose-400 opacity-60" />
//           </div>
//           <div className="absolute bottom-20 left-20 animate-bounce delay-2000">
//             <Heart className="w-10 h-10 text-red-400 fill-red-400 opacity-60" />
//           </div>
//           <div className="absolute top-1/2 left-1/4 animate-pulse delay-500">
//             <Sparkles className="w-6 h-6 text-purple-400 opacity-60" />
//           </div>
//           <div className="absolute bottom-1/3 right-1/4 animate-pulse delay-1500">
//             <Sparkles className="w-8 h-8 text-pink-400 opacity-60" />
//           </div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <div className="text-center lg:text-left space-y-8">
//               <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                 <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
//                 Join 10M+ Happy Couples
//                 <Heart className="w-4 h-4 ml-2 fill-white" />
//               </div>

//               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
//                 <span className="text-gray-900 dark:text-white">Find Your</span>
//                 <span className="block bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent animate-pulse">
//                   Perfect Match
//                 </span>
//                 <span className="block text-gray-900 dark:text-white">Today</span>
//               </h1>

//               <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
//                 Connect with amazing people who share your interests. Your love story starts with a simple swipe.
//                 <span className="block mt-2 text-lg text-pink-600 dark:text-pink-400 font-semibold">
//                   ✨ Over 1,000 couples find love daily
//                 </span>
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <button className="group btn btn-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                   <Heart className="mr-2 h-5 w-5 group-hover:animate-pulse" />
//                   Start Dating Now
//                   <Sparkles className="ml-2 h-4 w-4" />
//                 </button>
//                 <button className="btn btn-lg btn-outline border-2 border-pink-300 dark:border-pink-600 hover:border-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
//                   <Play className="mr-2 h-5 w-5" />
//                   Watch Success Stories
//                 </button>
//               </div>

//               {/* Enhanced Stats */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
//                 {stats.map((stat, index) => (
//                   <div
//                     key={index}
//                     className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
//                   >
//                     <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
//                     <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.number}</div>
//                     <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Content - Enhanced Photo Grid */}
//             <div className="relative">
//               <div className="grid grid-cols-2 gap-6">
//                 {/* Main large photo */}
//                 <div className="col-span-2 relative overflow-hidden rounded-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500 group">
//                   <img
//                     src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop"
//                     alt="Happy couple"
//                     className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                   <div className="absolute bottom-6 left-6 text-white">
//                     <div className="flex items-center space-x-3 mb-2">
//                       <Heart className="w-6 h-6 text-red-400 fill-red-400 animate-pulse" />
//                       <span className="font-bold text-lg">Perfect Match Found!</span>
//                     </div>
//                     <div className="flex items-center space-x-2 text-sm opacity-90">
//                       <MapPin className="w-4 h-4" />
//                       <span>New York, NY</span>
//                       <Clock className="w-4 h-4 ml-2" />
//                       <span>2 years together</span>
//                     </div>
//                   </div>
//                   <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
//                     ✓ Verified
//                   </div>
//                 </div>

//                 {/* Smaller photos with enhanced styling */}
//                 <div className="relative overflow-hidden rounded-2xl shadow-xl transform -rotate-2 hover:rotate-0 transition-all duration-500 group">
//                   <img
//                     src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=faces"
//                     alt="Profile"
//                     className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
//                   <div className="absolute top-3 right-3">
//                     <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
//                   </div>
//                   <div className="absolute bottom-3 left-3 text-white">
//                     <div className="text-sm font-semibold">Emma, 25</div>
//                     <div className="text-xs opacity-80">2 miles away</div>
//                   </div>
//                 </div>

//                 <div className="relative overflow-hidden rounded-2xl shadow-xl transform rotate-2 hover:rotate-0 transition-all duration-500 group">
//                   <img
//                     src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces"
//                     alt="Profile"
//                     className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
//                   <div className="absolute top-3 right-3">
//                     <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
//                   </div>
//                   <div className="absolute bottom-3 left-3 text-white">
//                     <div className="text-sm font-semibold">James, 28</div>
//                     <div className="text-xs opacity-80">1 mile away</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Enhanced floating elements */}
//               <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
//                 <Heart className="w-10 h-10 text-white fill-white" />
//               </div>
//               <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
//                 <Sparkles className="w-8 h-8 text-white" />
//               </div>
//               <div className="absolute top-1/2 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-xl animate-bounce delay-500">
//                 <Star className="w-6 h-6 text-white fill-white" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-24 bg-white dark:bg-gray-800 transition-all duration-500">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6">
//               <Zap className="w-4 h-4 mr-2" />
//               Cutting-Edge Features
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//               Why Choose LoveConnect?
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
//               We make finding love simple, safe, and exciting with cutting-edge features designed for meaningful
//               connections
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className={`group card bg-gradient-to-br ${feature.bgGradient} shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 dark:border-gray-600 relative overflow-hidden`}
//               >
//                 {/* Animated background */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

//                 <div className="card-body items-center text-center p-8 relative z-10">
//                   <div
//                     className={`w-20 h-20 ${feature.iconBg} rounded-full flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300 relative`}
//                   >
//                     <feature.icon className="w-10 h-10 text-white" />
//                     <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
//                   </div>
//                   <h3 className="card-title text-2xl text-gray-900 dark:text-white mb-4 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{feature.description}</p>
//                   <div className="mt-6">
//                     <button className="btn btn-sm bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
//                       Learn More
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-24 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-full text-pink-600 dark:text-pink-400 text-sm font-semibold mb-6">
//               <Smartphone className="w-4 h-4 mr-2" />
//               Simple Process
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               Three simple steps to find your perfect match and start your love story
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-12">
//             {[
//               {
//                 step: 1,
//                 title: "Create Your Profile",
//                 description:
//                   "Add your best photos and tell us about yourself. Show your personality and what makes you unique.",
//                 image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=faces",
//                 icon: Camera,
//                 gradient: "from-pink-500 to-rose-500",
//               },
//               {
//                 step: 2,
//                 title: "Start Swiping",
//                 description: "Browse through potential matches and swipe right on people you're interested in meeting.",
//                 image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=300&fit=crop&crop=faces",
//                 icon: Heart,
//                 gradient: "from-rose-500 to-red-500",
//               },
//               {
//                 step: 3,
//                 title: "Make Connections",
//                 description: "When you both swipe right, it's a match! Start chatting and plan your first date.",
//                 image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop",
//                 icon: MessageCircle,
//                 gradient: "from-red-500 to-pink-500",
//               },
//             ].map((item, index) => (
//               <div key={index} className="text-center group">
//                 <div className="relative mb-8">
//                   <div
//                     className={`w-28 h-28 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-2xl group-hover:scale-110 transition-all duration-500 relative overflow-hidden`}
//                   >
//                     <span className="relative z-10">{item.step}</span>
//                     <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
//                   </div>
//                   <div className="absolute -inset-6 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 </div>

//                 <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8 group-hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-2">
//                   <img
//                     src={item.image || "/placeholder.svg"}
//                     alt={item.title}
//                     className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                   <div className="absolute bottom-4 left-4 text-white">
//                     <item.icon className="w-6 h-6" />
//                   </div>
//                   <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
//                     <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//                   </div>
//                 </div>

//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{item.description}</p>
//               </div>
//             ))}
//           </div>

//           {/* Connection Line */}
//           <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
//             <div className="relative">
//               <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 dark:from-pink-600 dark:via-rose-600 dark:to-red-600"></div>
//               <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 animate-pulse"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Success Stories Section */}
//       <section className="py-24 bg-white dark:bg-gray-800 transition-all duration-500">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full text-yellow-600 dark:text-yellow-400 text-sm font-semibold mb-6">
//               <Award className="w-4 h-4 mr-2" />
//               Real Success Stories
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Love Stories</h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               Real couples who found love on LoveConnect and are living their happily ever after
//             </p>
//           </div>

//           {/* Featured Testimonial */}
//           <div className="max-w-5xl mx-auto mb-16">
//             <div className="card bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-700 dark:to-gray-600 shadow-2xl border border-pink-100 dark:border-gray-600 overflow-hidden">
//               <div className="card-body p-8 md:p-12 relative">
//                 {/* Background decoration */}
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-rose-200/30 dark:from-pink-800/30 dark:to-rose-800/30 rounded-full blur-3xl"></div>

//                 <div className="flex items-center justify-center mb-8">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-8 h-8 text-yellow-400 fill-yellow-400 mx-1 animate-pulse" />
//                   ))}
//                 </div>

//                 <blockquote className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 text-center mb-8 italic leading-relaxed font-light">
//                   "{testimonials[currentTestimonial].text}"
//                 </blockquote>

//                 <div className="flex items-center justify-center">
//                   <div className="relative">
//                     <img
//                       src={testimonials[currentTestimonial].image || "/placeholder.svg"}
//                       alt={testimonials[currentTestimonial].name}
//                       className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-2xl"
//                     />
//                     <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
//                       <Heart className="w-4 h-4 text-white fill-white" />
//                     </div>
//                   </div>
//                   <div className="ml-6 text-center">
//                     <p className="font-bold text-gray-900 dark:text-white text-xl">
//                       {testimonials[currentTestimonial].name}
//                     </p>
//                     <div className="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400 mt-2">
//                       <div className="flex items-center">
//                         <MapPin className="w-4 h-4 mr-1" />
//                         {testimonials[currentTestimonial].location}
//                       </div>
//                       <div className="flex items-center">
//                         <Clock className="w-4 h-4 mr-1" />
//                         {testimonials[currentTestimonial].time}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Testimonial Navigation */}
//             <div className="flex justify-center space-x-3 mt-8">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentTestimonial(index)}
//                   className={`transition-all duration-300 ${
//                     index === currentTestimonial
//                       ? "w-12 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
//                       : "w-4 h-4 bg-gray-300 dark:bg-gray-600 hover:bg-pink-300 dark:hover:bg-pink-600 rounded-full"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

        //   {/* Animated Photo Grid */}
        //   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        //     {photoSets[currentPhotoSet].map((src, index) => (
        //       <div
        //         key={index}
        //         className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group"
        //       >
        //         <img
        //           src={src || "/placeholder.svg"}
        //           alt={`Happy couple ${index + 1}`}
        //           className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        //         />
        //         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        //         <div className="absolute bottom-4 left-4">
        //           <Heart className="w-6 h-6 text-red-400 fill-red-400 animate-pulse" />
        //         </div>
        //         <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
        //           ✓ Verified
        //         </div>
        //         <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        //       </div>
        //     ))}
        //   </div>
        // </div>
//       </section>

//       {/* App Download Section */}
//       <section className="py-24 bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="text-center lg:text-left">
//               <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
//                 <Download className="w-4 h-4 mr-2" />
//                 Download Our App
//               </div>
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//                 Take Love With You
//                 <span className="block text-pink-500">Everywhere</span>
//               </h2>
//               <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
//                 Download our mobile app and never miss a match. Swipe, chat, and connect on the go with our
//                 award-winning mobile experience.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <button className="btn btn-lg bg-black hover:bg-gray-800 text-white border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
//                   <Download className="mr-2 h-5 w-5" />
//                   App Store
//                 </button>
//                 <button className="btn btn-lg bg-green-600 hover:bg-green-700 text-white border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
//                   <Download className="mr-2 h-5 w-5" />
//                   Google Play
//                 </button>
//               </div>
//             </div>
//             <div className="relative">
//               <div className="relative mx-auto w-64 h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
//                 <img
//                   src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=500&fit=crop"
//                   alt="Mobile app"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//               </div>
//               <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
//                 <Smartphone className="w-8 h-8 text-white" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced CTA Section */}
//       <section className="py-24 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 relative overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-gradient-to-r from-pink-600/50 via-rose-600/50 to-red-600/50"></div>
//           <div className="absolute inset-0 opacity-20">
//             <div
//               className="absolute inset-0 animate-pulse"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
//               }}
//             />
//           </div>
//         </div>

//         {/* Floating elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-10 left-10 animate-float">
//             <Heart className="w-12 h-12 text-white/30 fill-white/30" />
//           </div>
//           <div className="absolute top-20 right-20 animate-float delay-1000">
//             <Sparkles className="w-8 h-8 text-white/30" />
//           </div>
//           <div className="absolute bottom-20 left-20 animate-float delay-2000">
//             <Star className="w-10 h-10 text-white/30 fill-white/30" />
//           </div>
//         </div>

//         <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
//           <div className="mb-8">
//             <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 shadow-lg">
//               <CheckCircle className="w-4 h-4 mr-2" />
//               Free to Join • No Credit Card Required • Start Instantly
//             </div>
//           </div>

//           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
//             Ready to Find Your
//             <span className="block">Perfect Match?</span>
//           </h2>
//           <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto leading-relaxed">
//             Join millions of singles who have found love on LoveConnect. Your story could be next!
//           </p>

//           <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
//             <button className="group btn btn-lg bg-white text-pink-500 hover:bg-pink-50 border-0 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100/50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//               <Users className="mr-2 h-6 w-6" />
//               <span className="relative z-10">Join Free Now</span>
//               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
//             </button>
//             <button className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-pink-500 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
//               <Play className="mr-2 h-5 w-5" />
//               Watch Success Stories
//             </button>
//           </div>

//           <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
//               <div className="text-3xl font-bold text-white">2 min</div>
//               <div className="text-pink-100 text-sm">Setup Time</div>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
//               <div className="text-3xl font-bold text-white">24/7</div>
//               <div className="text-pink-100 text-sm">Support</div>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
//               <div className="text-3xl font-bold text-white">100%</div>
//               <div className="text-pink-100 text-sm">Safe</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Footer */}
//       <footer className="bg-gray-900 text-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
//         <div className="relative">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//             <div className="grid md:grid-cols-4 gap-8">
//               <div className="md:col-span-2">
//                 <div className="flex items-center mb-6">
//                   <Heart className="w-10 h-10 text-pink-500 fill-pink-500 mr-3" />
//                   <span className="text-3xl font-bold">LoveConnect</span>
//                 </div>
//                 <p className="text-gray-400 mb-6 text-lg leading-relaxed max-w-md">
//                   Connecting hearts, one swipe at a time. Join millions of people finding love and meaningful
//                   relationships.
//                 </p>
//                 <div className="flex space-x-4">
//                   {[Globe, Lock, Shield, Award].map((Icon, index) => (
//                     <div
//                       key={index}
//                       className="w-12 h-12 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer"
//                     >
//                       <Icon className="w-6 h-6" />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold mb-6">Company</h3>
//                 <div className="space-y-3">
//                   {["About Us", "Careers", "Press", "Blog", "Investors"].map((item) => (
//                     <a
//                       key={item}
//                       href="#"
//                       className="block text-gray-400 hover:text-pink-400 transition-colors duration-300"
//                     >
//                       {item}
//                     </a>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold mb-6">Support</h3>
//                 <div className="space-y-3">
//                   {["Help Center", "Safety Tips", "Community Guidelines", "Contact Us", "Privacy Policy"].map(
//                     (item) => (
//                       <a
//                         key={item}
//                         href="#"
//                         className="block text-gray-400 hover:text-pink-400 transition-colors duration-300"
//                       >
//                         {item}
//                       </a>
//                     ),
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="border-t border-gray-800 mt-12 pt-8 text-center">
//               <p className="text-gray-500">© 2024 LoveConnect. All rights reserved. Made with ❤️ for love.</p>
//             </div>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default TinderScroll
