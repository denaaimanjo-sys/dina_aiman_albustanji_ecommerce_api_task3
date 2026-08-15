const logSecurityEvent = require("./securityLogger");

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      logSecurityEvent(
        "AUTHORIZATION_DENIED",
        req,
        req.user ? req.user.id : null
      );

      return res.status(403).json({
        success: false,
        message: "Access forbidden"
      });
    }

    if (req.user.role === "admin" && req.method !== "GET") {
      logSecurityEvent("ADMIN_ACTION", req, req.user.id);
    }

    next();
  };
}

module.exports = authorize;