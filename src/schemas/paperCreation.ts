import { z } from 'zod';

// const MAX_FILE_SIZE = 5000000;
// function checkFileType(file: File) {
//     if (file?.name) {
//         const fileType = file.name.split(".").pop();
//         if (fileType === "docx" || fileType === "pdf") return true;
//     }
//     return false;
// }

const paperSubmissionSchema = z.object({
  paperTitle: z.string().min(1, "Paper title is required"),
  paperKeywords: z.string().min(2,{message:"the paper keyword length should be greater than 2"}),
  paperKeyphrases: z.string().min(2,{message:"the paper keyword length should be greater than 2"}),
  paperAbstract: z.string().min(1, "Paper abstract is required"),
  
  paperFile: z
  .instanceof(FileList)
  .refine((file) => file?.length == 1, 'File is required.'),
  paperAuthors:z.array(z.object({
    FirstName:z.string().min(3,"first name should be atleast minimum of 3 character"),
    
  }))
});

export { paperSubmissionSchema };
