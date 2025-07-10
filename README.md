# ❤️ Love Connect - Backend API

Love Connect is the backend for a modern matchmaking app, built with **Node.js**, **Express.js**, and **MongoDB**. It supports authentication, user profiles, match system, chat, and more.

## 🔗 Deployed URL

👉 https://love-connect-1.onrender.com  
*(Replace this with your actual deployed URL)*

---

## 🚀 Features

- JWT Authentication with Refresh Tokens
- User Profiles and Photo Uploads
- Like / Match / Unmatch Functionality
- Real-Time Messaging (Socket.io/WebSocket ready)
- Admin APIs (optional)
- Token storage in HTTP-only cookies
- Redis support for token/session storage

---

## 🛠 Tech Stack

- **Node.js**, **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** Authentication
- **Multer** for file uploads
- **Redis** for token caching
- **Cloudinary** for image storage *(optional)*

---

## 📁 Folder Structure

love-connect/
│
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ └── ...
│
├── server/ # Node.js backend
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ └── ...
│
├── .gitignore
├── README.md
└── package.json


---

## 🚀 Features

- 🧑 User Registration & Secure Login (JWT + Refresh Tokens)
- ❤️ Like / Match / Unmatch Mechanism
- 👤 Profile Management with Image Upload
- 💬 Real-Time Chat (Socket.io/WebSockets ready)
- 🍪 HTTP-only Cookies for Token Storage
- 🔐 Redis Integration for Refresh Tokens
- 🛡️ Role-based Access for Admin APIs *(optional)*

---

## 🛠 Tech Stack

| Layer        | Tech                             |
|--------------|----------------------------------|
| Frontend     | React, Axios, Tailwind, React Router |
| Backend      | Node.js, Express.js              |
| Database     | MongoDB with Mongoose            |
| Auth         | JWT, Refresh Tokens, HTTP-only Cookies |
| File Upload  | Multer + Cloudinary              |
| Caching      | Redis                            |
| Deployment   | Vercel / Railway / Render        |

---

## 📦 Setup Instructions

### 🔧 Prerequisites

- Node.js
- MongoDB (local or Atlas)
- Redis (local or cloud)
- Cloudinary account *(optional)*

---

## 🖥️ Local Development

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/love-connect.git
cd love-connect
```

