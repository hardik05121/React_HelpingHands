import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const firstCategoryApi = createApi({
  reducerPath: "firstCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44338/api/v1/",
  }),
  tagTypes: ["FirstCategorys"],
  endpoints: (builder) => ({
    getFirstCategorys: builder.query({
      query: () => ({
        url: "FirstCategoryAPI/GetFirstCategorys",
      }),
      providesTags: ["FirstCategorys"],
    }),

    getFirstCategoryById: builder.query({
      query: (id) => ({
        url: `FirstCategoryAPI/GetFirstCategory/${id}`,
      }),
      providesTags: ["FirstCategorys"],
    }),

    createFirstCategory: builder.mutation({
      query: (data) => ({
        url: "FirstCategoryAPI/CreateFirstCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FirstCategorys"],
    }),

    updateFirstCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: "FirstCategoryAPI/UpdateFirstCategory/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FirstCategorys"],
    }),
    
    deleteFirstCategory: builder.mutation({
      query: (id) => ({
        url: "FirstCategoryAPI/DeleteFirstCategory/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["FirstCategorys"],
    }),
  }),
});

export const {
  useGetFirstCategorysQuery,
  useGetFirstCategoryByIdQuery,
  useCreateFirstCategoryMutation,
  useUpdateFirstCategoryMutation,
  useDeleteFirstCategoryMutation,
} = firstCategoryApi;
export default firstCategoryApi;
