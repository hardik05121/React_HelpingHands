import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const secondCategoryApi = createApi({
  reducerPath: "secondCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44338/api/v1/",
  }),
  tagTypes: ["SecondCategorys"],
  endpoints: (builder) => ({
    getSecondCategorys: builder.query({
      query: () => ({
        url: "SecondCategoryAPI/GetSecondCategorys",
      }),
      providesTags: ["SecondCategorys"],
    }),

    getSecondCategoryById: builder.query({
      query: (id) => ({
        url: `SecondCategoryAPI/GetSecondCategory/${id}`,
      }),
      providesTags: ["SecondCategorys"],
    }),

    createSecondCategory: builder.mutation({
      query: (data) => ({
        url: "SecondCategoryAPI/CreateSecondCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SecondCategorys"],
    }),

    updateSecondCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: "SecondCategoryAPI/UpdateSecondCategory/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SecondCategorys"],
    }),
    
    deleteSecondCategory: builder.mutation({
      query: (id) => ({
        url: "SecondCategoryAPI/DeleteSecondCategory/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["SecondCategorys"],
    }),
  }),
});

export const {
  useGetSecondCategorysQuery,
  useGetSecondCategoryByIdQuery,
  useCreateSecondCategoryMutation,
  useUpdateSecondCategoryMutation,
  useDeleteSecondCategoryMutation,
} = secondCategoryApi;
export default secondCategoryApi;
