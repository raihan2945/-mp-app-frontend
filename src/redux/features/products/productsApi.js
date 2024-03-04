import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: (search) => {
        const url = search
          ? `/api/v1/products/brands?search=${search}`
          : `/api/v1/products/brands`;

        return {
          url: url,
          method: "GET",
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
  overrideExisting: true,
});

export const {useGetAllBrandsQuery} = productsApi;
export default productsApi;
