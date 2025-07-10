




import React, { useEffect, useState } from "react";
import axios from "axios";

import BaseUrl from "../../utils/basUrl";

const getAllComments = async () => {
  const response = await axios.get(`${BaseUrl}api/admin/getallcoments`, {
    withCredentials: true,
  });
  return response.data;
};

const enableComment = async (id) => {
  return axios.get(`${BaseUrl}api/enableComment/${id}`, {
    withCredentials: true,
  });
};

const disableComment = async (id) => {
  return axios.get(`${BaseUrl}api/disableComment/${id}`, {
    withCredentials: true,
  });
};

const ManageComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getAllComments();
        // Fix: Properly map comments - approved when isDelete is false (not deleted)
        const formatted = res.comments?.map((comment) => ({
          ...comment,
          approved: comment.isDelete === false, // Comments are approved when NOT deleted
        })) || [];
        setComments(formatted);
      } catch (err) {
        setError("Failed to load comments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
          {i < rating ? "★" : "☆"}
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
    </div>
  );

  const toggleApproval = async (id, isCurrentlyApproved) => {
    try {
      // Update UI optimistically
      setComments((prev) =>
        prev.map((c) => (c._id === id ? { ...c, approved: !isCurrentlyApproved } : c))
      );

      // Make API call - Fix: Use correct logic for enable/disable
      if (isCurrentlyApproved) {
        // If currently approved, disable it
        await disableComment(id);
      } else {
        // If currently disabled, enable it
        await enableComment(id);
      }
    } catch (err) {
      console.error(err);
      // Revert the optimistic update on error
      setComments((prev) =>
        prev.map((c) => (c._id === id ? { ...c, approved: isCurrentlyApproved } : c))
      );
      
      // Show error notification
      const errorMsg = document.createElement('div');
      errorMsg.className = 'fixed top-4 right-4 z-50 alert alert-error max-w-sm';
      errorMsg.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Failed to update comment status</span>
      `;
      document.body.appendChild(errorMsg);
      setTimeout(() => {
        if (document.body.contains(errorMsg)) {
          document.body.removeChild(errorMsg);
        }
      }, 3000);
    }
  };

  // Filter comments based on search and status
  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.userDetails?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "approved" && comment.approved) ||
                         (statusFilter === "disabled" && !comment.approved);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Comments</h1>
        <p className="text-gray-600">Review and manage user comments and ratings</p>
      </div>

      {/* Controls */}
      <div className="card bg-base-100 shadow-lg mb-6">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="form-control w-full max-w-md">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search comments or users..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-square btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Filter */}
            <div className="form-control">
              <select 
                className="select select-bordered"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Comments</option>
                <option value="approved">Approved Only</option>
                <option value="disabled">Disabled Only</option>
              </select>
            </div>

            {/* Stats */}
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total</div>
                <div className="stat-value text-primary">{comments.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Approved</div>
                <div className="stat-value text-success">{comments.filter(c => c.approved).length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Disabled</div>
                <div className="stat-value text-error">{comments.filter(c => !c.approved).length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-base-200">
                  <th className="text-left">User</th>
                  <th className="text-left">Comment</th>
                  <th className="text-left">Rating</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredComments.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-12">
                      <div className="flex flex-col items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <div className="text-lg font-medium text-gray-500">No comments found</div>
                        <div className="text-sm text-gray-400">
                          {searchTerm || statusFilter !== "all" 
                            ? "Try adjusting your search or filter criteria" 
                            : "Comments will appear here once users start posting reviews"}
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredComments.map((comment) => (
                    <tr key={comment._id} className="hover">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={
                                  comment.userProfileDetails?.profileImages?.[0]
                                    ? `${BaseUrl}uploads/profile/${comment.userProfileDetails.profileImages[0]}`
                                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                                alt="Profile"
                                className="object-cover"
                                onError={(e) => {
                                  e.target.src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">
                              {comment.userDetails?.name || "Anonymous"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Unknown date"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="max-w-md">
                          <p className="text-sm leading-relaxed line-clamp-3">
                            {comment.comment || "No comment text"}
                          </p>
                        </div>
                      </td>
                      <td>
                        {comment.rating ? renderStars(comment.rating) : (
                          <span className="text-gray-400 text-sm">No rating</span>
                        )}
                      </td>
                      <td className="text-center">
                        <div className="form-control">
                          <label className="label cursor-pointer justify-center gap-3">
                            <span className={`text-sm font-medium ${comment.approved ? 'text-success' : 'text-error'}`}>
                              {comment.approved ? 'Approved' : 'Disabled'}
                            </span>
                            <input
                              type="checkbox"
                              className="toggle toggle-success"
                              checked={comment.approved}
                              onChange={() => toggleApproval(comment._id, comment.approved)}
                            />
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      {filteredComments.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredComments.length} of {comments.length} comments
        </div>
      )}
    </div>
  );
};

export default ManageComments;