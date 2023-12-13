import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const applicationRoleApi = createApi({
  reducerPath: "applicationRoleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44338/api/v1/",
  }),
  tagTypes: ["ApplicationRoles"],
  endpoints: (builder) => ({
    getApplicationRoles: builder.query({
      query: () => ({
        url: "ApplicationRoleApi/GetApplicationRoles",
      }),
      providesTags: ["ApplicationRoles"],
    }),

    GetCompanyXAmenityByCompanyId: builder.query({
      query: (companyId) => ({
        url: `CompanyXAmenityAPI/GetCompanyXAmenityByCompanyId/${companyId}`,
      }),
      providesTags: ["ApplicationRoles"],
    }),
    

    

    getApplicationRoleById: builder.query({
      query: (id) => ({
        url: `ApplicationRoleApi/GetApplicationRole/${id}`,
      }),
      providesTags: ["ApplicationRoles"],
    }),

    createApplicationRole: builder.mutation({
      query: (data) => ({
        url: "ApplicationRoleApi/CreateApplicationRole",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ApplicationRoles"],
    }),

    updateApplicationRole: builder.mutation({
      query: ({ data, id }) => ({
        url: "ApplicationRoleApi/UpdateApplicationRole/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ApplicationRoles"],
    }),
    
    deleteApplicationRole: builder.mutation({
      query: (id) => ({
        url: "ApplicationRoleApi/DeleteApplicationRole/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["ApplicationRoles"],
    }),
  }),
});

export const {
  useGetApplicationRolesQuery,
  useGetApplicationRoleByIdQuery,
  useGetCompanyXAmenityByCompanyIdQuery,
  useCreateApplicationRoleMutation,
  useUpdateApplicationRoleMutation,
  useDeleteApplicationRoleMutation,
 
} = applicationRoleApi;
export default applicationRoleApi;
