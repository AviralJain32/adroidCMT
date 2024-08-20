// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}


interface SubmittedPaper {
    paperTitle: string;
    paperSubmissionDate: Date;
    paperStatus: string;
    conference: { conferenceAcronym: string };
}

export const PaperApiSlice = createApi({
  reducerPath: 'paperapi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getSubmittedPapers: builder.query<SubmittedPaper[], void>({
      query: () => `/get-submitted-papers`,
      transformResponse: (response: ApiResponse<{ submittedPapers: SubmittedPaper[] }>) => {
        if (response.success) {
          return response.data.submittedPapers;
        } else {
          throw new Error(response.message);
        }
      },
    }),
    // Add other endpoints here
  }),
});

// Export hooks for usage in functional components
export const { 
  useGetSubmittedPapersQuery 
} = PaperApiSlice;
