import { z } from "zod";

export const signInSchema=z.object({
    identifier:z.string().email(), //email hi hai
    password:z.string()
}) 