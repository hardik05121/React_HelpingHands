import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const companyXAmenityApi = createApi({
  reducerPath: "companyXAmenityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44338/api/v1/",
  }),
  tagTypes: ["CompanyXAmenitys"],
  endpoints: (builder) => ({
    getCompanyXAmenitys: builder.query({
      query: () => ({
        url: "CompanyXAmenityAPI/GetCompanyXAmenitys",
      }),
      providesTags: ["CompanyXAmenitys"],
    }),

    GetCompanyXAmenityByCompanyId: builder.query({
      query: (companyId) => ({
        url: `CompanyXAmenityAPI/GetCompanyXAmenityByCompanyId/${companyId}`,
      }),
      providesTags: ["CompanyXAmenitys"],
    }),
    
    getCompanyXAmenityById: builder.query({
      query: (id) => ({
        url: `CompanyXAmenityAPI/GetCompanyXAmenity/${id}`,
      }),
      providesTags: ["CompanyXAmenitys"],
    }),

    createCompanyXAmenity: builder.mutation({
      query: (data) => ({
        url: "CompanyXAmenityAPI/CreateCompanyXAmenity",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CompanyXAmenitys"],
    }),
    
    deleteCompanyXAmenity: builder.mutation({
      query: (id) => ({
        url: "CompanyXAmenityAPI/DeleteCompanyXAmenity/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["CompanyXAmenitys"],
    }),
  }),
});

export const {
  useGetCompanyXAmenitysQuery,
  useGetCompanyXAmenityByIdQuery,
  useGetCompanyXAmenityByCompanyIdQuery,
  useCreateCompanyXAmenityMutation,
  useDeleteCompanyXAmenityMutation,
} = companyXAmenityApi;
export default companyXAmenityApi;
