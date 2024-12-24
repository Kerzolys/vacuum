import { createApi } from "@reduxjs/toolkit/query/react";
import type { TEvent } from "../../utils/types";
import { firebaseBaseQuery } from "../../services/firebase/firebaseBaseQuery";
import { url } from "inspector";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: firebaseBaseQuery,
  endpoints: (builder) => ({
    getEvents: builder.query<TEvent[], void>({
      query: () => ({ url: "events", method: "GET" }),
    }),
    addEvent: builder.mutation<TEvent, TEvent>({
      query: (newEvent) => {
        return({ url: "events", method: "POST", body: newEvent })},
    }),
    updateEvent: builder.mutation<void, TEvent>({
      query: (updatedEvent) => ({
        url: "events",
        method: "PUT",
        body: updatedEvent,
      }),
    }),
    deleteEvent: builder.mutation<void, string>({
      query: (eventId) => {
        debugger
        console.log('eventId',eventId)
        return ({
        url: `events/${eventId}`,
        method: "DELETE",
      })},
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
