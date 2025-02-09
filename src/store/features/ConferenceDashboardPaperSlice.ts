import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
interface PaperDetails {
  correspondingAuthor: AuthorDetails[];
  paperTitle: string;
  paperKeywords: string[];
  paperAuthor: AuthorDetails[];
  paperAbstract: string;
  paperSubmissionDate: Date;
  paperStatus:
    | 'submitted'
    | 'accepted'
    | 'rejected'
    | 'review'
    | 'outline'
    | null
    | undefined;
  paperID: string;
  paperFile: string;
  paperReview1: string;
  comment: string;
  reviewers: ReviewerDetails[];
  reviewRequests: ReviewRequestDetails[];
}

interface AuthorDetails {
  fullname: string;
  email: string;
  country: string;
  affilation: string;
  webpage: string;
}

interface ReviewerDetails {
  Id: { fullname: string; email: string };
  status: 'accepted' | 'review' | 'rejected';
  assignedAt: Date;
  reviewedAt?: Date;
  comments?: string;
}

interface ReviewRequestDetails {
  reviewerId: { fullname: string; email: string };
  status: 'pending' | 'accepted' | 'rejected';
  requestedAt: Date;
  resolvedAt?: Date;
}
export type InputParamsTypeForSendComment = {
  comment: string;
  status: string;
  paperID: string;
  authorEmails: { email: string; fullname: string }[];
  conferenceAcronmym: string | string[];
};
export const ConferenceDashboardPaperSlice = createApi({
  reducerPath: 'conferencedashboardpaperapi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['addcomment'],
  endpoints: builder => ({
    getPaperDetailsByPaperID: builder.query<PaperDetails, string>({
      // pahla parameter kya response aayega vo batata hai, second parameter kya input dere ho in query vo batata hai
      query: paperID => `/get-paper-details-by-paper-id?paperID=${paperID}`,
      transformResponse: (response: ApiResponse<PaperDetails>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      },
      providesTags: ['addcomment'],
    }),
    sendCommentForPaper: builder.mutation<
      ApiResponse<null>,
      InputParamsTypeForSendComment
    >({
      query: InputParams => ({
        url: '/add-comment',
        method: 'PATCH',
        body: {
          comment: InputParams.comment,
          status: InputParams.status,
          paperID: InputParams.paperID,
          authorEmails: InputParams.authorEmails,
          conferenceAcronmym: InputParams.conferenceAcronmym,
        },
      }),
      invalidatesTags: ['addcomment'],
    }),
  }),
});

export const {
  useGetPaperDetailsByPaperIDQuery,
  useSendCommentForPaperMutation,
} = ConferenceDashboardPaperSlice;
