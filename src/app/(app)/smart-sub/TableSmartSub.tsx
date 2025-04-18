'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { IConference } from '@/model/Conference';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { Badge } from '@/components/ui/badge';

interface conferencesType {
  conferences: IConference[];
}

const TableSmartSub: React.FC<conferencesType> = ({ conferences }) => {
  const router = useRouter();

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'conferenceCreatedAt', desc: true },
  ]);
  const [filtering, setFiltering] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns: ColumnDef<IConference>[] = [
    
    {
      header:'Type',
      accessorKey:'conferenceCategory',
      cell:info=>(<Badge variant={'accepted'}>{info.getValue<string>() || "Conference"}</Badge>)

    },
    {
      // Acronym Column
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Acronym
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      accessorKey: 'conferenceAcronym',
      footer: 'Acronym',
    },
    {
      // Conference Name Column
      header: 'Name',
      accessorKey: 'conferenceTitle',
      footer: 'Name',
    },

    {
      // Submission Deadline Column
      header: 'Submission Deadline',
      accessorKey: 'conferenceSubmissionsDeadlineDate',
      footer: 'Submission Deadline',
      cell: info => moment(info.getValue<string>()).format('MMMM Do YYYY'),
    },
    {
      // Conference Start Date Column
      header: 'Start Date',
      accessorKey: 'conferenceFirstDay',
      footer: 'Start Date',
      cell: info => moment(info.getValue<string>()).format('MMMM Do YYYY'),
    },
    {
      // Details Button Column
      header: 'Details',
      // accessorKey: 'conferenceAcronym',
      id: 'details', // ✅ use id instead of accessorKey
      footer: 'Details',
      cell: info => (
        <Button
          variant="outline"
          onClick={() => router.push(`/smart-sub/${info.row.original.conferenceAcronym}`)}
        >
          See Details
        </Button>
      ),
    },
    {
      accessorKey: 'conferenceCreatedAt',
      enableSorting: true,
      header: () => null,
      cell: () => null,
    },
  ];

  const table = useReactTable({
    data: conferences,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      globalFilter: filtering,
      sorting: sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onPaginationChange: setPagination,
    globalFilterFn: 'includesString',
  });

  return (
    <div>
      {/* Search & Pagination Controls */}
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Search..."
          value={filtering}
          onChange={e => table.setGlobalFilter(String(e.target.value))}
          className="max-w-60"
        />
        <div>Showing {table.getFilteredRowModel().rows.length} entries</div>
      </div>

      {/* Conference Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  console.log(headerGroup)
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-between py-4 px-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableSmartSub;
