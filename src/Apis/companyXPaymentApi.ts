import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const companyXPaymentApi = createApi({
  reducerPath: "companyXPaymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44338/api/v1/",
  }),
  tagTypes: ["CompanyXPayments"],
  endpoints: (builder) => ({
    getCompanyXPayments: builder.query({
      query: () => ({
        url: "CompanyXPaymentAPI/GetCompanyXPayments",
      }),
      providesTags: ["CompanyXPayments"],
    }),

    GetCompanyXPaymentByCompanyId: builder.query({
      query: (companyId) => ({
        url: `CompanyXPaymentAPI/GetCompanyXPaymentByCompanyId/${companyId}`,
      }),
      providesTags: ["CompanyXPayments"],
    }),
   
    getCompanyXPaymentById: builder.query({
      query: (id) => ({
        url: `CompanyXPaymentAPI/GetCompanyXPayment/${id}`,
      }),
      providesTags: ["CompanyXPayments"],
    }),
  
    createCompanyXPayment: builder.mutation({
      query: (data) => ({
        url: "CompanyXPaymentAPI/CreateCompanyXPayment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CompanyXPayments"],
    }),
  
    deleteCompanyXPayment: builder.mutation({
      query: (id) => ({
        url: "CompanyXPaymentAPI/DeleteCompanyXPayment/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["CompanyXPayments"],
    }),
  }),
});

export const {
  useGetCompanyXPaymentsQuery,
  useGetCompanyXPaymentByIdQuery,
  useGetCompanyXPaymentByCompanyIdQuery,
  useCreateCompanyXPaymentMutation,
  useDeleteCompanyXPaymentMutation,
} = companyXPaymentApi;
export default companyXPaymentApi;
