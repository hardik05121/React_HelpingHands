import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44338/api/v1/",
  }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: "ServiceAPI/GetServices",
      }),
      providesTags: ["Services"],
    }),

    getServiceById: builder.query({
      query: (id) => ({
        url: `ServiceAPI/GetService/${id}`,
      }),
      providesTags: ["Services"],
    }),
    
    GetServiceByFirstCategoryId: builder.query({
      query: (firstCategoryId) => ({
        url: `ServiceAPI/GetServiceByFirstCategoryId/${firstCategoryId}`,
      }),
      providesTags: ["Services"],
    }),

    createService: builder.mutation({
      query: (data) => ({
        url: "ServiceAPI/CreateService",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),

    updateService: builder.mutation({
      query: ({ data, id }) => ({
        url: "ServiceAPI/UpdateService/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    
    deleteService: builder.mutation({
      query: (id) => ({
        url: "ServiceAPI/DeleteService/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetServiceByFirstCategoryIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
export default serviceApi;
