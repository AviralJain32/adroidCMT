'use client';

//venue ko optional krna rah gy aur conference type bhi


import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { conferenceSchema } from '@/schemas/conferenceCreation';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Separator } from '@/components/ui/separator';
import { AlertInfoDialog } from '@/components/AlertInformation';
import { AcronymDescription, emailDescription, titleDescription, webPageDescription } from './desciptionForFormFields';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Country }  from 'country-state-city';
import { useState } from 'react';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useCreateNewConferenceMutation } from '@/store/features/ConferenceApiSlice';

export default function CreateConferenceForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createConference]=useCreateNewConferenceMutation()

  const form = useForm<z.infer<typeof conferenceSchema>>({
    resolver: zodResolver(conferenceSchema),
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof conferenceSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await createConference(data).unwrap(); // Use .unwrap() to directly get the fulfilled response or throw an error if it failed
      toast({
        title: 'Success',
        description: response.message,
      });
      router.push('/dashboard');

    }
    catch (error:any) {
      console.log(error)

      toast({
        title: 'Error while creating a conference',
        description:error.data.message,
        variant: 'destructive',
      });
    }
    finally{
      setIsSubmitting(false)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-3">
      <div className="w-full max-w-6xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 font">
            Create a New Conference
          </h1>
          <p className="mb-4">Fill in the details below to create a new conference</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* <div className='font-bold text-xl'>Conference Email ID</div>
            <FormField
              name="conferenceEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email
                  <AlertInfoDialog title={"Conference Email"} description={emailDescription}/>
                  </FormLabel>
                  <FormDescription>
                  To ensure the integrity and professional standards of our conference, we require that all conference registration requests be submitted exclusively via institutional or professional email addresses.(do not use email with domains like gmail.com, yahoo.com, ieee.org, etc)
                  </FormDescription>
                  <Input {...field} placeholder="Enter the conference professional email"/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className='my-4'></Separator> */}

            <div className='font-bold text-xl'>Title and Acronym</div>
            <FormField
              name="conferenceTitle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conference Title
                  <AlertInfoDialog title={"Conference title"} description={titleDescription}/>
                  </FormLabel>
                  <FormDescription>
                  Title, acronym, and city should use English or any other language with the Latin alphabet, even if your conference uses Chinese, Russian, Arabic etc. as the main language.
                  </FormDescription>
                  <Input {...field} placeholder="Enter the conference's title"/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="conferenceAcronym"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conference Acronym<AlertInfoDialog title={"Acronym"} description={AcronymDescription}></AlertInfoDialog></FormLabel>
                  <Input {...field} placeholder='Enter the conference acronym'/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className='my-4'></Separator>


            <div className='font-bold text-xl'>Conference information</div>
            <FormField
              name="conferenceWebpage"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webpage
                  <AlertInfoDialog title={"Web Page"} description={webPageDescription}/>
                  </FormLabel>
                  <FormDescription>
                  If the conference has no Web page yet write &apos;none&apos; in the corresponding field and add an explanation in &apos;Any other information&apos; below.
                  </FormDescription>
                  <Input {...field} 
                  placeholder='Enter the conference Web page'
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='text-md font-semibold'>Enter the conference location.
            </div>
            <FormField
              name="conferenceVenue"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <Input {...field} placeholder='Enter the venue of the conference'/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="conferenceCity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Input {...field} placeholder='Enter the city'/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="conferenceCountry"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger >
                        <SelectValue placeholder="Select your Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Country.getAllCountries().map((country)=>(<SelectItem key={country.name} value={country.name}>{country.name}</SelectItem>))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />

            <FormField
              name="conferenceEstimatedNumberOfSubmissions"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Number of Submissions</FormLabel>
                  <FormDescription>If this is not the first time your conference is organized, you can base your estimation
                  on the number of submissions in previous years. Otherwise, enter your best guess.</FormDescription>
                  <Input type="number" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />   

            
            <FormField
              name="conferenceFirstDay"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Day</FormLabel>
                  <Input type="date" 
                  {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="conferenceLastDay"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Day</FormLabel>
                  <Input type="date" {...field} /> 
                  <FormMessage />
                </FormItem>
              )}
            />

      <FormField
              name="conferenceSubmissionsDeadlineDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Submission Deadline</FormLabel>
                  <Input type="date" {...field} /> 
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="conferencePrimaryArea"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Area</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="conferenceSecondaryArea"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Area (Optional)</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              name="conferencePaperSubmissionLink"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Submission Link</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              name="conferenceOrganizerWebPage"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizer Web Page</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="conferenceOrganizerPhoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizer Phone Number</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="conferenceOrganizerRole"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizer Role</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="conferenceAnyOtherInformation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Any Other Information (Optional)</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              name="conferenceAreaNotes"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area Notes (Optional)</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">{isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ) : ('Create Conference')}</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
