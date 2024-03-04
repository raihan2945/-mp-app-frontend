import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const experienceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorExperiences: builder.query({
      query: (id) => {
        const url = `api/v1/experience/doctor/${id}`;
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
      invalidatesTags: ["Research"],
    }),

    createDoctorExperience: builder.mutation({
      query: (data) => ({
        url: `/api/v1/experience/doctor`,
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Research"],
      providesTags: ["Research"],
    }),
    updateDoctorExperience: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/experience/doctor/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Research"],
      providesTags: ["Research"],
    }),
    deleteDoctorExperience: builder.mutation({
      query: (id) => ({
        url: `/api/v1/experience/doctor/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Research"],
      providesTags: ["Research"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDoctorExperiencesQuery,
  useUpdateDoctorExperienceMutation,
  useCreateDoctorExperienceMutation,
  useDeleteDoctorExperienceMutation,
} = experienceApi;
export default experienceApi;
