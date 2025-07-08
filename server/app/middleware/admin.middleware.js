module.exports = function isAdmin(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized: No user information found",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Forbidden: Admin access only",
      });
    }

    // User is admin
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};