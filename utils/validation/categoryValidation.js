const z = require("zod")
const validationError = require("../../errors/validationError.js")


const addCategoryValidation = async (req, res, next) => {
    const addCategorySchema = z.object({
        name: z.string().min(3)
    });
    const result = addCategorySchema.safeParse(req.body);
    if (!result.success) {
        throw new validationError("please enter a valid category name", 400, result.errors.flatten());
    }
    req.body = result.data;
    next();
}

module.exports = {
    addCategoryValidation
}