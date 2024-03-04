import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const locationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: (search) => ({
        url: `/api/v1/locations/countries?search=${search}`,
        method: "GET",
      }),
      invalidatesTags: ["Location"],
    }),
    getDivisons: builder.query({
      query: (id) => ({
        url: `/api/v1/locations/divisions`,
        method: "GET",
      }),
      invalidatesTags: ["Location"],
    }),
    getDistricts: builder.query({
      query: (id) => ({
        url: `/api/v1/locations/districts/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Location"],
    }),
    getUpazilas: builder.query({
      query: (id) => ({
        url: `/api/v1/locations/upazilas/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Location"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDivisonsQuery,
  useGetCountriesQuery,
  useGetDistrictsQuery,
  useGetUpazilasQuery,
} = locationApi;
export default locationApi;
