import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const thirdCategoryApi = createApi({
  reducerPath: "thirdCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44338/api/v1/",
  }),
  tagTypes: ["ThirdCategorys"],
  endpoints: (builder) => ({
    getThirdCategorys: builder.query({
      query: () => ({
        url: "ThirdCategoryAPI/GetThirdCategorys",
      }),
      providesTags: ["ThirdCategorys"],
    }),

    getThirdCategoryById: builder.query({
      query: (id) => ({
        url: `ThirdCategoryAPI/GetThirdCategory/${id}`,
      }),
      providesTags: ["ThirdCategorys"],
    }),

    createThirdCategory: builder.mutation({
      query: (data) => ({
        url: "ThirdCategoryAPI/CreateThirdCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ThirdCategorys"],
    }),

    updateThirdCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: "ThirdCategoryAPI/UpdateThirdCategory/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ThirdCategorys"],
    }),
    
    deleteThirdCategory: builder.mutation({
      query: (id) => ({
        url: "ThirdCategoryAPI/DeleteThirdCategory/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["ThirdCategorys"],
    }),
  }),
});

export const {
  useGetThirdCategorysQuery,
  useGetThirdCategoryByIdQuery,
  useCreateThirdCategoryMutation,
  useUpdateThirdCategoryMutation,
  useDeleteThirdCategoryMutation,
} = thirdCategoryApi;
export default thirdCategoryApi;
