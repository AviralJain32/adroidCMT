import { IConference } from '@/model/Conference';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface SubmittedPaper {
  paperAuthor: [];
  correspondingAuthor: [];
  paperTitle: string;
  paperFile: string;
  paperKeywords: string[];
  paperAbstract: string;
  paperSubmissionDate: Date;
  conference: { conferenceAcronym: string };
  paperStatus: 'submitted' | 'accepted' | 'rejected' | 'review';
  paperID: string;
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
    getConferencePapers: builder.query<{
      paperSubmittedInConference: SubmittedPaper[],
      getConferenceDetails: IConference
    }, string>({
      query: (confName) => `/get-conference-papers?confName=${confName}`,
      transformResponse: (response: ApiResponse<{
        paperSubmittedInConference: SubmittedPaper[],
        getConferenceDetails: IConference
      }>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      },
    }),
  }),
});

export const { 
  useGetSubmittedPapersQuery,
  useGetConferencePapersQuery
} = PaperApiSlice;
