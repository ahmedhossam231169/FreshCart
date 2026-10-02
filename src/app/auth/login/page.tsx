"use client";

import Link from "next/link";
import Image from "next/image";
import AuthLayout from "@/src/components/auth/AuthLayout";
import Logo from "@/src/components/auth/Logo";
import {
  IconCheckCircle,
  IconGoogle,
  IconFacebook,
  IconShieldCheck,
  IconStar,
  IconUser,
  IconUserPlus,
} from "@/src/components/auth/icons";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import {  signInSchema, SignInSchemaType } from "@/lib/schema/registerSchema";

import toast from "react-hot-toast";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@base-ui/react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

// This is just the UI for the login page. There is no real sign-in logic here yet.
export default function LoginPage() {
const router = useRouter();
  const { control , handleSubmit ,formState:{isSubmitting} } = useForm({
    resolver:zodResolver(signInSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      
    },

  })
  async function onSubmit(formdata: SignInSchemaType) {
    try {
      const response = await signIn("credentials", {
        email: formdata.email,
        password: formdata.password,
        redirect: false,
        callbackUrl: "/Home",
      });

      if (response?.ok) {
        toast.success("Signed in successfully!");
        router.push("/Home");
      } else {
        toast.error("Failed to sign in. Please try again later.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to sign in. Please try again later.");
    }
  }

  return (
    <AuthLayout>
      <div className="mx-auto flex max-w-[1280px] items-center gap-12 px-8 py-[48px]">
        {/* Left side: marketing image + text */}
        <div className="flex flex-1 flex-col items-center gap-6 text-center">
          <div className="relative h-[384px] w-full overflow-hidden rounded-2xl bg-white shadow-lg">
            <Image src="/login-cart.png" alt="Shopping cart full of fresh vegetables"
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold text-[#1e2939]">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h2>
            <p className="text-lg text-[#4a5565]">
              Join thousands of happy customers who trust FreshCart for their daily grocery needs
            </p>

            <div className="flex items-center justify-center gap-8">
              <span className="flex items-center gap-2 text-sm text-[#6a7282]">
                <IconCheckCircle className="h-3.5 w-3.5" />
                Free Delivery
              </span>
              <span className="flex items-center gap-2 text-sm text-[#6a7282]">
                <IconCheckCircle className="h-3.5 w-3.5" />
                Secure Payment
              </span>
              <span className="flex items-center gap-2 text-sm text-[#6a7282]">
                <IconCheckCircle className="h-3.5 w-3.5" />
                24/7 Support
              </span>
            </div>
          </div>
        </div>

        {/* Right side: the login card */}
        <div className="flex-1 rounded-2xl bg-white p-12 shadow-xl">
          <div className="flex flex-col items-center gap-3 text-center">
            <Logo />
            <h1 className="text-2xl font-bold text-[#1e2939]">Welcome Back!</h1>
            <p className="text-base text-[#4a5565]">Sign in to continue your fresh shopping experience</p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button suppressHydrationWarning
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#e5e7eb] px-4 py-3.5"
            >
              {/* TODO: hook up Google sign-in */}
              <IconGoogle className="h-4.5 w-4.5" />
              <span className="text-base font-medium text-[#364153]">Continue with Google</span>
            </button>
            <button suppressHydrationWarning
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#e5e7eb] px-4 py-3.5"
            >
              {/* TODO: hook up Facebook sign-in */}
              <IconFacebook className="h-4.5 w-4.5 text-[#1877F2]" />
              <span className="text-base font-medium text-[#364153]">Continue with Facebook</span>
            </button>
          </div>

          <div className="relative my-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e5e7eb]" />
            </div>
            <span className="relative bg-white px-4 text-sm text-[#6a7282]">
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          {/* TODO: handle login submit */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            
            <Controller
              name="email"
              control={control}
              render={({ field,formState}) => {
                return (
                  <Field>
                    <FieldLabel className="text-[15px] font-medium text-[#364153]">
                      Email<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      type="text"
                      placeholder="ali@example.com"
                      className="w-full rounded-lg border border-[#d1d5dc] bg-white px-4 py-2.5 text-base text-[#101828] placeholder:text-[#99a1af] focus:border-[#16a34a] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20"
                      {...field}
                    />
                    {formState.errors.email && <FieldError>{formState.errors.email.message}</FieldError>}
                  </Field>
                )
              }}
            />
            <Controller
              name="password"
              control={control}
              render={({ field,formState}) => {
                return (
                  <Field>
                    <FieldLabel className="text-[15px] font-medium text-[#364153]">
                      Password<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      type="password"
                      placeholder="create a strong password"
                      className="w-full rounded-lg border border-[#d1d5dc] bg-white px-4 py-2.5 text-base text-[#101828] placeholder:text-[#99a1af] focus:border-[#16a34a] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20"
                      {...field}
                    />
                    <FieldDescription>Must be at least 8 characters with numbers and symbols</FieldDescription>
                    {formState.errors.password && <FieldError>{formState.errors.password.message}</FieldError>}

                  </Field>
                )




                
              }}
            />
            
            

            <button suppressHydrationWarning
              type="submit"
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-4 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#138a3e]"
            >
                {isSubmitting ? (
                  <Spinner />
                ) : (
                  <>
                    <IconUserPlus className="h-4.5 w-4.5" />
                    Create My Account
                  </>
                )}
            </button>
          </form>

          <div className="mt-6 border-t border-[#f3f4f6] pt-6 text-center">
            <p className="text-base text-[#4a5565]">
              New to FreshCart?{" "}
              <Link href="/auth/register" className="font-semibold text-[#16a34a]">
                Create an account
              </Link>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[#6a7282]">
            <span className="flex items-center gap-1">
              <IconShieldCheck className="h-3 w-3.5" />
              SSL Secured
            </span>
            <span className="flex items-center gap-1">
              <IconUser className="h-3 w-3.5" />
              50K+ Users
            </span>
            <span className="flex items-center gap-1">
              <IconStar className="h-3 w-3.5" />
              4.9 Rating
            </span>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
