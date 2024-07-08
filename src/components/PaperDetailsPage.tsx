import { IPaper } from '@/model/PaperSchema'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
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
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import moment from 'moment'

interface paperDetails{
    paperTitle:string,
    paperKeywords:string[],
    paperKeyphrases:string[],
    paperAuthor:object,
    paperAbstract:string,
    paperSubmissionDate:Date,
    paperStatus:string,
    paperID:string,
    paperFile:string

}
const PaperDetailsPage = ({paperTitle,
    paperKeywords,
    paperKeyphrases,
    paperAuthor,
    paperAbstract,
    paperStatus,
    paperID,
    paperFile,
    paperSubmissionDate
}:paperDetails) => {
  return (
    <div>
        <AlertDialog >
        <AlertDialogTrigger><Button variant={"outline"}>Open</Button></AlertDialogTrigger>
        <AlertDialogContent >
            <AlertDialogHeader>
            <AlertDialogTitle>Submission {paperID.split("-")[2]}</AlertDialogTitle>
            <AlertDialogDescription>
            <Table>
            <TableCaption>Paper Details</TableCaption>
            <TableBody>
                <TableRow>
                <TableHead >Title</TableHead>
                <TableCell className="font-medium">INV001</TableCell>
                </TableRow>
                <TableRow>
                <TableHead >Author keywords</TableHead>
                <TableCell className="font-medium">{paperKeywords.map((keyword)=>( <Badge className='m-1' variant="outline">{keyword}</Badge>))}</TableCell>
                </TableRow>
                <TableRow>
                <TableHead >Adroid CMT keyphrases</TableHead>
                <TableCell className="font-medium">{paperKeyphrases.map((keyword)=>( <Badge className='m-1' variant="outline">{keyword}</Badge>))}</TableCell>
                </TableRow>
                <TableRow>
                <TableHead >Abstract</TableHead>
                <TableCell className="font-medium">{paperAbstract}</TableCell>
                </TableRow>
                <TableRow>
                <TableHead >Submitted</TableHead>
                <TableCell className="font-medium">{moment(paperSubmissionDate).format("MMMM Do YYYY, h:mm:ss a")}</TableCell>
                </TableRow>
                <TableRow>
                <TableHead >Decision</TableHead>
                <TableCell className="font-medium">{paperStatus}</TableCell>
                </TableRow>
            </TableBody>
            </Table>

            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>


    </div>
  )
}

export default PaperDetailsPage


// import { IPaper } from '@/model/PaperSchema'
// import React from 'react'
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table"
  
//   import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//   } from "@/components/ui/dialog"
  
// import { Button } from './ui/button'

// interface paperDetails{
//     paperTitle:string,
//     paperKeywords:string[],
//     paperKeyphrases:string[],
//     paperAuthor:object,
//     paperAbstract:string,
//     paperSubmissionDate:Date,
//     paperStatus:string,
//     paperID:string,
//     paperFile:string

// }
// const PaperDetailsPage = ({paperTitle,
//     paperKeywords,
//     paperKeyphrases,
//     paperAuthor,
//     paperAbstract,
//     paperStatus,
//     paperID,
//     paperFile,
// }:paperDetails) => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Edit Profile</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit profile</DialogTitle>
//           <DialogDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <Table>
//              <TableCaption>Paper Details</TableCaption>
//              <TableBody>
//                  <TableRow>
//                  <TableHead >Title</TableHead>
//                  <TableCell className="font-medium">INV001</TableCell>
//                  </TableRow>
//                  <TableRow>
//                  <TableHead >Author keywords</TableHead>
//                  <TableCell className="font-medium">{paperKeywords}</TableCell>
//                  </TableRow>
//                  <TableRow>
//                  <TableHead >Adroid CMT keyphrases</TableHead>
//                  <TableCell className="font-medium">INV001</TableCell>
//                  </TableRow>
//                  <TableRow>
//                  <TableHead >Abstract</TableHead>
//                  <TableCell className="font-medium">INV001</TableCell>
//                  </TableRow>
//                  <TableRow>
//                  <TableHead >Submitted</TableHead>
//                  <TableCell className="font-medium">INV001</TableCell>
//                  </TableRow>
//                  <TableRow>
//                  <TableHead >Decision</TableHead>
//                  <TableCell className="font-medium">INV001</TableCell>
//                  </TableRow>
//              </TableBody>
//              </Table>
//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default PaperDetailsPage
