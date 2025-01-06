"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import React, { useState } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { useParams, useRouter } from 'next/navigation';
import { conferenceSchema } from '@/schemas/conferenceCreation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Country } from 'country-state-city';
import { Loader2 } from 'lucide-react';  // Loading spinner icon
import { IConference } from "@/model/Conference";
import { useUpdateConferenceMutation } from "@/store/features/ConferenceApiSlice";

interface EditConferencePopupProps {
  conferenceDetails: z.infer<typeof conferenceSchema>;
}

const EditConferencePopup = ({conferenceDetails}:EditConferencePopupProps) => {

  const params = useParams<{ confAcronym: string }>();
  const router = useRouter();
  const [updateConference]=useUpdateConferenceMutation()

  const form = useForm<z.infer<typeof conferenceSchema>>({
    resolver: zodResolver(conferenceSchema),
    defaultValues: {
      ...conferenceDetails,conferenceOrganizerPhoneNumber: String(conferenceDetails.conferenceOrganizerPhoneNumber),conferenceEstimatedNumberOfSubmissions:undefined
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof conferenceSchema>) => {
    setIsLoading(true);
    console.log(data)
    try {
      const response = await updateConference({confAcronym:params.confAcronym,conferenceDetails:data}).unwrap(); // Use .unwrap() to directly get the fulfilled response or throw an error if it failed
      toast({
        title: 'Success',
        description: response.message,
      });
      router.push('/dashboard');
    }
    catch (error:any) {
      console.log(error)

      toast({
        title: 'Error while updating a conference',
        description:error.data.message,
        variant: 'destructive',
      });
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <div>
      <Sheet >
        <SheetTrigger asChild>
          <Button variant="outline">Edit Conference</Button>
        </SheetTrigger>
        <SheetContent side={"left"}  className="overflow-scroll w-full">
          <SheetHeader>
            <SheetTitle>Edit Conference Details</SheetTitle>
            <SheetDescription>
              Make changes to your conference details.
            </SheetDescription>
          </SheetHeader>
          <div className="p-6 max-w-lg mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* <FormField
                  name="conferenceEmail"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conference Email</FormLabel>
                      <Input {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  name="conferenceTitle"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conference Title</FormLabel>
                      <Input {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="conferenceWebpage"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conference Webpage</FormLabel>
                      <Input {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="conferenceVenue"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue</FormLabel>
                      <Input {...field} />
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
                      <Input {...field} />
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
                              {Country.getAllCountries().map((country) => (
                                <SelectItem key={country.name} value={country.name}>{country.name}</SelectItem>
                              ))}
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
                      <Input {...field}/>
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
                  <FormLabel>Paper Submission Deadline </FormLabel>
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
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Update Conference'}
                </Button>
              </form>
            </Form>
          </div>
          <SheetFooter>
            <SheetClose>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default EditConferencePopup;
