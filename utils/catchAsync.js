const asyncHandler = require("express-async-handler");

module.exports = (fn) => asyncHandler(fn);
