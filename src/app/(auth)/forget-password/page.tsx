"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { resetPassword } from "./serverAction" // Replace with your actual reset password function
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
})

export default function ForgetPasswordForm() {
  const {toast}=useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    const func=async()=>{
      try {
        const response=await resetPassword(values.email)
        console.log(response);
        if (response.success) {
        
          toast({title: 'Success',
            description: `${response.message}` || "You have reset your password correctly.Please Sign In !!",
            variant: 'default',
          });
        } else {
          toast({title: 'Error',
            description: `${response.message}` || "Failed to reset password.",
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({title: 'Error',
          description: `${error}` || "Failed to reset password.",
          variant: 'destructive',
        });
      }
    }
    func()
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-400">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Your Password?</h1>
          <p className="text-sm text-gray-500">
            No worries! Enter your registered email address below, and we&apos;ll send you instructions to reset your password.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your registered email" {...field} />
                  </FormControl>
                  <FormDescription>
                    We&apos;ll send a password reset link to this email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-blue-600 text-white">
              Send Reset Link
            </Button>
          </form>
        </Form>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Remembered your password?{" "}
            <a
              href="/sign-in"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
