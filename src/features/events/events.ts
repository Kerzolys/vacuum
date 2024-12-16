import { createApi } from "@reduxjs/toolkit/query/react";
import type { TEvent } from "../../utils/types";
import { firebaseBaseQuery } from "../../services/firebase/firebaseBaseQuery";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: firebaseBaseQuery,
  endpoints: (builder) => ({
    getEvents: builder.query<TEvent[], void>({
      query: () => ({ url: "events", method: "GET" }),
    }),
    addEvent: builder.mutation<void, TEvent>({
      query: (newEvent) => ({ url: "events", method: "POST", body: newEvent }),
    }),
    updateEvent: builder.mutation<void, TEvent>({
      query: (updatedEvent) => ({
        url: "events",
        method: "PUT",
        body: updatedEvent,
      }),
    }),
    deleteEvent: builder.mutation<void, TEvent>({
      query: (eventId) => ({
        url: `events/${eventId.id}`,
        method: "DELETE",
        body: eventId,
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
