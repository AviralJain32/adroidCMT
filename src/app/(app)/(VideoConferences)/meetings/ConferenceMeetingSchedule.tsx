import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import moment from 'moment';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { MeetSchedulingSchema } from '@/schemas/VideoConferencingSchedulingByConfOrg';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';

interface ConferenceDetailsType {
  confAcronym: string;
}

export function ConferenceMeetingSchedule(
  { confAcronym }: ConferenceDetailsType
) {
  const form = useForm<z.infer<typeof MeetSchedulingSchema>>({
    resolver: zodResolver(MeetSchedulingSchema),
    defaultValues: {
      title: '',
      description: '',
      start_time: '',
      end_time: '',
      timezone: '',
    },
  });
  const [loading, setLoading] = useState(false)

  const onSubmit = async (values: z.infer<typeof MeetSchedulingSchema>) => {
  setLoading(true); // Ensure loading state is managed properly
  
  const meeting_id=uuidv4();
  
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const MeetingLink = `${baseUrl}/room/${confAcronym}/${meeting_id}`;

  try {
    const response = await axios.post(`/api/meetings/createNewMeeting`, {
      ...values,
      confAcronym,
      meeting_id,
      join_link:MeetingLink//
    });

    console.log(response);

    if (!(response.status==200)) {
      toast({
        title: "Submission Failed",
        description: response.data.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Meeting Created successfully",
      variant: "default",
    });

  } catch (err: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description: err.response?.data?.message || "Something went wrong",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default">Schedule a Conference Meeting</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AlertDialogHeader>
              <AlertDialogTitle>Schedule a Conference Meeting</AlertDialogTitle>
              <AlertDialogDescription>
                Enter meeting details below. Ensure the meeting falls within the conference dates.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Meeting Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a unique meeting password ..." />
                  </FormControl>
                  <FormDescription>This password will send to all the invited people through which they can join the meeting room</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Meeting Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timezone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., UTC, IST" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Schedule Meeting</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
