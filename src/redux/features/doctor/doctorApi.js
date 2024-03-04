import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const doctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: (id) => ({
        url: `/api/v1/doctors/get_by_mio/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Doctor"],
      providesTags: ["Doctor"],
    }),
    getDoctorProfile: builder.query({
      query: (id) => ({
        url: `/api/v1/doctors/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Doctor"],
      providesTags: ["Doctor"],
    }),
    doctorCreateOrUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/doctors/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Doctor"],
      providesTags: ["Doctor"],
    }),
    doctorUpdatePut: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/doctors/${id}`,
        method: "PUT",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Doctor"],
      providesTags: ["Doctor"],
    }),
    verifyDoctor: builder.mutation({
      query: ({data }) => ({
        url: `/api/v1/doctors`,
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Doctor"],
      providesTags: ["Doctor"],
    }),
    // userLogin: builder.mutation({
    //   query: (data) => ({
    //     url: '/api/v1/mio/sign-in',
    //     method: 'POST',
    //     body: data,
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled;

    //       dispatch(
    //         userLoggedIn({
    //           accessToken: result.data.data.access_token,
    //           user: result.data.user,
    //         })
    //       );
    //     } catch (err) {
    //       // do nothing
    //     }
    //   },
    //   invalidatesTags: ['User'],
    // }),
  }),
  overrideExisting: true,
});

export const {
  useGetDoctorsQuery,
  useGetDoctorProfileQuery,
  useDoctorCreateOrUpdateMutation,
  useDoctorUpdatePutMutation,
  useVerifyDoctorMutation
} = doctorApi;
export default doctorApi;
