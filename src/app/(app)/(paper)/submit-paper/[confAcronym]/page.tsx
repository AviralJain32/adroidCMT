'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useFieldArray } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { paperSubmissionSchema } from '@/schemas/paperCreation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

export default function SendMessage() {
  const params = useParams<{ confAcronym: string }>();
  const conferenceAcronym = params.confAcronym;
  const router = useRouter();

  const form = useForm<z.infer<typeof paperSubmissionSchema>>({
    resolver: zodResolver(paperSubmissionSchema)
  });

  const fileRef = form.register("paperFile");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof paperSubmissionSchema>) => {
    const formData = new FormData();
    formData.append('paperTitle', data.paperTitle);
    formData.append('paperKeywords', data.paperKeywords);
    formData.append('paperKeyphrases', data.paperKeyphrases);
    formData.append('paperAbstract', data.paperAbstract);
    formData.append('conference',conferenceAcronym);
    formData.append('paperFile', data.paperFile[0]);


    try {
      const response = await axios.post('/api/submit-paper', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = response.data;

      if (!result.success) {
        toast({
          title: 'Submission Failed',
          description: result.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Paper submitted successfully',
        variant: "default",
      });

      router.replace('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Submit Your Paper
          </h1>
          <p className="mb-4">Please fill out the form below to submit your paper.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="paperTitle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Title</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="paperKeywords"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Keywords</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="paperKeyphrases"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Keyphrases</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="paperAbstract"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Abstract</FormLabel>
                  <Textarea {...field}/>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormLabel>Conference Acronym</FormLabel>
            <Input readOnly value={conferenceAcronym} />
                  
            <FormField
              name="paperFile"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper File</FormLabel>
                  <Input type="file" {...fileRef}
                  onChange={(event) => {
                  field.onChange(event.target?.files?.[0] ?? undefined);
                  }} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Submit Paper</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

