// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const ConferenceApiSlice = createApi({
  reducerPath: 'conferenceapi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
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
    }),
  }),
});

// Export hooks for usage in functional components
export const { 
  useGetOrganizedConferencesQuery, 
} = ConferenceApiSlice;
