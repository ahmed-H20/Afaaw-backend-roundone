const AppError = require("../errors/appError")


const errorHandler = (error, req, res, next) => {

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