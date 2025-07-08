import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../utils/basUrl';
import { AlertTriangle, User, Mail, Calendar, Shield, Clock, ChevronDown, ChevronUp } from 'lucide-react';

function ReportedUsers() {
  const [reportedUsers, setReportedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUsers, setExpandedUsers] = useState(new Set());

  useEffect(() => {
    const fetchReportedUsers = async () => {
      try {
        const res = await axios.get(`${BaseUrl}auth/reported-users`, {
          withCredentials: true,
        });
         
        if (res.data.success) {
          setReportedUsers(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch reported users:', error);
      } finally {
        setLoading(false);
      }
    };
     
    fetchReportedUsers();
  }, []);

  const toggleExpanded = (userId) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  const getSeverityColor = (reportCount) => {
    if (reportCount >= 5) return 'bg-red-50 border-red-200 text-red-700';
    if (reportCount >= 3) return 'bg-orange-50 border-orange-200 text-orange-700';
    return 'bg-yellow-50 border-yellow-200 text-yellow-700';
  };

  const getSeverityBadge = (reportCount) => {
    if (reportCount >= 5) return 'bg-red-500 text-white';
    if (reportCount >= 3) return 'bg-orange-500 text-white';
    return 'bg-yellow-500 text-white';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-medium">Loading reported users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Reported Users</h1>
          <p className="text-gray-600 text-lg">Monitor and manage user reports</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Reports</p>
                <p className="text-2xl font-bold text-gray-800">
                  {reportedUsers.reduce((acc, user) => acc + user.totalReports, 0)}
                </p>
              </div>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Reported Users</p>
                <p className="text-2xl font-bold text-gray-800">{reportedUsers.length}</p>
              </div>
              <User className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">High Risk</p>
                <p className="text-2xl font-bold text-gray-800">
                  {reportedUsers.filter(user => user.totalReports >= 5).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Users List */}
        {reportedUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-600 text-lg">No reported users found.</p>
            <p className="text-gray-500 text-sm mt-2">Your community is safe and sound!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reportedUsers.map((user) => (
              <div 
                key={user._id} 
                className={`bg-white/90 backdrop-blur-lg rounded-2xl border shadow-lg transition-all duration-300 hover:shadow-xl ${getSeverityColor(user.totalReports)}`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityBadge(user.totalReports)}`}>
                        {user.totalReports} Reports
                      </span>
                      <button
                        onClick={() => toggleExpanded(user._id)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        {expandedUsers.has(user._id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-700" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-700" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Reports */}
                  {expandedUsers.has(user._id) && (
                    <div className="mt-6 space-y-3 animate-in slide-in-from-top-2 duration-300">
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                          Report Details
                        </h4>
                        {user.reports.map((report, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-3 last:mb-0"
                          >
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="text-gray-800 font-medium">{report.reason}</p>
                                  <div className="flex items-center space-x-4 mt-2 text-gray-600 text-sm">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>{new Date(report.reportedAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Clock className="w-4 h-4" />
                                      <span>{new Date(report.reportedAt).toLocaleTimeString()}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="border-t border-gray-200 pt-2">
                                <p className="text-gray-600 text-sm">
                                  <span className="font-medium">Reported by:</span> {report.reportedBy.name}
                                </p>
                                <p className="text-gray-500 text-xs">{report.reportedBy.email}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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

export default ReportedUsers;