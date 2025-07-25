





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../utils/basUrl';


function PastUsers() {
  const [pastUsers, setPastUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retrievingId, setRetrievingId] = useState(null);
  const [error, setError] = useState('');

  const getPastUsers = async () => {
    try {
      const response = await axios.get(`${BaseUrl}api/admin/getallpast-users`, {
        withCredentials: true,
      });
      setPastUsers(response.data.data || []);
    } catch (err) {
      setError('Failed to load past users.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetrieve = async (userId) => {
    try {
      setRetrievingId(userId);
      await axios.post(`${BaseUrl}api/admin/getDeletedUserAccount/${userId}`, {}, {
        withCredentials: true,
      });
      setPastUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      alert('Failed to retrieve user.');
    } finally {
      setRetrievingId(null);
    }
  };

  useEffect(() => {
    getPastUsers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main content area */}
      <main className="flex-grow p-6">
        <h2 className="text-3xl font-bold mb-6 text-pink-600">Past Users</h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner text-pink-600"></span>
          </div>
        ) : error ? (
          <div className="alert alert-error shadow-lg">{error}</div>
        ) : pastUsers.length === 0 ? (
          <div className="text-gray-500">No past users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full bg-white rounded-xl shadow">
              <thead className="bg-pink-100 text-pink-800 text-sm uppercase">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Verified</th>
                  <th>Role</th>
                  <th>Deleted</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pastUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isVerified ? 'Yes' : 'No'}</td>
                    <td className="capitalize">{user.role}</td>
                    <td>{user.isDeleted ? 'Yes' : 'No'}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleRetrieve(user._id)}
                        disabled={retrievingId === user._id}
                      >
                        {retrievingId === user._id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          'Retrieve'
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className=" text-sm py-4 ">
      
      </footer>
    </div>
  );
}

export default PastUsers;
