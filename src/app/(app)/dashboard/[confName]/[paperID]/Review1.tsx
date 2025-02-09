// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import axios from "axios";
// import { toast } from "@/components/ui/use-toast";
// import { Loader2 } from "lucide-react"; // Import a loader icon

// export function Review1Dialog({ Review1, paperID }: { Review1: string; paperID: string }) {
//   console.log(Review1)
//   const [reviewText, setReviewText] = useState(Review1 || "No existing Review");
//   const [loading, setLoading] = useState(false);
//   // const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const handleSaveChanges = async () => {
//     setLoading(true);
//     // setSuccessMessage(null);
//     try {
//       const response = await axios.patch(`/api/add-review?paperID=${paperID}`, {
//         review: reviewText,
//         reviewType: "review1"
//       });
//       toast({
//         title: 'Success',
//         description: response.data.message,
//         variant: "default"
//       });

//       // if (response.status === 200) {
//       //   setSuccessMessage('Review saved successfully');
//       // }
//     } catch (error: any) {
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'An unexpected error occurred',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="destructive">Review 1</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add a Review</DialogTitle>
//           <DialogDescription>
//             Make changes to your Review here. Click save when you&apos;re done.
//           </DialogDescription>
//         </DialogHeader>
//         <Textarea
//           id="review"
//           rows={10}
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//           className="col-span-3"
//         />
//         <DialogFooter>
//           <Button type="submit" onClick={handleSaveChanges} disabled={loading}>
//             {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//             Save changes
//           </Button>
//         </DialogFooter>
//         {/* {successMessage && (
//           <p className="text-green-500 mt-2 text-sm">{successMessage}</p>
//         )} */}
//       </DialogContent>
//     </Dialog>
//   );
// }
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export function Review1Dialog({
  Review1,
  paperID,
}: {
  Review1: string;
  paperID: string;
}) {
  const [emailInput, setEmailInput] = useState(''); // Input for email
  const [emailList, setEmailList] = useState<string[]>([]); // List of valid emails
  const [userIDlist, setUserIDlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // Loading state for overall save
  const [emailLoading, setEmailLoading] = useState(false); // Loading state for email validation

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addEmail = async () => {
    if (!isValidEmail(emailInput)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    if (emailList.includes(emailInput)) {
      toast({
        title: 'Duplicate Email',
        description: 'This email is already added.',
        variant: 'destructive',
      });
      return;
    }

    setEmailLoading(true);

    try {
      // Validate email with backend
      const response = await axios.get(
        `/api/check-valid-user-and-reviewer?userEmail=${emailInput}`,
      );
      if (response.data.success) {
        setEmailList([...emailList, emailInput]);
        setUserIDlist([...userIDlist, response.data.id]);
        setEmailInput(''); // Clear input after adding
        toast({
          title: 'Email Added',
          description: 'The email is valid and has been added to the list.',
          variant: 'default',
        });
      } else {
        toast({
          title: 'Invalid Reviewer',
          description: response.data.message || 'The email is not valid.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error.response?.data?.message ||
          'An unexpected error occurred while validating the email.',
        variant: 'destructive',
      });
    } finally {
      setEmailLoading(false);
    }
  };

  const removeEmail = (email: string) => {
    const emailIndex = emailList.indexOf(email);
    if (emailIndex !== -1) {
      setEmailList(prev => prev.filter((_, index) => index !== emailIndex)); // Remove email
      setUserIDlist(prev => prev.filter((_, index) => index !== emailIndex)); // Remove corresponding user ID
    }
  };

  const handleSaveChanges = async () => {
    if (emailList.length === 0) {
      toast({
        title: 'No Emails',
        description: 'Please add at least one email.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Send the reviewer list to the backend
      const response = await axios.patch(
        `/api/add-reviewer-id-and-send-mail?paperID=${paperID}`,
        {
          reviewerIds: userIDlist,
        },
      );

      toast({
        title: 'Success',
        description:
          response.data.message || 'Reviewers have been assigned successfully.',
        variant: 'default',
      });

      // Clear email and user ID lists after successful submission
      setEmailList([]);
      setUserIDlist([]);
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error.response?.data?.message ||
          'An error occurred while saving changes.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Assign Reviewers</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Reviewers Email</DialogTitle>
          <DialogDescription>
            Assign reviewers and make changes to your review here. Click save
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              type="email"
              placeholder="Enter reviewer's email"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              className="col-span-3"
              disabled={emailLoading}
            />
            <Button onClick={addEmail} disabled={emailLoading}>
              {emailLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Add Email'
              )}
            </Button>
          </div>
          <div>
            {emailList.length > 0 && (
              <ul className="space-y-2">
                {emailList.map((email, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{email}</span>
                    <Button
                      variant="ghost"
                      onClick={() => removeEmail(email)}
                      className="text-red-500"
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveChanges} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
