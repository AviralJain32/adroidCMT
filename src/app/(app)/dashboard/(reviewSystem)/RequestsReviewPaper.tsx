import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns'; // Ensure this package is installed

// Define the types for the props
interface User {
  _id: string;
  fullname: string;
  email: string;
}

interface ReviewRequest {
  reviewerId: { _id: string };
  requestedBy: User;
  requestedAt: string; // ISO Date string
  status: string; // e.g., "pending"
}

interface Paper {
  paperId: string;
  paperTitle: string;
  reviewRequests: ReviewRequest[];
}

interface ReviewRequestTableProps {
  requests: Paper[] | null; // Allow requests to be null
  handleAction: (
    reviewerId: string,
    action: 'accept' | 'reject',
    paperId: string,
  ) => void;
}

const ReviewRequestTable: React.FC<ReviewRequestTableProps> = ({
  requests,
  handleAction,
}) => {
  if (!requests || requests.length === 0) {
    return (
      <p className="text-center text-gray-500">No review requests available.</p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Paper Title</TableHead>
          <TableHead>Requested By</TableHead>
          <TableHead>Requested At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map(request => (
          <TableRow key={request.paperId}>
            <TableCell>{request.paperTitle}</TableCell>
            <TableCell>
              {request.reviewRequests[0]?.requestedBy?.fullname || 'N/A'} (
              {request.reviewRequests[0]?.requestedBy?.email || 'N/A'})
            </TableCell>
            <TableCell>
              {request.reviewRequests[0]?.requestedAt
                ? format(
                    new Date(request.reviewRequests[0].requestedAt),
                    'dd MMM yyyy, hh:mm a',
                  )
                : 'N/A'}
            </TableCell>
            <TableCell>
              <Button
                variant="default"
                onClick={() =>
                  handleAction(
                    request.reviewRequests[0]?.reviewerId._id || '',
                    'accept',
                    request.paperId,
                  )
                }
                className="mr-2"
              >
                Accept
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  handleAction(
                    request.reviewRequests[0]?.reviewerId._id || '',
                    'reject',
                    request.paperId,
                  )
                }
              >
                Reject
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReviewRequestTable;
