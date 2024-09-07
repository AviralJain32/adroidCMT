// Need to use the React-specific entry point to import createApi
import { conferenceSchema } from '@/schemas/conferenceCreation';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { z } from 'zod';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface OrganizedConference {
    _id: string;
    conferenceAcronym: string;
    conferenceOrganizerRole: string;
    conferenceCreatedAt: Date;
}

interface updateType {
  confAcronym: string;
  conferenceDetails: z.infer<typeof conferenceSchema>;
}

export const ConferenceApiSlice = createApi({
  reducerPath: 'conferenceapi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['conference'],
  endpoints: (builder) => ({
    getOrganizedConferences: builder.query<OrganizedConference[], void>({
      query: () => `/get-conferences`,
      transformResponse: (response: ApiResponse<{ organizedConferences: OrganizedConference[] }>) => {
        if (response.success) {
          return response.data.organizedConferences;
        } else {
          throw new Error(response.message);
        }
      },
      providesTags: ['conference'],
    }),
    createNewConference: builder.mutation<ApiResponse<null>, z.infer<typeof conferenceSchema>>({
      query: (newConference) => ({
        url: '/create-conference',
        method: 'POST',
        body: newConference,
      }),
      invalidatesTags: ['conference'],
    }),
    updateConference: builder.mutation<ApiResponse<null>, updateType>({
      query: ({ confAcronym, conferenceDetails }) => ({
        url: `/edit-conference?confAcronym=${confAcronym}`,
        method: 'PUT',
        body: conferenceDetails,
      }),
      invalidatesTags: ['conference'],
    }),
  }),
});

// Export hooks for usage in functional components
export const { 
  useGetOrganizedConferencesQuery, 
  useCreateNewConferenceMutation, 
  useUpdateConferenceMutation
} = ConferenceApiSlice;
