
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
 
const { app, server, initSocketIO } = require('./app/utils/socket.util');
const connectDB = require('./app/config/db');


// CORS Middleware
if(process.env.NODE_ENV!=='production'){

}
const corsMiddleware = cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173" ,
  credentials: true,
}); 

// Static Files with CORS
app.use("/uploads/profile", corsMiddleware, express.static(path.join(__dirname, "uploads/profile")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middlewares
app.use(corsMiddleware);
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// socket Connection
initSocketIO();

// Routes
app.use('/auth', require('./app/routes/auth/auth.route'));
app.use('/api/profile', require('./app/routes/api/profile.route')); 
app.use('/api/swipe', require('./app/routes/api/swipe.route'));
app.use('/api/match', require('./app/routes/api/match.route'));
app.use('/api', require('./app/routes/api/preference.route'));
app.use('/api/message', require('./app/routes/api/message.route'));
app.use("/api/admin", require('./app/routes/api/admin.route'))
app.use("/api/payment", require('./app/routes/api/payment.route'));
app.use("/api", require("./app/routes/api/comments.route"))

if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../client/dist");

  app.use(express.static(clientBuildPath));

  // Catch-all route for React Router
 app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

}



// DB Connection
connectDB.dbConnection();

// Start Server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});