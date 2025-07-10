


import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../../utils/basUrl";
import { PacmanLoader } from "react-spinners";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const getAllUsers = async () => {
  const response = await axios.get(`${BaseUrl}api/admin/getallusers`, {
    withCredentials: true
  });
  return response.data;
};

function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, verifiedUsers: 0, reportedUsers: 0, premiumUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setError(null);
        const result = await getAllUsers();
        const users = result?.data || [];

        const totalUsers = users.length;
        const verifiedUsers = users.filter(user => user.isVerified).length;
        const reportedUsers = users.filter(user => user.reports && user.reports.length > 0).length;
        const premiumUsers = users.filter(user => user.isPremium).length;

        setStats({ totalUsers, verifiedUsers, reportedUsers, premiumUsers });
      } catch (err) {
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Calculate count-up animation
  const CountUp = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, [end, duration]);
    
    return <span>{count}</span>;
  };

  const pieData = [
    { name: 'Verified', value: stats.verifiedUsers, color: '#10B981' },
    { name: 'Reported', value: stats.reportedUsers, color: '#EF4444' },
    { name: 'Premium', value: stats.premiumUsers, color: '#F59E0B' },
    { name: 'Others', value: Math.max(0, stats.totalUsers - stats.verifiedUsers - stats.reportedUsers - stats.premiumUsers), color: '#6366F1' }
  ];

  const StatCard = ({ icon, title, value, gradient, iconBg, trend = "+12%" }) => (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-lg border border-gray-200/60 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
        <div className="flex items-start justify-between mb-6">
          <div className={`${iconBg} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
            <div className="text-2xl text-white font-bold">
              {icon}
            </div>
          </div>
          <div className="text-right">
            <div className="text-emerald-600 text-sm font-medium flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
              <span className="text-xs">↗</span>
              {trend}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-gray-600 text-sm font-semibold uppercase tracking-wider">{title}</p>
          <p className="text-gray-800 text-4xl font-bold">
            <CountUp end={value} duration={2} />
          </p>
        </div>
        <div className={`mt-6 h-2 ${gradient} rounded-full shadow-md`}></div>
      </div>
    </div>
  );

  const ActionButton = ({ icon, text, color, hoverColor }) => (
    <button className={`group relative overflow-hidden ${color} hover:${hoverColor} text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex items-center justify-center gap-3">
        <span className="text-lg font-bold">{icon}</span>
        <span className="font-medium">{text}</span>
      </div>
    </button>
  );

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center items-center">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur opacity-50 animate-pulse"></div>
        <PacmanLoader color="#3B82F6" size={40} />
      </div>
      <p className="mt-8 text-gray-700 text-xl font-medium animate-pulse">Loading dashboard...</p>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center">
      <div className="bg-red-50 backdrop-blur-lg border border-red-200 text-red-800 p-8 rounded-3xl shadow-xl">
        <div className="text-center">
          <div className="text-5xl mb-4 text-red-500">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">System Error</h2>
          <p className="text-lg opacity-90">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300"></div>
      </div>

      <div className="relative z-10 p-6 md:p-10 space-y-12">
        {/* Enhanced Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-300 to-purple-300 rounded-3xl blur opacity-50 group-hover:opacity-70 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-5 rounded-3xl shadow-2xl transform group-hover:scale-110 transition duration-300">
                  <div className="text-4xl text-white font-bold">📊</div>
                </div>
              </div>
              <div>
                <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  ADMIN PANEL
                </h1>
                <p className="text-gray-600 text-xl font-medium mt-2 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  Real-time analytics & insights
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-lg border border-gray-200/60 rounded-3xl p-6 shadow-xl">
              <div className="text-center space-y-2">
                <div className="text-blue-600 text-sm font-bold uppercase tracking-wider">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
                <div className="text-gray-800 text-3xl font-bold">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-gray-600 text-lg font-medium">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <StatCard
            icon="👥"
            title="Total Users"
            value={stats.totalUsers}
            gradient="bg-gradient-to-r from-blue-400 to-cyan-400"
            iconBg="bg-gradient-to-r from-blue-500 to-cyan-500"
            trend="+8%"
          />
          <StatCard
            icon="✅"
            title="Verified Users"
            value={stats.verifiedUsers}
            gradient="bg-gradient-to-r from-emerald-400 to-teal-400"
            iconBg="bg-gradient-to-r from-emerald-500 to-teal-500"
            trend="+15%"
          />
          <StatCard
            icon="👑"
            title="Premium Users"
            value={stats.premiumUsers}
            gradient="bg-gradient-to-r from-amber-400 to-orange-400"
            iconBg="bg-gradient-to-r from-amber-500 to-orange-500"
            trend="+23%"
          />
          <StatCard
            icon="⚠️"
            title="Reported Users"
            value={stats.reportedUsers}
            gradient="bg-gradient-to-r from-red-400 to-pink-400"
            iconBg="bg-gradient-to-r from-red-500 to-pink-500"
            trend="-5%"
          />
        </div>

        {/* Enhanced Charts and Actions Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Chart Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-lg border border-gray-200/60 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-lg">
                  <div className="text-white text-2xl font-bold">📈</div>
                </div>
                <h2 className="text-gray-800 text-3xl font-bold">User Distribution</h2>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50/90 to-white/90 rounded-3xl p-8 border border-gray-100 shadow-inner">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      innerRadius={70}
                      paddingAngle={3}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '16px',
                        color: '#374151',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                        padding: '12px 16px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Enhanced Legend */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50/80 rounded-2xl hover:bg-gray-100/80 transition-all duration-300">
                    <div 
                      className="w-5 h-5 rounded-full shadow-lg border-2 border-white" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-800 font-semibold text-sm">{item.name}</div>
                      <div className="text-gray-500 text-xs">{((item.value / stats.totalUsers) * 100).toFixed(1)}%</div>
                    </div>
                    <div className="text-gray-700 font-bold text-lg">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Actions Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-lg border border-gray-200/60 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-2xl shadow-lg">
                  <div className="text-white text-2xl font-bold">⚡</div>
                </div>
                <h2 className="text-gray-800 text-3xl font-bold">Quick Actions</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <ActionButton
                  icon="👤"
                  text="Manage Users"
                  color="bg-gradient-to-r from-blue-500 to-blue-600"
                  hoverColor="from-blue-400 to-blue-500"
                />
                <ActionButton
                  icon="🚩"
                  text="Review Reports"
                  color="bg-gradient-to-r from-red-500 to-red-600"
                  hoverColor="from-red-400 to-red-500"
                />
                <ActionButton
                  icon="✔️"
                  text="Verify Users"
                  color="bg-gradient-to-r from-emerald-500 to-emerald-600"
                  hoverColor="from-emerald-400 to-emerald-500"
                />
                <ActionButton
                  icon="📊"
                  text="Deep Analytics"
                  color="bg-gradient-to-r from-purple-500 to-purple-600"
                  hoverColor="from-purple-400 to-purple-500"
                />
              </div>

              {/* Enhanced Status Cards */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 border border-amber-200/60 rounded-2xl p-6 backdrop-blur-sm hover:from-amber-100/80 hover:to-orange-100/80 transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-3 rounded-xl shadow-lg">
                        <div className="text-white text-xl font-bold">🔔</div>
                      </div>
                      <div>
                        <p className="text-gray-800 font-bold text-lg">Pending Notifications</p>
                        <p className="text-gray-600 text-sm">Requires immediate attention</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 rounded-2xl font-bold text-xl shadow-lg">
                      {stats.reportedUsers}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 border border-purple-200/60 rounded-2xl p-6 backdrop-blur-sm hover:from-purple-100/80 hover:to-pink-100/80 transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-xl shadow-lg">
                        <div className="text-white text-xl font-bold">💎</div>
                      </div>
                      <div>
                        <p className="text-gray-800 font-bold text-lg">Premium Revenue</p>
                        <p className="text-gray-600 text-sm">Active subscriptions</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-3 rounded-2xl font-bold text-xl shadow-lg">
                      {stats.premiumUsers}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
















