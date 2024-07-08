import apiSlice from "../api";

export const appointmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: ({ page, limit, search }) =>
        `api/v1/appointment?page=${page ? page : 1}&limit=${
          limit ? limit : 10
        }${search ? '&search='+search : ''}`,
      providesTags: ["appointment"],
    }),
    getAppointment: builder.query({
      query: ( id ) => `api/v1/appointment/${id}`,
      providesTags: ["appointment"],
    }),
    createAppointment: builder.mutation({
      query: (data) => ({
        url: "api/v1/appointment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["appointment"],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, data }) => ({
        url: "api/v1/appointment/" + id,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["appointment"],
    }),
    deleteAppointment: builder.mutation({
      query: ( id ) => ({
        url: "api/v1/appointment/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["appointment"],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAppointmentQuery,
  useUpdateAppointmentMutation,
} = appointmentApi;
