"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { IPaper } from "@/model/PaperSchema";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Input } from "../../../../../components/ui/input";
import Link from "next/link";
// import PaperDetailsPage from "./PaperDetailsPage";
import { usePathname, useRouter } from "next/navigation";
import { SubmittedPaper } from "@/types/SubmittedPaperType";

interface PaperTableProps {
  data: SubmittedPaper[];
}

const PaperTable: React.FC<PaperTableProps> = ({ data }) => {
  const router = useRouter()
  const pathname=usePathname()


  const DownloadFile = (file: string) => {
    try {
      fetch(file)
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          const nameSplit = file.split("/").pop();
          a.download = nameSplit ?? "download";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.log("error while downloading the file", error.message));
    } catch (error: any) {
      console.log("error while downloading the file", error.message);
    }
  };

  const getAuthorNames=(row:SubmittedPaper)=>{
    const authors = [
      ...row.paperAuthor.map((author: any) => author.fullname),
      ...row.correspondingAuthor.map((author: any) => author.fullname),
    ];
    const uniqueAuthors = Array.from(new Set(authors));
    return uniqueAuthors.join(", ");
  }

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const columns: ColumnDef<SubmittedPaper>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "paperID",
        cell: (id) => id.getValue<string>().split("-")[2],
        footer: "ID",
      },
      {
        header: "Authors",
        accessorFn: (row) => getAuthorNames(row), //row.paperAuthor[0]?.fullname || ""
        footer: "Author",
      },
      {
        header: "Title",
        accessorKey: "paperTitle",
        footer: "Title",
      },
      {
        header: "Information",
        accessorFn: row=>row.paperID,
        footer: "Information",
        cell:info=>(
          <Button variant={'outline'} onClick={()=>router.push(`${pathname}/${info.getValue()}`)}>Open</Button>
        )
      },
      {
        header: "Paper",
        accessorKey: "paperFile",
        cell: (info) => (
          <Button variant={"ghost"} onClick={() => DownloadFile(info.getValue<string>())}>
            <Download />
          </Button>
        ),
        footer: "Paper",
      },
      {
        header: "Time",
        accessorKey: "paperSubmissionDate",
        footer: "Time",
        cell: (info) => moment(info.getValue<string>()).format("MMMM Do YYYY, h:mm:ss a"),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
      sorting: sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div>
    <div className="flex items-center py-4">
      <Input
        placeholder="Search.."
        type="text"
        value={filtering}
        onChange={e => setFiltering(e.target.value)}
        className="max-w-sm"
      />
    </div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getCoreRowModel().rows?.length ? (
            table.getCoreRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
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



export default PaperTable;
