const ApiError = require("../utils/ApiError");

module.exports = (req, res, next) => {
    next(new ApiError(404, `Route ${req.originalUrl} was not found on this server.`));
};
