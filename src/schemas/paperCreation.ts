import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
function checkFileType(file: File) {
    if (file?.name) {
        const fileType = file.name.split(".").pop();
        if (fileType === "docx" || fileType === "pdf") return true;
    }
    return false;
}

const paperSubmissionSchema = z.object({
  paperTitle: z.string().min(1, "Paper title is required"),
  paperKeywords: z.string().min(2,{message:"the paper keyword length should be greater than 2"}),
  paperKeyphrases: z.string().min(2,{message:"the paper keyword length should be greater than 2"}),
  paperAbstract: z.string().min(1, "Paper abstract is required"),
  
  paperFile: z
  .instanceof(FileList)
  .refine((file) => file?.length == 1, 'File is required.')

// paperFile: z.any()
//   .refine((file: File) => file?.size !== 0, "File is required")
//   .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
//   .refine((file) => checkFileType(file), "Only .pdf, .docx formats are supported."),
});

export { paperSubmissionSchema };
