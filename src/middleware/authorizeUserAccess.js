function authorizeUserAccess(req, res, next) {
  const requestedUserId = Number(req.params.id);

  if (req.user.role === "admin" || req.user.id === requestedUserId) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access forbidden"
  });
}

module.exports = authorizeUserAccess;