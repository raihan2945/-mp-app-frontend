import apiSlice from "../api";


export const appointmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: () => 'api/v1/appointment',
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