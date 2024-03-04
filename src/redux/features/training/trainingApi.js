import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const trainingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorTrainings: builder.query({
      query: (id) => {
        const url = `api/v1/training/doctor/${id}`;
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
      invalidatesTags: ["Training"],
    }),

    createDoctorTraining: builder.mutation({
      query: (data) => ({
        url: `/api/v1/training/doctor`,
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Training"],
      providesTags: ["Training"],
    }),

    updateDoctorTraining: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/Training/doctor/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Training"],
      providesTags: ["Training"],
    }),

    deleteDoctorTraining: builder.mutation({
      query: (id) => ({
        url: `/api/v1/training/doctor/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Training"],
      providesTags: ["Training"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDoctorTrainingsQuery,
  useCreateDoctorTrainingMutation,
  useUpdateDoctorTrainingMutation,
  useDeleteDoctorTrainingMutation,
} = trainingApi;
export default trainingApi;
