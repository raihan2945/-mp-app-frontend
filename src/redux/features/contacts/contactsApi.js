import apiSlice from "../api";
import { store } from "../../store";

const token = store.getState()?.auth?.accessToken;

const contactsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: (searchItems) => {
        let url = `/api/v1/contacts`;

        searchItems.map((v, index) => {
          if (index === 0) {
            const name = Object.keys(v)[0];
            url = url + `?${name}=${v[name]}`;
          } else {
            const name = Object.keys(v)[0];
            url = url + `&${name}=${v[name]}`;
          }
        });

        console.log("Url is : ", url)

        return {
          url: url,
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Contacts"],
    }),
    getAllTags: builder.query({
      query: (id) => {
        let url = `/api/v1/contacts/tags`;
        return {
          url: url,
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Contacts"],
    }),
    getContactDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/chemists/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chemist"],
    }),
    updateContact: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/api/v1/chemists`,
          method: "POST",
          body: data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },

      invalidatesTags: ["User"],
      providesTags: ["User"],
    }),
    deleteContact: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/api/v1/chemists`,
          method: "POST",
          body: data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },

      invalidatesTags: ["User"],
      providesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllContactsQuery, useGetAllTagsQuery } = contactsApi;
export default contactsApi;
