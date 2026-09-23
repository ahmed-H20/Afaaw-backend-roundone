const ApiError = require("../utils/ApiError");
const { FAIL } = require("../constants/httpStatusText");

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = result.error.issues.map((error) => ({
        field: error.path.slice(1).join("."),
        message: error.message,
      }));

      return next(new ApiError(400, "Validation failed", FAIL, errors));
    }

    req.validated = result.data;
    if (result.data.body) req.body = result.data.body;
    if (result.data.params) req.params = result.data.params;
    if (result.data.query) req.query = result.data.query;

    next();
  };
};

module.exports = validate;
