import { z } from "zod";

export const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Must be a valid ID");
export const quantitySchema = z.number().int().positive().max(Number.MAX_SAFE_INTEGER);