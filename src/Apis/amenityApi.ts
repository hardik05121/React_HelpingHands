import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const amenityApi = createApi({
  reducerPath: "amenityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44338/api/v1/",
  }),
  tagTypes: ["Amenitys"],
  endpoints: (builder) => ({
    getAmenitys: builder.query({
      query: () => ({
        url: "AmenityAPI/GetAmenitys",
      }),
      providesTags: ["Amenitys"],
    }),

    getAmenityByFirstCategoryId: builder.query({
      query: (firstCategoryId) => ({
        url: `AmenityAPI/GetAmenityByFirstCategoryId/${firstCategoryId}`,
      }),
      providesTags: ["Amenitys"],
    }),

    getAmenityById: builder.query({
      query: (id) => ({
        url: `AmenityAPI/GetAmenity/${id}`,
      }),
      providesTags: ["Amenitys"],
    }),

    createAmenity: builder.mutation({
      query: (data) => ({
        url: "AmenityAPI/CreateAmenity",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Amenitys"],
    }),

    updateAmenity: builder.mutation({
      query: ({ data, id }) => ({
        url: "AmenityAPI/UpdateAmenity/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Amenitys"],
    }),
    
    deleteAmenity: builder.mutation({
      query: (id) => ({
        url: "AmenityAPI/DeleteAmenity/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Amenitys"],
    }),
  }),
});

export const {
  useGetAmenitysQuery,
  useGetAmenityByIdQuery,
  useGetAmenityByFirstCategoryIdQuery,
  useCreateAmenityMutation,
  useUpdateAmenityMutation,
  useDeleteAmenityMutation,
} = amenityApi;
export default amenityApi;
