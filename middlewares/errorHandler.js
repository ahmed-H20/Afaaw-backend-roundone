const AppError = require("../errors/appError");
const validationError = require("../errors/validationError");


const errorHandler = (error, req, res, next) => {
    if(error instanceof validationError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errors: error.errors
        });
    }

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
    
    console.error(error);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};

module.exports = errorHandler;