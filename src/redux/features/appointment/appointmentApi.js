import apiSlice from "../api";


export const appointmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: () => 'api/v1/appointment'
        })
    })
})

export const { useGetAppointmentsQuery } = appointmentApi