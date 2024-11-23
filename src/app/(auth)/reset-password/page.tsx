"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordAction } from "./resetPasswordServerAction"; // Replace with your actual server action
import { useToast } from "@/components/ui/use-toast";
import { Suspense } from "react";

// Schema for password validation
const formSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"], // Set the error to confirmPassword
  });

function ResetPasswordPageUtility() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Get the token from the URL
  const {toast}=useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!token) {
      toast({
        title: 'Error',
          description:"Token is missing in the URL.",
          variant: 'destructive',
      })
      console.error("Token is missing in the URL.");
      return;
    }

    const func = async () => {
        // const parsedToken=URL.parse(token) as URL
        // console.log(parsedToken)
      const response = await resetPasswordAction(token, values.newPassword);
      console.log(response);
      if (response.success) {
        
        toast({title: 'Success',
          description: `${response.message}` || "You have reset your password correctly.Please Sign In !!",
          variant: 'default',
        });
        window.location.href = "/sign-in"; // Redirect to sign-in page
      } else {
        toast({title: 'Error',
          description: `${response.message}` || "Failed to reset password.",
          variant: 'destructive',
        });
      }
    };

    func();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-400">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Your Password</h1>
          <p className="text-sm text-gray-500">
            Enter a new password below to reset your account password.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-blue-600 text-white">
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage(){
  return (
    <Suspense>
      <ResetPasswordPageUtility/>
    </Suspense>
  )
}