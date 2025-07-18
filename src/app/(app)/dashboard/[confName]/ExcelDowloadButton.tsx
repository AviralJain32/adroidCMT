// components/DownloadExcelButton.js
'use client';

import React from 'react';
import { exportToExcel } from '@/helpers/exportToExcel';
import { SubmittedPaper } from '@/types/SubmittedPaperType';
import moment from 'moment';

const DownloadExcelButton = ({ papers }:any) => {
  const getAuthorNames = (row: SubmittedPaper): [string, string] => {
  const authors = row.paperAuthor.map((author: any) => author.userId?.fullname || author.name);
  const correspondingAuthors = row.correspondingAuthor.map((author: any) => author.userId?.fullname || author.name);

  const uniqueAuthors = Array.from(new Set(authors)).join(', ');
  const uniqueCorrespondingAuthors = Array.from(new Set(correspondingAuthors)).join(', ');

  return [uniqueAuthors, uniqueCorrespondingAuthors];
  };

  const santizedPapers = papers.map((paper: SubmittedPaper) => {
    const [authors, correspondingAuthors] = getAuthorNames(paper);

    return {
      PaperId: paper.paperID,
      PaperTitle: paper.paperTitle,
      Authors: authors,
      CorrespondingAuthors: correspondingAuthors,
      Keywords: paper.paperKeywords.join(', '),
      Abstract: paper.paperAbstract,
      SubmissionDate: moment(paper.paperSubmissionDate).format('MMMM Do YYYY, h:mm:ss a'),
    };
  });
  const handleDownload = () => {
    exportToExcel(santizedPapers, 'conference_papers');
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Download Excel
    </button>
  );
};

export default DownloadExcelButton;
