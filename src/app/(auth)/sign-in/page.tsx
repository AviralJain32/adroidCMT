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
import { Suspense, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
      callbackUrl,
    });

    if (result?.error) {
      toast({
        title: 'Error',
        description: result.error === 'CredentialsSignin'
          ? 'The credentials you entered are incorrect. Please try again.'
          : result.error,
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);

    if (result?.url) {
      router.push(result.url);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="w-full max-w-md p-6 space-y-8 bg-white rounded-lg shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">Welcome Back!</h1>
          <p className="text-sm text-gray-500">
            Sign in to access your account and manage your conferences.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
                  <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-right">
              <Link href="/forget-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>

        <div className="flex items-center justify-center space-x-2">
          <span className="text-gray-500">or</span>
        </div>

        <form
          action={async () => await signIn('google')}
          className="flex justify-center"
        >
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 focus:ring-2 focus:ring-blue-300"
          >
            <Image src="/Google-button-icon.png" alt="Google" width={24} height={24} />
            Sign in with Google
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-blue-600 font-medium hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInSuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
