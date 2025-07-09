const BaseUrl = import.meta.env.MODE === "production"
  ? "https://love-connect-1.onrender.com/"
  : "http://localhost:4000/";

export default BaseUrl;
