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
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { CircleHelp } from "lucide-react"
  
type AlertInfoProp={
    title:String,
    description:String
}

  export function AlertInfoDialog({title,description}:AlertInfoProp) {
    return (
      <AlertDialog>
        <AlertDialogTrigger className="rounded-full py-[-10]" asChild>
          <Button className="my-[-10px] mx-1 p-[-1px] py-[-100px]  absolute hover:bg-none hover:outline-none" variant="link"><CircleHelp size={"1rem"}/></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  