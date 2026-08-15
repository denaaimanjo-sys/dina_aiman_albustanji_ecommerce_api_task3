function logSecurityEvent(type, req, userId = null) {
  console.log(JSON.stringify({
    time: new Date().toISOString(),
    type,
    userId,
    method: req.method,
    path: req.originalUrl
  }));
}

module.exports = logSecurityEvent;