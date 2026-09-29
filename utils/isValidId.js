const mongoose = require("mongoose");
const AppError = require("../errors/appError");

const isValidId = (id,name) => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(`Invalid ${name} ID`, 400);
    }
    return true;
}

module.exports = isValidId;