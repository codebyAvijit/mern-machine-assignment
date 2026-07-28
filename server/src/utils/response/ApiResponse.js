const ApiResponse = {
  success(res, message = "Success", data = null) {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  },

  created(res, message = "Resource created successfully", data = null) {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  },

  badRequest(res, message = "Bad request", errors = null) {
    return res.status(400).json({
      success: false,
      message,
      errors,
    });
  },

  unauthorized(res, message = "Unauthorized") {
    return res.status(401).json({
      success: false,
      message,
    });
  },

  forbidden(res, message = "Forbidden") {
    return res.status(403).json({
      success: false,
      message,
    });
  },

  notFound(res, message = "Resource not found") {
    return res.status(404).json({
      success: false,
      message,
    });
  },

  conflict(res, message = "Conflict") {
    return res.status(409).json({
      success: false,
      message,
    });
  },

  serverError(res, message = "Internal server error") {
    return res.status(500).json({
      success: false,
      message,
    });
  },
};

module.exports = ApiResponse;
