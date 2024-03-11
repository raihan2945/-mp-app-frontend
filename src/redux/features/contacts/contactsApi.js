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
        url: `/api/v1/contacts/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Contacts"],
    }),
    createContact: builder.mutation({
      query: (data) => {
        return {
          url: `/api/v1/contacts`,
          method: "POST",
          body: data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },

      invalidatesTags: ["Contacts"],
      providesTags: ["Contacts"],
    }),
    updateContact: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/v1/contacts/${id}`,
          method: "PUT",
          body: data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },

      invalidatesTags: ["Contacts"],
      providesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation({
      query: (id) => {
        return {
          url: `/api/v1/contacts/${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Contacts"],
      providesTags: ["Contacts"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllContactsQuery,
  useGetAllTagsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useGetContactDetailsQuery,
  useDeleteContactMutation,
} = contactsApi;
export default contactsApi;
