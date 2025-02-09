import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';
import Link from 'next/link';

interface Reviewer {
  id: string;
  assignedAt: string; // ISO Date string
}

interface AcceptedPaper {
  paperId: string;
  paperTitle: string;
  reviewer: Reviewer;
  status: 'accepted' | 'rejected' | 'review'; // e.g., "accepted"
  ActualPaperId: string;
}

const AcceptedPapersTable: React.FC = () => {
  const [acceptedPapers, setAcceptedPapers] = useState<AcceptedPaper[] | null>(
    null,
  );

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        const response = await axios.get(`/api/fetch-accepted-review-requests`);
        setAcceptedPapers(response.data.requests);
      } catch (error) {
        console.error('Error fetching accepted review requests:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch accepted review requests.',
          variant: 'destructive',
        });
      }
    };

    fetchAcceptedRequests();
  }, []);

  if (!acceptedPapers || acceptedPapers.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No accepted review papers available.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Paper Title</TableHead>
          <TableHead>Accepted At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {acceptedPapers.map(paper => (
          <TableRow key={paper.paperId}>
            <TableCell>{paper.paperTitle}</TableCell>
            <TableCell>
              {paper.reviewer.assignedAt
                ? moment(paper.reviewer.assignedAt).format(
                    'DD MMM YYYY, hh:mm A',
                  )
                : 'N/A'}
            </TableCell>
            <TableCell>
              <Badge variant={paper.status}>{paper.status}</Badge>
            </TableCell>
            <TableCell>
              <Button disabled={paper.status === 'accepted'} variant="default">
                <Link
                  href={`reviewer/reviewing/${paper.ActualPaperId}?reviewer=${paper.reviewer.id}`}
                >
                  Open
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AcceptedPapersTable;
