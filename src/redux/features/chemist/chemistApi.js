import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const chemistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChemists: builder.query({
      query: (id) => ({
        url: `/api/v1/chemists/by_mio/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chemist"],
    }),
    getChemistProfile: builder.query({
      query: (id) => ({
        url: `/api/v1/chemists/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chemist"],
    }),
    updateChemist: builder.mutation({
      query: ({data}) => {
        return {
          url: `/api/v1/chemists`,
          method: "POST",
          body: data,
          headers: {
            authorization: `Bearer ${token}`
          },
        };
      },

      invalidatesTags: ["User"],
      providesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetChemistsQuery,useGetChemistProfileQuery, useUpdateChemistMutation} = chemistApi;
export default chemistApi;
