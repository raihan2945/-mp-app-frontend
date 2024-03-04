import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const instituteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstitutes: builder.query({
      query: (search) => {
        const url = search
          ? `/api/v1/institutes?search=${search}`
          : `/api/v1/institutes`;
        return {
          url: url,
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Institute"],
    }),
   
  
  }),
  overrideExisting: true,
});

export const {
  useGetInstitutesQuery
} = instituteApi;
export default instituteApi;
