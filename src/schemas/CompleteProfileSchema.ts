import { z } from "zod";

// Define the sign-up schema
const CompleteProfileSchema = z.object({
    contactNumber: z.string()
        .min(10, "Contact number must be exactly 10 digits")
        .max(10, "Contact number must be exactly 10 digits")
        .regex(/^\d+$/, "Contact number must contain only digits"),
    affilation:z.string().min(2,"Affiliation must be more than 5 words"),
    country:z.string(),
})
export { CompleteProfileSchema };
