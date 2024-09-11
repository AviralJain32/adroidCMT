'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { useParams, useRouter } from 'next/navigation';
import { paperSubmissionSchema } from '@/schemas/paperCreation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

export default function PaperSubmissionForm() {
  const { data: session } = useSession();
  const user: User = session?.user;
  const params = useParams<{ confAcronym: string }>();
  const conferenceAcronym = params.confAcronym;
  const router = useRouter();

  const form = useForm<z.infer<typeof paperSubmissionSchema>>({
    resolver: zodResolver(paperSubmissionSchema)
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "paperAuthors"
  });

  const fileRef = form.register("paperFile");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof paperSubmissionSchema>) => {
    setIsLoading(true);
    // Automatically add the current user's email as the last author
    data.paperAuthors.push({
      email: user.email as string,
      isCorrespondingAuthor: false
    });

    const formData = new FormData();
    formData.append('paperTitle', data.paperTitle);
    formData.append('paperKeywords', data.paperKeywords);
    formData.append('paperAbstract', data.paperAbstract);
    formData.append('conference', conferenceAcronym);
    formData.append('paperFile', data.paperFile[0]);
    formData.append('paperAuthors', JSON.stringify(data.paperAuthors));

    try {
      const response = await axios.post('/api/submit-paper', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Submit Your Paper</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Paper Title */}
            <FormField
              name="paperTitle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Title</FormLabel>
                  <Input {...field} placeholder="Enter the title of your paper" />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Paper Keywords */}
            <FormField
              name="paperKeywords"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Keywords</FormLabel>
                  <Input {...field} placeholder="Add keywords" />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Paper Abstract */}
            <FormField
              name="paperAbstract"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Abstract</FormLabel>
                  <Textarea {...field} placeholder="Write a brief abstract" />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Conference Acronym */}
            <FormLabel>Conference Acronym</FormLabel>
            <Input readOnly value={conferenceAcronym} className="bg-gray-200" />
            {/* Paper File Upload */}
            <FormField
              name="paperFile"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Paper File</FormLabel>
                  <Input type="file" {...fileRef}
                    onChange={(event) => {
                      field.onChange(event.target?.files?.[0] ?? undefined);
                    }} />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Authors Section */}
            <div>
              <div>
                <FormLabel className='mb-2'>Authors</FormLabel>
                <Input readOnly value={user?.email} className="bg-gray-200 mb-4" />
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-md mb-4 bg-gray-100">
                  {/* Author Email */}
                  <FormField
                    name={`paperAuthors.${index}.email`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Input {...field} placeholder="Enter author email" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Corresponding Author Checkbox */}
                  <FormField
                    name={`paperAuthors.${index}.isCorrespondingAuthor`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Corresponding Author</FormLabel>
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="destructive" onClick={() => remove(index)}>Remove Author</Button>
                </div>
              ))}

              {/* Add New Author */}
              <Button type="button" onClick={() => append({
                email: "",
                isCorrespondingAuthor: false,
              })}>
                Add Author
              </Button>
            </div>
            {/* Submit Button */}
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
                : 'Submit Paper'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
