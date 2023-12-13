import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const companyXServiceApi = createApi({
  reducerPath: "companyXServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44338/api/v1/",
  }),
  tagTypes: ["CompanyXServices"],
  endpoints: (builder) => ({
    getCompanyXServices: builder.query({
      query: () => ({
        url: "CompanyXServiceAPI/GetCompanyXServices",
      }),
      providesTags: ["CompanyXServices"],
    }),

    GetCompanyXServiceByCompanyId: builder.query({
      query: (firstCategoryId) => ({
        url: `CompanyXServiceAPI/GetCompanyXServiceByCompanyId/${firstCategoryId}`,
      }),
      providesTags: ["CompanyXServices"],
    }),
   
   

    getCompanyXServiceById: builder.query({
      query: (id) => ({
        url: `CompanyXServiceAPI/GetCompanyXService/${id}`,
      }),
      providesTags: ["CompanyXServices"],
    }),

    createCompanyXService: builder.mutation({
      query: (data) => ({
        url: "CompanyXServiceAPI/CreateCompanyXService",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CompanyXServices"],
    }),

    updateCompanyXService: builder.mutation({
      query: ({ data, id }) => ({
        url: "CompanyXServiceAPI/UpdateCompanyXService/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CompanyXServices"],
    }),
    
    deleteCompanyXService: builder.mutation({
      query: (id) => ({
        url: "CompanyXServiceAPI/DeleteCompanyXService/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["CompanyXServices"],
    }),
  }),
});

export const {
  useGetCompanyXServicesQuery,
  useGetCompanyXServiceByIdQuery,
  useGetCompanyXServiceByCompanyIdQuery,
  useCreateCompanyXServiceMutation,
  useUpdateCompanyXServiceMutation,
  useDeleteCompanyXServiceMutation,
} = companyXServiceApi;
export default companyXServiceApi;
