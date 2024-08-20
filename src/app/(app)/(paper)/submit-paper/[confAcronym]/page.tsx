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
import { Checkbox } from "@/components/ui/checkbox"


export default function SendMessage() {
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

    const formData = new FormData();
    formData.append('paperTitle', data.paperTitle);
    formData.append('paperKeywords', data.paperKeywords);
    formData.append('paperAbstract', data.paperAbstract);
    formData.append('conference', conferenceAcronym);
    formData.append('paperFile', data.paperFile[0]);
    formData.append('paperAuthors',JSON.stringify(data.paperAuthors))


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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Submit Your Paper
      </h1>
      <div className="flex justify-around items-center min-h-screen"> 
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
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
                name="paperAbstract"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paper Abstract</FormLabel>
                    <Textarea {...field} />
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
              <div>
                <FormLabel>Authors</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="space-y-4 mb-4">
                    <FormField
                      name={`paperAuthors.${index}.FirstName`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <Input {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`paperAuthors.${index}.LastName`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <Input {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`paperAuthors.${index}.email`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <Input {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`paperAuthors.${index}.Country`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Input {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`paperAuthors.${index}.Affiliation`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Affiliation</FormLabel>
                          <Input {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`paperAuthors.${index}.WebPage`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Web Page</FormLabel>
                          <Input {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                              control={form.control}
                              name={`paperAuthors.${index}.isCorrespondingAuthor`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-4">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>
                                      Corresponding Author
                                    </FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />

                    <Button type="button" onClick={() => remove(index)}>Remove Author</Button>
                  </div>
                ))}
                <Button type="button" onClick={() => append({
                  FirstName: "",
                  LastName: "",
                  email: "",
                  Country: "",
                  Affiliation: "",
                  WebPage: "",
                  isCorrespondingAuthor:false,
                })}>
                  Add Author
                </Button>
              </div>
              <Button className="w-full" type="submit">Submit Paper</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
