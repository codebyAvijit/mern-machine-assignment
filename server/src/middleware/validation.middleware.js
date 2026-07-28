const ApiResponse = require("../utils/response/ApiResponse");
const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return ApiResponse.badRequest(res, "Validation failed", {
        errors: result.error.issues,
      });
    }

    req.body = result.data;

    next();
  };
};

module.exports = validate;
