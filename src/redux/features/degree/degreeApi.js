import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const degreeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDegrees: builder.query({
      query: (search) => {
        const url = search
          ? `/api/v1/degrees?search=${search}`
          : `/api/v1/degrees`;
        return {
          url: url,
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Degree"],
      providesTags : ["Degree"]
    }),
    getDoctorDegrees: builder.query({
      query: (id) => {
        const url = `api/v1/degrees/doctor/${id}`;
        return (
          id && {
            url: url,
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      },
      invalidatesTags: ["Degree"],
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
      invalidatesTags: ["Degree"],
    }),

    createDoctorDegree: builder.mutation({
      query: (data) => ({
        url: `/api/v1/degrees/doctor`,
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Degree"],
      providesTags : ["Degree"]
    }),
    updateDoctorDegree: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/degrees/doctor/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Degree"],
      providesTags : ["Degree"]
    }),
    deleteDoctorDegree: builder.mutation({
      query: (id) => ({
        url: `/api/v1/degrees/doctor/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Degree"],
      providesTags : ["Degree"]
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDegreesQuery,
  useGetDoctorDegreesQuery,
  useCreateDoctorDegreeMutation,
  useUpdateDoctorDegreeMutation,
  useDeleteDoctorDegreeMutation,
} = degreeApi;
export default degreeApi;
