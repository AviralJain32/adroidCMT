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


// export function Review1Dialog({ Review1,paperID }: { Review1: string,paperID:string }) {
//   const [reviewText, setReviewText] = useState(Review1 || "No existing Review");

//   const handleSaveChanges = async () => {
//     try {
//       // Replace with your API endpoint
//       const response = await axios.patch(`/api/add-review?paperID=${paperID}`, {
//         review: reviewText,
//         reviewType:"review1"
//       });
//       console.log(response)
//       toast({
//         title: 'Success',
//         description: response.data.message,
//         variant:"default"
//       });

//       // Handle successful save, e.g., close dialog, show notification, etc.
//       if (response.status === 200) {
//         console.log('Review saved successfully');
//         // Close the dialog or show a success notification here
//       }
//     } catch (error: any) {
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'An unexpected error occurred',
//         variant: 'destructive',
//       });
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
//             Make changes to your Review here. Click save when you're done.
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
//           <Button type="submit" onClick={handleSaveChanges}>
//             Save changes
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react"; // Import a loader icon

export function Review2Dialog({ Review1, paperID }: { Review1: string; paperID: string }) {
  const [reviewText, setReviewText] = useState(Review1 || "No existing Review");
  const [loading, setLoading] = useState(false);
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSaveChanges = async () => {
    setLoading(true);
    // setSuccessMessage(null);
    try {
      const response = await axios.patch(`/api/add-review?paperID=${paperID}`, {
        review: reviewText,
        reviewType: "review2"
      });
      toast({
        title: 'Success',
        description: response.data.message,
        variant: "default"
      });

      // if (response.status === 200) {
      //   setSuccessMessage('Review saved successfully');
      // }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Review 2</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Review</DialogTitle>
          <DialogDescription>
            Make changes to your Review here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          id="review"
          rows={10}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="col-span-3"
        />
        <DialogFooter>
          <Button type="submit" onClick={handleSaveChanges} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
        {/* {successMessage && (
          <p className="text-green-500 mt-2 text-sm">{successMessage}</p>
        )} */}
      </DialogContent>
    </Dialog>
  );
}
