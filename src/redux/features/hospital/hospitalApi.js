import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const chamberApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHospitals: builder.query({
      query: (search) => {
        const url = search
          ? `/api/v1/hospitals?search=${search}`
          : `/api/v1/hospitals`;
        return (
          search && {
            url: url,
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      },
      invalidatesTags: ["Hospital"],
    }),
    getHospitalDetails: builder.query({
      query: (id) => {
        return (
          id && {
            url: `/api/v1/hospitals/${id}`,
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      },
      invalidatesTags: ["Hospital"],
    }),

    createHospital: builder.mutation({
      query: (data) => ({
        url: `/api/v1/hospitals`,
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Hospital"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetHospitalsQuery, useCreateHospitalMutation, useGetHospitalDetailsQuery } = chamberApi;
export default chamberApi;
