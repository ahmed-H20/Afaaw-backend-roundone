const z = require("zod")
const validationError = require("../../errors/validationError")

const registerValidation =  (req, res, next) => {
    const registerSchema = z.object({
        fullName: z.string().min(3),
        email: z.email(),
        password: z.string().min(6),
    })
    const validateData = registerSchema.safeParse(req.body)
    if (!validateData.success) {
        console.log(validateData.error.flatten())
        throw new validationError("Validation error", 400, validateData.error.flatten())
    }
    req.body = validateData.data;
    next()
}

const LogInValidation =   (req, res, next) => {
    const logInSchema = z.object({
        email: z.email(),
        password: z.string().min(6),
    })
    const validateData = logInSchema.safeParse(req.body)
    if (!validateData.success) {
        console.log(validateData.error.flatten())
        throw new validationError("Validation error", 400, validateData.error.flatten())
    }
    req.body = validateData.data;
    next()
}


module.exports = {
    registerValidation,
    LogInValidation
}
