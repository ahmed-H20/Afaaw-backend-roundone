const z = require("zod")

const registerValidation = async (req,res,next) => {
    const registerSchema =  z.object({
        fullName:z.string().min(3),
        email:z.email(),
        password:z.string().min(6),
    })
    const validateData = registerSchema.safeParse(req.body)
    if(!validateData.success) {
        console.log(validateData.errors?.flatten())
       throw new validationError("Validation error",400,validateData.errors.flatten())
    }
    next()
}
