
import BaseUrl from "./basUrl";

const getUserId = async () => {
  const token = localStorage.getItem('token'); // <-- get token from localStorage

  if (!token) return null;

  try {
    const response = await fetch(`${BaseUrl}api/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token, // or Authorization: `Bearer ${token}` if your backend expects it
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch user profile:", response.status);
      return null;
    }

    const user = await response.json();

    console.log(user)

   
const { _id } = user.Data;          // extract _id from the nested Data object

console.log("User ID:", _id);

    // Adjust this if your API wraps the user inside a data field
    return _id || null;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
};

export default getUserId;
