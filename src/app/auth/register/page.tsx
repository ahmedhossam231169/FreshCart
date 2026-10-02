"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/src/components/auth/AuthLayout";
import {
  IconFacebook,
  IconGoogle,
  IconStar,
  IconTruck,
  IconShieldCheck,
  IconCheckCircle,
  IconUserPlus,
} from "@/src/components/auth/icons";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@base-ui/react/input";
import {  registerSchema, RegisterSchemaType } from "@/lib/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp } from "@/src/services/ayth.service";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

// This is just the UI for the sign up page. There is no real registration logic here yet.
export default function RegisterPage() {
  const router = useRouter();
  const { control , handleSubmit ,formState:{isSubmitting} } = useForm({
    resolver:zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

  })
  async function onSubmit(formdata:RegisterSchemaType) {
    try {
      const response = await SignUp(formdata)
      if(response.message == "success"){
        toast.success("Account created successfully! Please login .");
        router.push("/auth/login");
      }else{
        toast.error("Failed to create account. Please try again later.");
      }
    } catch (error) {
      toast.error((error instanceof Error ? error.message : "Failed to create account. Please try again later."));
    }
  }

  useEffect(() => {
    
  }, [])

  return (
    <AuthLayout>
      <div className="mx-auto flex max-w-[1280px] items-start gap-12 px-4 py-8 sm:px-8 lg:py-[48px]">
        {/* Left side: marketing copy, feature list and a testimonial */}
        <div className="hidden flex-1 flex-col gap-2 lg:flex">
          <h1 className="text-4xl font-bold">
            <span className="text-[#364153]">Welcome to </span>
            <span className="text-[#16a34a]">FreshCart</span>
          </h1>
          <p className="text-xl text-[#364153]">
            Join thousands of happy customers who enjoy fresh groceries delivered right to their
            doorstep.
          </p>

          <ul className="flex flex-col gap-6 py-6">
            <li className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#bbf7d0]">
                <IconCheckCircle className="h-4.5 w-4.5 text-[#16a34a]" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-[#364153]">Premium Quality</h2>
                <p className="text-base text-[#4a5565]">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#bbf7d0]">
                <IconTruck className="h-4.5 w-4.5 text-[#16a34a]" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-[#364153]">Fast Delivery</h2>
                <p className="text-base text-[#4a5565]">Same-day delivery available in most areas</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#bbf7d0]">
                <IconShieldCheck className="h-4.5 w-4.5 text-[#16a34a]" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-[#364153]">Secure Shopping</h2>
                <p className="text-base text-[#4a5565]">Your data and payments are completely secure</p>
              </div>
            </li>
          </ul>

          <div className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-base font-semibold text-white">
                SJ
              </span>
              <div>
                <h3 className="text-base text-[#364153]">Sarah Johnson</h3>
                <div className="flex text-[#facc15]">
                  <IconStar className="h-4 w-5" />
                  <IconStar className="h-4 w-5" />
                  <IconStar className="h-4 w-5" />
                  <IconStar className="h-4 w-5" />
                  <IconStar className="h-4 w-5" />
                </div>
              </div>
            </div>
            <p className="text-base italic text-[#4a5565]">
              {`"FreshCart has transformed my shopping experience. The quality of the products is
              outstanding, and the delivery is always on time. Highly recommend!"`}
            </p>
          </div>
        </div>

        {/* Right side: the sign up card */}
        <div className="w-full min-w-0 flex-1 rounded-2xl bg-white px-5 py-8 shadow-xl sm:px-8 sm:py-10">
          <h2 className="text-center text-2xl sm:text-3xl font-semibold text-[#364153]">Create Your Account</h2>
          <p className="mt-2 text-center text-base text-[#364153]">Start your fresh journey with us today</p>

          <div className="mt-8 flex items-center justify-center gap-2">
            <button suppressHydrationWarning
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#d1d5dc] px-4 py-2.5 transition-colors hover:bg-[#f9fafb]"
            >
              {/* TODO: hook up Google sign-up */}
              <IconGoogle className="h-4 w-5" />
              <span className="text-base font-semibold text-[#101828]">Google</span>
            </button>
            <button suppressHydrationWarning
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#d1d5dc] px-4 py-2.5 transition-colors hover:bg-[#f9fafb]"
            >
              {/* TODO: hook up Facebook sign-up */}
              <IconFacebook className="h-4 w-5 text-[#1877F2]" />
              <span className="text-base font-semibold text-[#101828]">Facebook</span>
            </button>
          </div>

          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d1d5dc]/30" />
            </div>
            <span className="relative bg-white px-4 text-base text-[#364153]">or</span>
          </div>

          {/* TODO: handle sign up submit */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Controller
              name="name"
              control={control}
              render={({ field ,formState }) => {
                return (
                  <Field>
                    <FieldLabel className="text-[15px] font-medium text-[#364153]">
                      Name<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      type="text"
                      placeholder="Ali"
                      className="w-full rounded-lg border border-[#d1d5dc] bg-white px-4 py-2.5 text-base text-[#101828] placeholder:text-[#99a1af] focus:border-[#16a34a] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20"
                      {...field}
                    />
                    {formState.errors.name && <FieldError>{formState.errors.name.message}</FieldError>}

                  </Field>
                )



              }}
            />
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
            <Controller
              name="rePassword"
              control={control}
              render={({ field,formState }) => {
                return (
                  <Field>
                    <FieldLabel className="text-[15px] font-medium text-[#364153]">
                      Confirm Password<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      type="password"
                      placeholder="confirm your password"
                      className="w-full rounded-lg border border-[#d1d5dc] bg-white px-4 py-2.5 text-base text-[#101828] placeholder:text-[#99a1af] focus:border-[#16a34a] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20"
                      {...field}
                    />
                    {formState.errors.rePassword && <FieldError>{formState.errors.rePassword.message}</FieldError>}

                  </Field>
                )



              }}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field,formState }) => {
                return (
                  <Field>
                    <FieldLabel className="text-[15px] font-medium text-[#364153]">
                      Phone Number<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      className="w-full rounded-lg border border-[#d1d5dc] bg-white px-4 py-2.5 text-base text-[#101828] placeholder:text-[#99a1af] focus:border-[#16a34a] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20"
                      {...field}
                    />
                    {formState.errors.phone && <FieldError>{formState.errors.phone.message}</FieldError>}

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

          <div className="mt-10 border-t border-[#d1d5dc]/30 pt-10 text-center text-base">
            <span className="text-[#364153]">Already have an account? </span>
            <Link href="/auth/login" className="font-semibold text-[#16a34a]">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
