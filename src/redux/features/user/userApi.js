import apiSlice from "../api";
import { setUser } from "./userSlice";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (data) => ({
        url: "/api/v1/mio/profile",
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setUser({ user: result.data.data }));
        } catch (err) {
          // do nothing
        }
      },
      invalidatesTags: ["User"],
    }),
    getProfile: builder.query({
      query: (data) => ({
        url: "/api/v1/mio/profile",
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/v1/mio/${id}`,
          method: "PATCH",
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

export const { useGetUserQuery, useGetProfileQuery, useUpdateUserMutation } =
  userApi;
export default userApi;
