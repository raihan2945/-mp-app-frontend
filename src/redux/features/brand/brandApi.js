import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrandsByDoctor: builder.query({
      query: (id) => {
        const url = `api/v1/brand/doctor/${id}`;
        return {
          url: url,
          method: "GET",
        };
      },
      invalidatesTags: ["Brand"],
    }),

    assignBrand: builder.mutation({
      query: (data) => ({
        url: `/api/v1/brand`,
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
  overrideExisting: true,
});

export const { useAssignBrandMutation, useGetAllBrandsByDoctorQuery } =
  brandApi;
export default brandApi;
