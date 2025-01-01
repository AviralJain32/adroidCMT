// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { SubmittedPaper } from "@/types/SubmittedPaperType";
// import { useState } from "react";

// // Define validation schema using Zod
// const downloadRangeSchema = z.object({
//   lowerRange: z
//     .string()
//     .transform((value) => parseFloat(value))
//     .refine((value) => !isNaN(value) && value > 0, {
//       message: "Lower range must be a positive number",
//     }),
//   upperRange: z
//     .string()
//     .transform((value) => parseFloat(value))
//     .refine((value) => !isNaN(value) && value > 0, {
//       message: "Upper range must be a positive number",
//     }),
// }).refine((data) => data.upperRange > data.lowerRange, {
//   message: "Upper range must be greater than lower range",
//   path: ["upperRange"],
// });

// type DownloadRangeFormData = z.infer<typeof downloadRangeSchema>;

// interface PaperType {
//   papers: SubmittedPaper[];
//   downloadPaperFunction: (file: string) => void;
// }

// export function DownloadPapers({ papers, downloadPaperFunction }: PaperType) {
//   const [availablePapers, setAvailablePapers] = useState<SubmittedPaper[]>([]);

//   const form = useForm<DownloadRangeFormData>({
//     resolver: zodResolver(downloadRangeSchema),
//     defaultValues: {
//       lowerRange: undefined,
//       upperRange: undefined,
//     },
//   });

//   // Function to check if papers are downloadable based on the entered range
//   const checkDownloadablePapers = (range: DownloadRangeFormData, papers: SubmittedPaper[]) => {
//     const { lowerRange, upperRange } = range;

//     // Filter papers based on ID within the range
//     const downloadablePapers = papers.filter((paper) => {
//       const paperId = parseInt(paper.paperID.split("-").pop()!); // Extract the numeric ID from 'aviral-1234-1'
//       return paperId >= lowerRange && paperId <= upperRange;
//     });

//     // Set available papers for download
//     setAvailablePapers(downloadablePapers);
//   };

//   // Function to download papers based on the entered range
//   const downloadBulkPaper = (range: DownloadRangeFormData) => {
    
//     const { lowerRange, upperRange } = range;

//     // Filter papers based on ID within the range
//     const downloadablePapers = papers.filter((paper) => {
//       const paperId = parseInt(paper.paperID.split("-").pop()!); // Extract the numeric ID from 'aviral-1234-1'
//       return paperId >= lowerRange && paperId <= upperRange;
//     });


//     // Trigger the download function for each paper
//     downloadablePapers.forEach((paper) => {
//       downloadPaperFunction(paper.paperFile);
//     });
//   };

//   const onSubmit = (data: DownloadRangeFormData) => {
//     checkDownloadablePapers(data, papers);
//   };

//   const onContinue = (data: DownloadRangeFormData) => {
//     downloadBulkPaper(data);
//   };

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button variant="outline">Download Papers</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <AlertDialogHeader>
//               <AlertDialogTitle>Enter the range of papers you want to download</AlertDialogTitle>
//               <AlertDialogDescription>
//                 Provide a range of paper numbers to download (e.g., 1-22).
//               </AlertDialogDescription>
//             </AlertDialogHeader>

//             {/* Lower Range Field */}
//             <FormField
//               control={form.control}
//               name="lowerRange"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>From (Lower Range)</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       type="number"
//                       placeholder="Enter lower range"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Upper Range Field */}
//             <FormField
//               control={form.control}
//               name="upperRange"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>To (Upper Range)</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       type="number"
//                       placeholder="Enter upper range"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Button to trigger the check */}
//             <Button
//               type="button"
//               onClick={form.handleSubmit(onSubmit)}
//               variant="outline"
//             >
//               Check Available Papers
//             </Button>

//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <Button type="submit" onClick={form.handleSubmit(onContinue)} >
//                 Download Papers
//               </Button>
//             </AlertDialogFooter>
//           </form>
//         </Form>

//         {/* Display available papers */}
//         {availablePapers.length > 0 ? (
//           <div className="mt-4">
//             <h3 className="font-bold">Available Papers for Download:</h3>
//             <ul className="list-disc list-inside">
//               {availablePapers.map((paper) => (
//                 <li key={paper.paperID}>
//                   Paper ID: {paper.paperID}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           <div>No paper is available in this range</div>
//         )}
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { SubmittedPaper } from "@/types/SubmittedPaperType";
import { useState } from "react";

// Define validation schema using Zod for multiple ranges
const downloadRangeSchema = z.object({
  ranges: z.array(
    z.object({
      lowerRange: z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value) && value > 0, {
          message: "Lower range must be a positive number",
        }),
      upperRange: z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value) && value > 0, {
          message: "Upper range must be a positive number",
        }),
    }).refine((data) => data.upperRange > data.lowerRange, {
      message: "Upper range must be greater than lower range",
      path: ["upperRange"],
    })
  ),
});

type DownloadRangeFormData = z.infer<typeof downloadRangeSchema>;

interface PaperType {
  papers: SubmittedPaper[];
  downloadPaperFunction: (file: string) => void;
}

export function DownloadPapers({ papers, downloadPaperFunction }: PaperType) {
  const [availablePapers, setAvailablePapers] = useState<SubmittedPaper[]>([]);

  const form = useForm<DownloadRangeFormData>({
    resolver: zodResolver(downloadRangeSchema),
    defaultValues: {
      ranges: [{ lowerRange: 0, upperRange: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ranges",
  });

  // Function to check if papers are downloadable based on the entered ranges
  const checkDownloadablePapers = (ranges: DownloadRangeFormData["ranges"], papers: SubmittedPaper[]) => {
    const downloadablePapers = papers.filter((paper) => {
      const paperId = parseInt(paper.paperID.split("-").pop()!); // Extract the numeric ID from 'aviral-1234-1'
      return ranges.some((range) => paperId >= range.lowerRange && paperId <= range.upperRange);
    });
    setAvailablePapers(downloadablePapers);
  };

  // Function to download papers based on the entered ranges
  const downloadBulkPapers = (ranges: DownloadRangeFormData["ranges"]) => {
    const downloadablePapers = papers.filter((paper) => {
      const paperId = parseInt(paper.paperID.split("-").pop()!); // Extract the numeric ID from 'aviral-1234-1'
      return ranges.some((range) => paperId >= range.lowerRange && paperId <= range.upperRange);
    });

    // Trigger the download function for each paper
    downloadablePapers.forEach((paper) => {
      downloadPaperFunction(paper.paperFile);
    });
  };

  const onSubmit = (data: DownloadRangeFormData) => {
    checkDownloadablePapers(data.ranges, papers);
  };

  const onContinue = (data: DownloadRangeFormData) => {
    downloadBulkPapers(data.ranges);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Download Papers</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AlertDialogHeader>
              <AlertDialogTitle>Enter the range of papers you want to download</AlertDialogTitle>
              <AlertDialogDescription>
                Provide multiple ranges of paper numbers to download (e.g., 1-10, 15-30).
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* Dynamic Range Fields */}
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <FormField
                  control={form.control}
                  name={`ranges.${index}.lowerRange`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From (Lower Range)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Enter lower range" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`ranges.${index}.upperRange`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To (Upper Range)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Enter upper range" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="outline"
                      className="text-red-600"
                    >
                      Remove Range
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {/* Add new range */}
            <Button
              type="button"
              onClick={() => append({ lowerRange: 0, upperRange: 0 })}
              variant="outline"
            >
              Add Range
            </Button>

            {/* Button to trigger the check */}
            <Button type="button" onClick={form.handleSubmit(onSubmit)} variant="outline">
              Check Available Papers
            </Button>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" onClick={form.handleSubmit(onContinue)}>
                Download Papers
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>

        {/* Display available papers */}
        {availablePapers.length > 0 ? (
          <div className="mt-4">
            <h3 className="font-bold">Available Papers for Download:</h3>
            <ul className="list-disc list-inside">
              {availablePapers.map((paper) => (
                <li key={paper.paperID}>
                  Paper ID: {paper.paperID}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No paper is available in these ranges</div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
