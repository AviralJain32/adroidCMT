

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import axios from 'axios';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// // Define the validation schema
// const paperSubmissionSchema = z.object({
//   paperTitle: z.string().min(1, "Paper title is required"),
//   comment: z.string().min(1, "Comment is required"),
//   status: z.enum(["accepted", "review", "rejected"], { message: "Status is required" }),
// });

// type FormValues = z.infer<typeof paperSubmissionSchema>;

// type Author = {
//   email: string;
// };

// export function CommentDialog({ comment, paperID, Authors }: { comment: string; paperID: string; Authors: Author[] }) {
//   const authorEmailArray = Authors.map((author) => author.email);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(paperSubmissionSchema),
//     defaultValues: {
//       comment: comment || '',
//       status: 'review',
//     },
//   });

//   const onSubmit = async (data: FormValues) => {
//     console.log(data);
//     // try {
//     //   const result = await axios.post('/api/comment', {
//     //     ...data,
//     //     paperID,
//     //     authorEmails: authorEmailArray,
//     //   });

//     //   // Handle success (e.g., close dialog, show success message)
//     //   console.log('Success:', result.data);
//     // } catch (error) {
//     //   // Handle error (e.g., show error message)
//     //   console.error('Error:', error);
//     // }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>Add a Comment</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px] p-4">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <DialogHeader>
//               <DialogTitle>Add a Comment for Paper</DialogTitle>
//               <DialogDescription className="text-sm text-gray-500">
//                 Note: By clicking on submit, the paper author will receive this comment along with Review 1 and Review 2 via email.
//               </DialogDescription>
//             </DialogHeader>

//             <FormField
//               control={form.control}
//               name="comment"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Comment</FormLabel>
//                   <Textarea
//                     {...field}
//                     id="comment"
//                     placeholder="Write your comment here..."
//                   />
//                 </FormItem>
//               )}
//             />

//         <FormField
//           control={form.control}
//           name="status"
//           render={({ field }) => (
//             <FormItem className="space-y-3">
//               <FormLabel>Notify me about...</FormLabel>
//               <FormControl>
//                 <RadioGroup
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                   className="flex flex-col space-y-1"
//                 >
//                   <FormItem className="flex items-center space-x-3 space-y-0">
//                     <FormControl>
//                     {/* 'accepted' | 'rejected' | 'review' */}
//                       <RadioGroupItem value="accepted" />
//                     </FormControl>
//                     <FormLabel className="font-normal">
//                       Accepted
//                     </FormLabel>
//                   </FormItem>
//                   <FormItem className="flex items-center space-x-3 space-y-0">
//                     <FormControl>
//                       <RadioGroupItem value="review" />
//                     </FormControl>
//                     <FormLabel className="font-normal">
//                       Review
//                     </FormLabel>
//                   </FormItem>
//                   <FormItem className="flex items-center space-x-3 space-y-0">
//                     <FormControl>
//                       <RadioGroupItem value="rejected" />
//                     </FormControl>
//                     <FormLabel className="font-normal">Rejected</FormLabel>
//                   </FormItem>
//                 </RadioGroup>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//             <DialogFooter className="mt-6">
//               <Button type="submit" className="w-full">Submit</Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }


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

// Define the validation schema
const paperSubmissionSchema = z.object({
  paperTitle: z.string().min(1, "Paper title is required"),
  comment: z.string().min(1, "Comment is required"),
  status: z.enum(["accepted", "review", "rejected"], { message: "Status is required" }),
});

type FormValues = z.infer<typeof paperSubmissionSchema>;

type Author = {
  email: string;
};

export function CommentDialog({ comment, paperID, Authors }: { comment: string; paperID: string; Authors: Author[] }) {
  const authorEmailArray = Authors.map((author) => author.email);

  const form = useForm<z.infer<typeof paperSubmissionSchema>>({
    resolver: zodResolver(paperSubmissionSchema),
    defaultValues: {
      comment: comment || '',
      status: 'review',
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("option is selected")
    console.log(data);
    // try {
    //   const result = await axios.post('/api/comment', {
    //     ...data,
    //     paperID,
    //     authorEmails: authorEmailArray,
    //   });

    //   // Handle success (e.g., close dialog, show success message)
    //   console.log('Success:', result.data);
    // } catch (error) {
    //   // Handle error (e.g., show error message)
    //   console.error('Error:', error);
    // }
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

            {/* <FormField
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
            /> */}

              <Button type="submit" className="w-full ">Submit</Button>
            {/* <DialogFooter className="mt-6">
            </DialogFooter> */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
