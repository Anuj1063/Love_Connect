// // 🔧 app/utils/socket.util.js

// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: [
//           "http://localhost:5173"       // Vite default port (if used later)
//     ],
//     credentials: true,
//   },
// });

// // const userSocketMap = {}; // { userId: socketId }

// // function getReceiverSocketId(userId) {
// //   return userSocketMap[userId];
// // }

// // function initSocketIO() {
// //   io.on("connection", (socket) => {
// //     console.log("✅ A user connected", socket.id);

// //     const userId = socket.handshake.query.userId;
// //     if (userId) userSocketMap[userId] = socket.id;

// //     io.emit("getOnlineUsers", Object.keys(userSocketMap));

// //     socket.on("disconnect", () => {
// //       console.log("❌ A user disconnected", socket.id);
// //       delete userSocketMap[userId];
// //       io.emit("getOnlineUsers", Object.keys(userSocketMap));
// //     });
// //   });
// // }

// // module.exports = {
// //   app,
// //   server,
// //   io,
// //   getReceiverSocketId,
// //   initSocketIO,
// // };


// io.on ("connection",(socket)=>{
//   socket.on("joinChat",({userId,targetUserId})=>{
//     const roomId= [userId,targetUserId].join("_");


//     console.log("join Room :",roomId);
//     socket.join(roomId);
//   });

//   socket.on("sendMessage",()=>{})
// })




// module.exports = {
//   app,
//   server,
//   io,
//   getReceiverSocketId,
//   initSocketIO,
// };
















////////////////////////////////////////////






// // 🔧 app/utils/socket.util.js

// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173"], // Add your frontend URL here
//     credentials: true,
//   },
// });

// // To keep track of connected users
// const userSocketMap = {}; // { userId: socketId }

// function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

// function initSocketIO() {
//   io.on("connection", (socket) => {
//   socket.on("joinChat", ({ userId, targetUserId }) => {
//     if (!userId || !targetUserId) return;

//     const roomId = [userId, targetUserId].sort().join("_");
//     console.log("🟢 joinRoom:", roomId);
//     socket.join(roomId);
//   });

//   socket.on("send_message", ({ from, to, text }) => {
//     const roomId = [from, to].sort().join("_");
//     const message = { from, to, text };
//     console.log("📤 send_message to room:", roomId, message);

//     io.to(roomId).emit("receive_message", message);
//   });
// });

// }

// module.exports = {
//   app,
//   server,
//   io,
//   getReceiverSocketId,
//   initSocketIO,
// };
















const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS config
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Your frontend URL
    credentials: true,
  },
});

// To keep track of connected users
const userSocketMap = {}; // { userId: socketId }

// 🔧 Get a user's socket ID by their userId
function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// 🔌 Initialize Socket.IO events
// function initSocketIO() {
//   io.on("connection", (socket) => {
//     console.log("🔌 New client connected:", socket.id);

//     // When user joins a chat room
//     socket.on("joinChat", ({ userId, targetUserId }) => {
//       if (!userId || !targetUserId) return;

//       const roomId = [userId, targetUserId].sort().join("_");
//       socket.join(roomId);

//       // 🧠 Save user's socket ID
//       userSocketMap[userId] = socket.id;
//       console.log("🟢 joinRoom:", roomId);
//       console.log("📍 userSocketMap updated:", userSocketMap);
//     });

//     // When user sends a message
//     socket.on("send_message", ({ from, to, text }) => {
//       const roomId = [from, to].sort().join("_");
//       const message = { from, to, text };

//       console.log("📤 send_message to room:", roomId, message);
//       io.to(roomId).emit("receive_message", message);
//     });

//     // On user disconnect
//     socket.on("disconnect", () => {
//       const userId = Object.keys(userSocketMap).find(
//         (key) => userSocketMap[key] === socket.id
//       );

//       if (userId) {
//         delete userSocketMap[userId];
//         console.log("❌ Disconnected:", userId, "Removed from userSocketMap");
//       }
//     });
//   });
// }


function initSocketIO() {
  io.on("connection", (socket) => {
    console.log("✅ A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("❌ A user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
}

// Export app and socket utilities
module.exports = {
  app,
  server,
  io,
  initSocketIO,
  getReceiverSocketId,
};
