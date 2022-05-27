import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const placeholderImgStad = "./src/images/placeholder_city.webp";
const placeholderImgMon = "./src/images/monument_placeholder.webp";
const placeholderFlag = "./src/images/unknown_flag.jpg";

const api = createApi({
  reducerPath: "landenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8000/api",
  }),
  tagTypes: ["LANDEN", "STEDEN", "MONUMENTEN", "TALEN"],
  endpoints: (builder) => ({
    //Get alle landen
    getAllLanden: builder.query({
      query: () => `/countries.json`,
      providesTags: ["LANDEN"],
    }),
    //Get alle talen
    getAllLanguages: builder.query({
      query: () => `/languages.json`,
      providesTags: ["TALEN"],
    }),
    //Get 1 land
    getOneLand: builder.query({
      query: (id) => `/countries/${id}.jsonld`,
      providesTags: ["LANDEN", "TALEN"],
    }),

    //Get 1 stad
    getOneStad: builder.query({
      query: (id) => ({ url: `/cities/${id}.json` }),
      providesTags: ["STEDEN"],
    }),
    //Get 1 monument
    getOneMonument: builder.query({
      query: (id) => ({ url: `/monuments/${id}.json` }),
      providesTags: ["MONUMENTEN"],
    }),
    //Post een land
    addOneLand: builder.mutation({
      query: (name) => ({
        url: `/countries.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: { name, flag: placeholderFlag, languages: [] },
      }),
      invalidatesTags: ["LANDEN"],
    }),
    //Post een taal
    addOneLanguage: builder.mutation({
      query: (name) => ({
        url: `/languages.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["LANDEN", "TALEN"],
    }),
    //Post een stad
    addOneStad: builder.mutation({
      query: ({ countryId, name }) => ({
        url: `/cities.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: {
          country: `/api/countries/${countryId}`,
          name,
          latidude: "0",
          longitude: "0",
          img: placeholderImgStad,
        },
      }),
      invalidatesTags: ["STEDEN", "LANDEN"],
    }),
    //Post een monument
    addOneMonument: builder.mutation({
      query: ({ cityId, name }) => ({
        url: `/monuments.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: { city: `/api/cities/${cityId}`, name, img: placeholderImgMon },
      }),
      invalidatesTags: ["STEDEN", "MONUMENTEN"],
    }),

    //Delete een land
    removeOneLand: builder.mutation({
      query: (id) => ({
        url: `/countries/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["LANDEN"],
    }),
    //DELETE een taal
    removeOneLanguage: builder.mutation({
      query: (id) => ({
        url: `/languages/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["LANDEN", "TALEN"],
    }),
    //Delete een stad
    removeOneCity: builder.mutation({
      query: (id) => ({
        url: `/cities/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["STEDEN", "LANDEN"],
    }),
    //Delete een monument
    removeOneMonument: builder.mutation({
      query: (id) => ({
        url: `/monuments/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["MONUMENTEN", "STEDEN"],
    }),
    //Wijzig een land
    updateOneLand: builder.mutation({
      query: ({ id, name = "test", flag = "test" }) => ({
        url: `/countries/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, name, flag },
      }),
      invalidatesTags: ["LANDEN"],
    }),
    //Voeg taal toe aan land
    changeLanguagesCity: builder.mutation({
      query: ({ id, languages }) => (
        console.log(languages),
        {
          url: `/countries/${id}.json`,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          method: "PUT",
          body: { languages },
        }
      ),
      invalidatesTags: ["LANDEN", "TALEN"],
    }),
    //Wijzig een stad
    updateOneCity: builder.mutation({
      query: ({
        id,
        name = "",
        latidude = 0,
        longitude = 0,
        img = placeholderImg,
      }) => ({
        url: `/cities/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, name, latidude, longitude, img },
      }),
      invalidatesTags: ["STEDEN"],
    }),
    //Wijzig een monument
    updateOneMonument: builder.mutation({
      query: ({ id, name = "", description = "", img }) => ({
        url: `/monuments/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, name: name, description, img },
      }),
      invalidatesTags: ["MONUMENTEN"],
    }),
  }),
});

export default api;
export const {
  useGetAllLandenQuery,
  useGetOneLandQuery,
  useGetStedenLandQuery,
  useGetOneStadQuery,
  useGetOneMonumentQuery,
  useGetAllLanguagesQuery,
  useAddOneLandMutation,
  useAddOneStadMutation,
  useAddOneMonumentMutation,
  useAddOneLanguageMutation,
  useRemoveOneLandMutation,
  useRemoveOneLanguageMutation,
  useRemoveOneCityMutation,
  useRemoveOneMonumentMutation,
  useUpdateOneLandMutation,
  useUpdateOneCityMutation,
  useUpdateOneMonumentMutation,
  useChangeLanguagesCityMutation,
} = api;
