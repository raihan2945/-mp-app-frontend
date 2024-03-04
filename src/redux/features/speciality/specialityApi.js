import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const specialityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSpecialty: builder.query({
      query: (searchKey) => {
        const url = searchKey
          ? `/api/v1/speciality?search=${searchKey}`
          : `/api/v1/speciality`;
        return {
          url: url,
          method: "GET",
        };
      },
      invalidatesTags: ["Specialty"],
    }),

    getAllSpecialtyByDoctor: builder.query({
      query: (id) => ({
        url: `/api/v1/speciality/doctor/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Specialty"],
    }),

    getAllSubSpeciality: builder.query({
      query: (searchKey) => {
        const url = searchKey
          ? `/api/v1/sub_speciality?search=${searchKey}`
          : `/api/v1/sub_speciality`;
        return {
          url: url,
          method: "GET",
        };
      },
      invalidatesTags: ["Speciality"],
    }),

    getAllSubSpecialityByDoctor: builder.query({
      query: (id) => ({
        url: `/api/v1/sub_speciality/doctor/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Specialty"],
    }),

    getAllServices: builder.query({
      query: (searchKey) => {
        const url = searchKey
          ? `/api/v1/services?search=${searchKey}`
          : `/api/v1/services`;
        return {
          url: url,
          method: "GET",
        };
      },
      invalidatesTags: ["Speciality"],
    }),

    getAllServicesByDoctor: builder.query({
      query: (id) => ({
        url: `/api/v1/services/doctor/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Specialty"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllSpecialtyQuery,
  useGetAllSpecialtyByDoctorQuery,
  useGetAllSubSpecialityQuery,
  useGetAllSubSpecialityByDoctorQuery,
  useGetAllServicesQuery,
  useGetAllServicesByDoctorQuery,
} = specialityApi;
export default specialityApi;
