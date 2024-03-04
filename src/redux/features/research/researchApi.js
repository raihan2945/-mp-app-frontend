import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const researchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorResearchs: builder.query({
      query: (id) => {
        const url = `api/v1/research/doctor/${id}`;
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

    createDoctorResearch: builder.mutation({
      query: (data) => ({
        url: `/api/v1/research/doctor`,
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Research"],
      providesTags: ["Research"],
    }),

    updateDoctorResearch: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/research/doctor/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Research"],
      providesTags: ["Research"],
    }),

    deleteDoctorResearch: builder.mutation({
      query: (id) => ({
        url: `/api/v1/research/doctor/${id}`,
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
  useGetDoctorResearchsQuery,
  useCreateDoctorResearchMutation,
  useUpdateDoctorResearchMutation,
  useDeleteDoctorResearchMutation
} = researchApi;
export default researchApi;
