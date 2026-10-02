import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
interface User {
user:IUserData;
token: string;


}

interface Session {
user: IUserData;
accessToken: string;
}

interface IUserData{
name:string;
role:string;
email:string;

}
}

declare module "next-auth/jwt" {
interface JWT {
user: IUserData;
accessToken: string;
}
}