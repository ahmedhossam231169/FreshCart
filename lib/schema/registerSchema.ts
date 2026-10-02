import * as z from "zod";

export const registerSchema = z.object({
name: z.string().nonempty("Name is required").min(3, "Name must be at least 3 characters long").max(12, "Name must be at most 12 characters long"),
email: z.email("Invalid email address").nonempty("Email is required"),
phone: z.string().regex(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian number (11 digits)").nonempty("Phone number is required"),
password: z.string().min(6, "Password must be at least 6 characters long"),
rePassword: z.string().min(6, "Password must be at least 6 characters long")
}).refine((data) => data.password === data.rePassword,  {
  message: "Passwords do not match",
  path: ["rePassword"]
})
export const signInSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long")
})




export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type SignInSchemaType = z.infer<typeof signInSchema>;