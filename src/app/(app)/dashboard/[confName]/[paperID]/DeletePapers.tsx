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
import { Button } from "@/components/ui/button";
import { SubmittedPaper } from "@/types/SubmittedPaperType";
import { useDeleteConferencePaperMutation } from "@/store/features/PaperApiSlice";
import { toast } from "@/components/ui/use-toast";

interface PaperSubmittedType {
  selectedRows: SubmittedPaper[];
}

export function DeletePapers({ selectedRows }: PaperSubmittedType) {
  const [deletePaper, { isLoading, isSuccess, isError, error }] =
    useDeleteConferencePaperMutation();

  const hasSelectedPapers = selectedRows.length > 0;
  const paperIdList = selectedRows.map((row) => row.paperID);

  const handleDelete = async () => {
    if (!hasSelectedPapers) return;

    try {
      // Pass the array of paper IDs in one API call
      const response=await deletePaper({
        paperIdList
      }).unwrap();
      toast({
        title: 'Success',
        description: response.message,
      });
      console.log(response)

    } catch (error:any) {
      console.error("Failed to delete papers:", error);
      toast({
        title: 'Failed to delete papers:',
        description:error.data.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={!hasSelectedPapers}>
          {hasSelectedPapers ? "Delete Selected Papers" : "No Papers Selected"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {hasSelectedPapers
              ? "Confirm Paper Deletion"
              : "No Papers Selected"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {hasSelectedPapers ? (
              <>
                You are about to permanently delete the following papers:
                <ul className="mt-2">
                  {selectedRows.map((row) => (
                    <li key={row.paperID}>Paper ID: {row.paperID}</li>
                  ))}
                </ul>
                <p className="mt-4">
                  This action cannot be undone. Once deleted, your data will be
                  irreversibly removed from our servers.
                </p>
              </>
            ) : (
              <>Please select at least one paper to delete.</>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {hasSelectedPapers && (
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
