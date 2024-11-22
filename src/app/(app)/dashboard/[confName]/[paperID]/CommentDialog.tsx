import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useParams } from 'next/navigation';
import { toast, useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { InputParamsTypeForSendComment, useSendCommentForPaperMutation } from '@/store/features/ConferenceDashboardPaperSlice';

// Define the validation schema
const paperSubmissionSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
  status: z.enum(["accepted", "review", "rejected"], { message: "Status is required" }),
});

type FormValues = z.infer<typeof paperSubmissionSchema>;

type Author = {
  email: string;
  fullname:string
};

export function CommentDialog({ comment, paperID, Authors }: { comment: string; paperID: string; Authors: Author[] }) {

  const [submitting, setSubmitting] = useState(false)
  const params=useParams()
  const authorEmailArray = Authors.map((author) => {return {email:author.email,fullname:author.fullname}});

  const form = useForm<z.infer<typeof paperSubmissionSchema>>({
    resolver: zodResolver(paperSubmissionSchema),
    defaultValues: {
      comment: comment || '',
      status: 'review',
    },
  });

  const [SendCommentFunction]=useSendCommentForPaperMutation()

  
  const { toast } = useToast();
  const onSubmit = async (data: FormValues) => {
    setSubmitting(true)
    try {
      const newParams={paperID,
              authorEmails: authorEmailArray,
              conferenceAcronmym:params.confName}
      const InputParams:InputParamsTypeForSendComment={...data,...newParams}

      const response = await SendCommentFunction(InputParams).unwrap(); // Use .unwrap() to directly get the fulfilled response or throw an error if it failed
      
      toast({
        title: 'Success',
        description: response.message,
      });

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
      setSubmitting(false)
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add a Comment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Add a Comment for Paper</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Note: By clicking on submit, the paper author will receive this comment along with Review 1 and Review 2 via email.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="comment"
                      placeholder="Write your comment here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="accepted" />
                        </FormControl>
                        <FormLabel className="font-normal">Accepted</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="review" />
                        </FormControl>
                        <FormLabel className="font-normal">Review</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="rejected" />
                        </FormControl>
                        <FormLabel className="font-normal">Rejected</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <Button type="submit" className="w-full ">{submitting ? 
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </> 
                : "Submit"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
