import { RegisterSchemaType, SignInSchemaType } from "@/lib/schema/registerSchema";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function SignUp(userData:RegisterSchemaType) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  return data;
}
export async function SignIn(userData:SignInSchemaType) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  return data;
}