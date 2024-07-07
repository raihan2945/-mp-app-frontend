import apiSlice from "../api";


export const appointmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: ({page, limit}) => `api/v1/appointment?page=${page? page : 1}&limit=${limit ? limit : 10}`,
            providesTags: ["appointment"]
        }),
        createAppointment: builder.mutation({
            query: (data) => ({
                url: 'api/v1/appointment',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["appointment"]
        })
    })
})

export const { useGetAppointmentsQuery, useCreateAppointmentMutation } = appointmentApi