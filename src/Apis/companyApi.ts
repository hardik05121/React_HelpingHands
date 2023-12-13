import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44338/api/v1/",
  }),
  tagTypes: ["Companys"],
  endpoints: (builder) => ({
    getCompanys: builder.query({
      query: ({search, pageSize, pageNumber}) => ({
        url: `CompanyAPI/GetCompanys/?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
      }),
      providesTags: ["Companys"],
    }),

    getCompanySearchByLazyLoading: builder.query({
      query: ({ pageNum, search }) => ({
        url: "CompanyAPI/CompanySearchByLazyLoading",
        method: "Get",
        params: { pageNum, search },
      }),
      providesTags: ["Companys"],
    }),

    getCompanyById: builder.query({
      query: (id) => ({
        url: `CompanyAPI/GetCompany/${id}`,
      }),
      providesTags: ["Companys"],
    }),

    createCompany: builder.mutation({
      query: (data) => ({
        url: "CompanyAPI/CreateCompany",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Companys"],
    }),

    updateCompany: builder.mutation({
      query: ({ data, id }) => ({
        url: "CompanyAPI/UpdateCompany/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Companys"],
    }),

    deleteCompany: builder.mutation({
      query: (id) => ({
        url: "CompanyAPI/DeleteCompany/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Companys"],
    }),
  }),
});

export const {
  useGetCompanysQuery,
  useGetCompanyByIdQuery,
  useGetCompanySearchByLazyLoadingQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
export default companyApi;
