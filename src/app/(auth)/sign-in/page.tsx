'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Extract query parameters
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'; // Fallback to dashboard if no callbackUrl

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
      callbackUrl, // Pass the callback URL to the signIn function
    });

    console.log(result)

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'The credentials you entered are incorrect. Please try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: `${result.error}`,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace(result.url); // Redirect to the URL provided by NextAuth.js (callbackUrl)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-400">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-sm text-gray-500">Sign in to access your account and manage your conferences</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">Email</FormLabel>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="border-gray-300"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="border-gray-300"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Sign In
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account? &nbsp;
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
