// import BaseUrl from "../../utils/basUrl";

// // export const addUsersDetails = async (data) => {
// //   try {
// //     const token = localStorage.getItem("token"); // fallback if cookie is missing

// //     const response = await BaseUrl.post("/api/profile/insert", data, {
// //       headers: {
// //         'Content-Type': 'multipart/form-data',
// //         ...(token && { 'Authorization': `Bearer ${token}` }), // add only if exists
// //       },
// //       withCredentials: true, // send cookies
// //     });

// //     return response;
// //   } catch (error) {
// //     return error?.response;
// //   }
// // };


// // userApi.js



// export const addUsersDetails = async (data) => {
//   let token =
//     document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] ||
//     localStorage.getItem('token');

//   if (!token) {
//     console.warn('No token found in cookies or localStorage');
//     throw new Error('Authentication token not found');
//   }

//   try {
//     const response = await post('http://127.0.0.1:4000/api/profile/insert', data, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json', // Explicitly set content type
//       },
//     });
//     return response;
//   } catch (error) {
//     console.error('Error from addUsersDetails:', error);
    
//     // More specific error handling
//     if (error.response?.status === 401) {
//       throw new Error('Unauthorized: Please log in again');
//     } else if (error.response?.status === 400) {
//       throw new Error('Invalid data provided');
//     }
    
//     throw error; // Re-throw to let caller handle
//   }
// };



import axios from 'axios';

export const addUsersDetails = async (data) => {
  let token =
    document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] ||
    localStorage.getItem('token');

  if (!token) {
    console.warn('No token found in cookies or localStorage');
  }

  try {
    const response = await axios.post('http://127.0.0.1:4000/api/profile/insert', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error from addUsersDetails:', error);
    return error?.response;
  }
};