import * as z from "zod";

export const checkoutSchema = z.object({
  city: z.string().trim().nonempty("City is required").min(2, "City must be at least 2 characters long"),
  details: z.string().trim().nonempty("Street address is required").min(5, "Please enter a more detailed address"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian number (11 digits)"),
});

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
