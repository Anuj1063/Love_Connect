









import React, { useState, useEffect } from 'react';
import { Search, Heart, MessageCircle, Loader2, User, Sparkles } from 'lucide-react';
import BaseUrl from '../utils/basUrl';
import { Link } from 'react-router-dom';

function Message() {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const getToken = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('auth_token'));
      if (tokenCookie) {
        token = decodeURIComponent(tokenCookie.split('=')[1]);
      }
    }
    return token;
  };

  const fetchMatches = async () => {
    const token = getToken();
    if (!token) {
      setError('Authentication required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}api/match/matches`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token,
        }
      });

      if (!response.ok) {
        //console.log(response)
      }

      const data = await response.json();
      const fetchedMatches = data.matches || data.data || [];
      setMatches(fetchedMatches);
      setFilteredMatches(fetchedMatches);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMatches(matches);
    } else {
      const filtered = matches.filter(match =>
        match.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.interests?.some(interest =>
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredMatches(filtered);
    }
  }, [searchTerm, matches]);

  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
  };

  const likesCount = 8; // 🔁 Replace with dynamic count if needed

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 animate-ping bg-pink-400 rounded-full opacity-20"></div>
            <Loader2 className="animate-spin text-pink-500 w-16 h-16 relative z-10" />
          </div>
          <p className="text-gray-600 font-medium">Finding your matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-red-500 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No matches yet</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchMatches}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Heart className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Your Matches</h1>
                <p className="text-sm text-gray-500">{filteredMatches.length} people nearby</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-full border border-pink-200">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-pink-700">Ready to connect</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, bio, or interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-pink-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-500">Try adjusting your search or check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* 👍 Likes You Card */}
           <Link
  to="/likes-you"
  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-transform duration-300 border border-yellow-300 hover:-translate-y-1 overflow-hidden"
>
  {/* Glowing Background Section */}
  <div className="relative h-52 flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-50 to-white">
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/70 to-yellow-400/50 blur-md opacity-60 group-hover:opacity-80 transition duration-300"></div>

    {/* Heartbeat Icon */}
    <div className="z-10 flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-yellow-400 text-white font-extrabold text-3xl flex items-center justify-center shadow-md border-4 border-white animate-pulse">
        <h1 className="animate-[heartbeat_1.4s_ease-in-out_infinite]">?</h1>
      </div>
      <p className="mt-2 text-white font-semibold text-lg drop-shadow">Likes</p>
    </div>
  </div>

  {/* Footer Text */}
  <div className="bg-white py-3 px-4 text-center border-t border-yellow-200">
    <span className="text-sm font-medium text-yellow-600 flex items-center justify-center gap-1">
      <Heart className="w-4 h-4 text-yellow-500" />
      People who liked you
    </span>
  </div>

  {/* Decorative Glow Circles */}
  <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-300 opacity-10 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 opacity-20 rounded-full blur-3xl"></div>
</Link>



            {/* Matches */}
            {filteredMatches.map((match, idx) => (
              <div
                key={match.id || idx}
                className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => handleMatchSelect(match)}
              >
                <div className="relative h-48 overflow-hidden">
                  {match.profileImages?.length > 0 ? (
                    <img
                      src={match.profileImages[0]}
                      alt={match.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
                      <User className="w-12 h-12 text-pink-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{match.name}</h3>
                      <p className="text-sm text-gray-500 font-medium">
                        {match.age ? `${match.age} years old` : 'Age not specified'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <Link
                        to={`/chat/${match.userId}`}
                        className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white hover:from-pink-600 hover:to-rose-600 transform hover:scale-110 transition-all duration-200 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {match.bio && (
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {match.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
