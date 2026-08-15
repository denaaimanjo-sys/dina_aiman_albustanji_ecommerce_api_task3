const jwt = require("jsonwebtoken");
const logSecurityEvent = require("./securityLogger");

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logSecurityEvent("AUTHENTICATION_REQUIRED", req);

    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (error) {
    logSecurityEvent("INVALID_TOKEN", req);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}

module.exports = authenticate;