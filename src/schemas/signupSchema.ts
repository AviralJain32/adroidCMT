import { z } from "zod";

// Define the name validation separately for reuse
const nameValidation = z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Name must not contain special characters");

// Define the sign-up schema
const signUpSchema = z.object({
    firstname: nameValidation,
    lastname: nameValidation.optional(),
    email: z.string().email({ message: "Invalid Email Address" }),
    contactNumber: z.string()
        .min(10, "Contact number must be exactly 10 digits")
        .max(10, "Contact number must be exactly 10 digits")
        .regex(/^\d+$/, "Contact number must contain only digits"),
    affilation:z.string().min(2,"Affiliation must be more than 5 words"),
    country:z.string(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    retypePassword:z.string().min(6, { message: "Password must be at least 6 characters" })
}).refine((data) => data.firstname !== data.lastname, {
    message: "First name and last name cannot be the same",
    path: ["lastname"], // You can specify the path of the error message 
}).refine((data)=>data.password === data.retypePassword, {
    message: "Passwords must match",
    path: ["retypePassword"], // Path for the error message
});

export { nameValidation, signUpSchema };
