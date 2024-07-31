import apiSlice from "../api";

export const letterBoxApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLetters: builder.query({
      query: ({ page, limit, search, start, end }) =>
        `api/v1/letter-box?page=${page ? page : 1}&limit=${
          limit ? limit : 10
        }${search ? "&search=" + search : ""}${
          start ? "&start=" + start : ""
        } ${end ? "&end=" + end : ""}`,
      providesTags: ["Letter"],
    }),
    getAllLetter: builder.query({
      query: ({ start, end }) =>
        `api/v1/letter-box${
          start ? "?start=" + start : ""
        } ${end ? "&end=" + end : ""}`,
      providesTags: ["Letter"],
    }),
    createLetter: builder.mutation({
      query: (data) => ({
        url: "api/v1/letter-box",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Letter"],
    }),
    updateLetter: builder.mutation({
      query: ({ id, data }) => ({
        url: "api/v1/letter-box/" + id,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Letter"],
    }),
    deleteLetter: builder.mutation({
      query: (id) => ({
        url: "api/v1/letter-box/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Letter"],
    }),
  }),
});

export const {
  useGetLettersQuery,
  useCreateLetterMutation,
  useDeleteLetterMutation,
  useUpdateLetterMutation,
  useGetAllLetterQuery
} = letterBoxApi;
