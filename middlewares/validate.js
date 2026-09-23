const ApiError = require("../utils/ApiError");

const validate = (schemas) => (req, res, next) => {
  const details = [];
  const validated = {};

  for (const key of ["body", "params", "query"]) {
    if (!schemas[key]) continue;

    const result = schemas[key].safeParse(req[key]);

    if (!result.success) {
      for (const issue of result.error.issues) {
        details.push({
          field: [key, ...issue.path].join("."), // e.g. "body.price"
          message: issue.message,
        });
      }
    } else {
      validated[key] = result.data;
    }
  }

  if (details.length > 0) {
    return next(ApiError.badRequest("Validation failed", details));
  }

  req.validated = validated;
  next();
};

module.exports = validate;
