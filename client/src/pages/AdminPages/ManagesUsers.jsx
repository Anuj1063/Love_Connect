// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import BaseUrl from '../../utils/basUrl';

// const getAllUsers = async () => {
//   const response = await axios.get(`${BaseUrl}api/admin/getallusers`, {
//     withCredentials: true,
//   });
//   return response.data;
// };

// function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const result = await getAllUsers();
//         setUsers(result.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const suspendUser = async (id) => {
//     try {
//       await axios.post(`${BaseUrl}api/admin/suspend/${id}`, {}, { withCredentials: true });
//       setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, isDeleted: true } : u)));
//     } catch (error) {
//       console.error('Failed to suspend user', error);
//     }
//   };

//   const unsuspendUser = async (id) => {
//     try {
//       await axios.post(`${BaseUrl}api/admin/unsuspend/${id}`, {}, { withCredentials: true });
//       setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, isDeleted: false } : u)));
//     } catch (error) {
//       console.error('Failed to unsuspend user', error);
//     }
//   };

//   const editUser = async (id, updated) => {
//     try {
//       await axios.post(`${BaseUrl}api/admin/edit/${id}`, updated, { withCredentials: true });
//       setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, ...updated } : u)));
//     } catch (error) {
//       console.error('Failed to edit user', error);
//     }
//   };

//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(search.toLowerCase()) ||
//     user.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-base-200 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4">👥 Manage Users</h1>
//       <input
//         type="text"
//         placeholder="Search users by name or email"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="input input-bordered w-full max-w-md mb-6"
//       />
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full bg-white shadow-xl">
//             <thead>
//               <tr>
//                 <th>Photo</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((user) => (
//                 <tr key={user._id}>
//                   <td>
//                     <div className="avatar">
//                       <div className="w-12 h-12 mask mask-squircle">
//                         <img src={user.profile_pic || '/default-avatar.png'} alt="User" />
//                       </div>
//                     </div>
//                   </td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     <span className={`badge ${user.isDeleted ? 'badge-error' : 'badge-success'}`}>
//                       {user.isDeleted ? 'Suspended' : 'Active'}
//                     </span>
//                   </td>
//                   <td className="space-x-2">
//                     {user.isDeleted ? (
//                       <button onClick={() => unsuspendUser(user._id)} className="btn btn-xs btn-success">
//                         Unsuspend
//                       </button>
//                     ) : (
//                       <button onClick={() => suspendUser(user._id)} className="btn btn-xs btn-error">
//                         Suspend
//                       </button>
//                     )}
//                     <button
//                       onClick={() => {
//                         const name = prompt('Enter new name:', user.name);
//                         const email = prompt('Enter new email:', user.email);
//                         if (name && email) editUser(user._id, { name, email });
//                       }}
//                       className="btn btn-xs btn-info"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ManageUsers;

///////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import { Search, Shield, ShieldCheck, Edit3, UserX, UserCheck, Crown, User, Users, Mail, Eye } from 'lucide-react';
import axios from 'axios';
import BaseUrl from '../../utils/basUrl';
import { Link } from 'react-router-dom';

const getAllUsers = async () => {
  const response = await axios.get(`${BaseUrl}api/admin/getallusers`, {
    withCredentials: true,
  });
  return response.data;
};

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers();
        setUsers(result.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const suspendUser = async (id) => {
    try {
      await axios.post(`${BaseUrl}api/admin/suspend/${id}`, {}, { withCredentials: true });
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, isDeleted: true } : u)));
    } catch (error) {
      console.error('Failed to suspend user', error);
    }
  };

  const unsuspendUser = async (id) => {
    try {
      await axios.post(`${BaseUrl}api/admin/unsuspend/${id}`, {}, { withCredentials: true });
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, isDeleted: false } : u)));
    } catch (error) {
      console.error('Failed to unsuspend user', error);
    }
  };

  const editUser = async (id, updated) => {
    try {
      await axios.post(`${BaseUrl}api/admin/edit/${id}`, updated, { withCredentials: true });
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, ...updated } : u)));
    } catch (error) {
      console.error('Failed to edit user', error);
    }
  };

  const toggleVerification = async (id) => {
    try {
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, isVerified: !u.isVerified } : u)));
    } catch (error) {
      console.error('Failed to toggle verification', error);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4" />;
      case 'moderator': return <Shield className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'badge-warning';
      case 'moderator': return 'badge-info';
      default: return 'badge-ghost';
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                         user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && !user.isDeleted) ||
                         (filterStatus === 'suspended' && user.isDeleted);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => !u.isDeleted).length,
    suspended: users.filter(u => u.isDeleted).length,
    verified: users.filter(u => u.isVerified).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-purple-500 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-slate-600 mt-1">Manage and monitor your platform users</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input input-bordered w-full pl-12 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 focus:border-purple-400 focus:bg-white transition-all duration-200"
                />
              </div>
              
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="select select-bordered bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 focus:border-blue-400 focus:bg-white min-w-40"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
              
              <select 
                value={filterRole} 
                onChange={(e) => setFilterRole(e.target.value)}
                className="select select-bordered bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 focus:border-green-400 focus:bg-white min-w-40"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gradient-to-r from-purple-100 to-pink-100">
                <tr>
                  <th className="text-purple-700 font-semibold">User</th>
                  <th className="text-purple-700 font-semibold">Contact</th>
                  <th className="text-purple-700 font-semibold">Role</th>
                  <th className="text-purple-700 font-semibold">Status</th>
                  <th className="text-purple-700 font-semibold">Verification</th>
                  <th className="text-purple-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-200">
                    <td>
                      <div className="flex items-center gap-4">
                        
                        <div>
                          <div className="font-semibold text-slate-800">{user.name}</div>
                          <div className="text-sm text-slate-500">ID: {user._id}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </td>
                    
                    <td>
                      <div className={`badge ${getRoleColor(user.role)} gap-2 font-medium shadow-sm`}>
                        {getRoleIcon(user.role)}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </div>
                    </td>
                    
                    <td>
                      <div className={`badge ${user.isDeleted ? 'badge-error' : 'badge-success'} gap-2 shadow-sm`}>
                        {user.isDeleted ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                        {user.isDeleted ? 'Suspended' : 'Active'}
                      </div>
                    </td>
                    
                    <td>
                      <button
                        onClick={() => toggleVerification(user._id)}
                        className={`badge cursor-pointer transition-all duration-200 shadow-sm ${
                          user.isVerified 
                            ? 'badge-info hover:badge-info/80' 
                            : 'badge-ghost hover:badge-warning'
                        } gap-2`}
                      >
                        {user.isVerified ? <ShieldCheck className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                        {user.isVerified ? 'Verified' : 'Unverified'}
                      </button>
                    </td>
                    
                    <td>
                      <div className="flex gap-2">
                        {user.isDeleted ? (
                          <button 
                            onClick={() => unsuspendUser(user._id)} 
                            className="btn btn-sm btn-success gap-2 hover:scale-105 transition-transform shadow-sm"
                          >
                            <UserCheck className="w-4 h-4" />
                            Unsuspend
                          </button>
                        ) : (
                          <button 
                            onClick={() => suspendUser(user._id)} 
                            className="btn btn-sm btn-error gap-2 hover:scale-105 transition-transform shadow-sm"
                          >
                            <UserX className="w-4 h-4" />
                            Suspend
                          </button>
                        )}
                        
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="btn btn-sm btn-warning gap-2 hover:scale-105 transition-transform shadow-sm"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>

<Link 
  to={`/useralldetails/${user._id}`}
  className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white hover:from-pink-600 hover:to-rose-600 transform hover:scale-110 transition-all duration-200 shadow-lg"
  onClick={(e) => e.stopPropagation()}
>
  <Eye className="w-5 h-5" />
</Link>

                        
                       

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-purple-400 mb-4">
                <Users className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No users found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Edit User Modal */}
        {selectedUser && (
          <div className="modal modal-open">
            <div className="modal-box max-w-md bg-white/90 backdrop-blur-sm border border-white/20">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-purple-700">
                <Edit3 className="w-5 h-5" />
                Edit User
              </h3>
              
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-slate-700">Name</span>
                  </label>
                  <input 
                    type="text" 
                    className="input input-bordered bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 focus:border-purple-400" 
                    defaultValue={selectedUser.name}
                    id="edit-name"
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-slate-700">Email</span>
                  </label>
                  <input 
                    type="email" 
                    className="input input-bordered bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 focus:border-blue-400" 
                    defaultValue={selectedUser.email}
                    id="edit-email"
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-slate-700">Role</span>
                  </label>
                  <select className="select select-bordered bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 focus:border-green-400" defaultValue={selectedUser.role} id="edit-role">
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              
              <div className="modal-action">
                <button 
                  className="btn btn-ghost hover:bg-slate-100" 
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </button>
                <button 
                  className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600"
                  onClick={() => {
                    const name = document.getElementById('edit-name').value;
                    const email = document.getElementById('edit-email').value;
                    const role = document.getElementById('edit-role').value;
                    editUser(selectedUser._id, { name, email, role });
                    setSelectedUser(null);
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
            <div className="modal-backdrop" onClick={() => setSelectedUser(null)}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;