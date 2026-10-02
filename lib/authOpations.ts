import { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { signInSchema, SignInSchemaType,  } from "./schema/registerSchema";
import { SignIn } from "@/src/services/ayth.service";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    credentials({
      name: "credentials",
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        if(!credentials)   return null;
        const data = await SignIn(credentials);
        if (data?.message === "success") {
          return data;
        }else {
          return null;
        }

      }


    })


  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.accessToken = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      
      return session;
    },
  },

}