function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
}

function errorHandler(error, req, res, next) {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON body"
    });
  }

  console.error({
    message: error.message,
    method: req.method,
    path: req.originalUrl
  });

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
}

module.exports = {
  notFound,
  errorHandler
};