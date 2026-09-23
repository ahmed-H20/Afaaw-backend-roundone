


const getAllCartsQueryValidation = async (req, res, next) => {
    const getAllCartsQuerySchema = z.object({
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(8)
    });
    const result = getAllCartsQuerySchema.safeParse(req.query);
    if (!result.success) {
        throw new AppError("Invalid query parameters", 400);
    }
    req.query = result.data;
    next();
}



const updateCartItemValidation = async (req, res, next) => {
    const updateCartItemBodySchema = z.object({
        quantity: z.coerce.number().int().refine((value) => value !== 0)
    });
    const bodyResult = updateCartItemBodySchema.safeParse(req.body);

    if (!bodyResult.success) {
        throw new AppError("Invalid request parameters", 400);
    }

    req.body = bodyResult.data;
    next();
}

const addCartItemValidation = async (req, res, next) => {
    const addCartItemBodySchema = z.object({
        quantity: z.coerce.number().int().min(1).default(1),
        color: z.string().optional(),
        size: z.string().optional()
    });
    const bodyResult = addCartItemBodySchema.safeParse(req.body);

    if (!bodyResult.success) {
        throw new AppError("Invalid request parameters", 400);
    }

    req.body = bodyResult.data;
    next();
}

module.exports = {
    getAllCartsQueryValidation,
    updateCartItemValidation,
    addCartItemValidation
}