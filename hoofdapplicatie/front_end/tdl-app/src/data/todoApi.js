import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wdev2.be/fs_anthonym/eindwerk/api",
  }),
  tagTypes: ["TODOLIST", "APPOINTMENTLIST", "CONTACTLIST", "PROFILEPICTURE"],
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    //Get alle categorieen
    getAllCategories: builder.query({
      query: (token) => ({
        url: `/categories?pagination=false&ctyIsclassavailable=true`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    //Get alle prioriteiten
    getAllPriorities: builder.query({
      query: (token) => ({
        url: `/priorities.json?pagination=false`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/jsonld",
          accept: "application/json",
        },
      }),
    }),
    //Get alle user informatie
    getAllUserInfo: builder.query({
      query: ({ id, token }) => ({
        url: `/users/${id}.json?pagination=false`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    //Get profile picture
    getProfilePic: builder.query({
      query: ({ id, token }) => ({
        url: `/users/${id}.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["PROFILEPICTURE"],
    }),
    //Get alle contact  informatie
    getContactInfo: builder.query({
      query: ({ id, token }) => ({
        url: `/contacts/${id}`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["CONTACTLIST"],
    }),
    /*
    //Get alle contacts asc
    getAllTheUserContacts: builder.query({
      query: ({ id, token }) => ({
        url: `/contacts?pagination=false&cntUsr=${id}&order%5BcntName%5D=asc`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "CONTACTLIST", id })),
                "CONTACTLIST",
              ]
            : ["CONTACTLIST"],
      }),
    }),*/
    //Get alle contacts van een user order by asc, set title index
    getAllUserContactsIndexed: builder.query({
      query: ({ id, token }) => (
        console.log(id),
        {
          url: `/contacts.json?pagination=false&cntUsr=${id}&order%5BcntName%5D=asc`,
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      ),
      transformResponse(response) {
        let capital = "";
        const indexing = response.map((contact) => {
          if ("cntName" in contact && contact.cntName.length > 0) {
            const index = contact.cntName[0].toString().toUpperCase();
            if (capital[0]?.toString().toUpperCase() !== index) {
              capital = index;
              return { ...contact, index };
            }
            return { ...contact, index: "" };
          }
          return { ...contact };
        });
        return indexing;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "CONTACTLIST", id })),
              "CONTACTLIST",
            ]
          : ["CONTACTLIST"],
    }),
    //Get alle todos van een user
    getAllUserTodos: builder.query({
      query: ({ id, token }) => (
        console.log(id),
        {
          url: `/todos?page=1&pagination=false&tdoUsr=${id}`,
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      ),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "TODOLIST", id })), "TODOLIST"]
          : ["TODOLIST"],
    }),
    //Get alle appointments van een user
    getAllUserAppointments: builder.query({
      query: ({ id, token }) => ({
        url: `http://localhost:8001/api/appointments?page=1&pagination=false&apmUsr=${id}&order%5BapmStartsat%5D=asc`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "APPOINTMENTLIST", id })),
              "APPOINTMENTLIST",
            ]
          : ["APPOINTMENTLIST"],
    }),
    //Register user
    registerUser: builder.mutation({
      query: ({ username, password, email, hasAgreed }) => (
        console.log(hasAgreed),
        {
          url: `/users.json`,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          method: "POST",
          body: {
            usrName: username,
            usrPassword: password,
            usrMail: email,
            usrHasagreed: hasAgreed,
          },
        }
      ),
    }),
    //Post een todo
    addOnetodo: builder.mutation({
      query: ({ id, title, token }) => ({
        url: `/todos.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: {
          tdoTitle: title,
          tdoIsdone: false,
          tdoUsr: id,
          tdoPty: 1,
          tdoCty: 1,
        },
      }),
      invalidatesTags: ["TODOLIST"],
    }),
    //Post een contact
    addOneContact: builder.mutation({
      query: ({ userId, name, token }) => ({
        url: `/contacts.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: {
          cntUsr: userId,
          cntName: name,
        },
      }),
      invalidatesTags: ["CONTACTLIST"],
    }),
    //Post een appointment
    addOneAppointment: builder.mutation({
      query: ({ id, title, startsAt, stopsAt, token }) => ({
        url: `/appointments.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: {
          apmTitle: title,
          apmDescription: "description",
          apmStartsat: startsAt,
          apmStopsat: stopsAt,
          apmUsr: id,
        },
      }),
      invalidatesTags: ["APPOINTMENTLIST"],
    }),
    //Wijzig isChecked van een todo
    updateIsCheckedTodo: builder.mutation({
      query: ({ id, tdoChecked, token }) => ({
        url: `/todos/${id}.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, tdoIsdone: tdoChecked },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TODOLIST", id: arg.id },
      ],
    }),
    //Wijzig de titel van een todo
    updateTitleTodo: builder.mutation({
      query: ({ id, todoTitle, token }) => ({
        url: `/todos/${id}.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, tdoTitle: todoTitle },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TODOLIST", id: arg.id },
      ],
    }),
    //Wijzig de username van een user
    changeUsername: builder.mutation({
      query: ({ id, name, token }) => (
        console.log(token),
        {
          url: `/users/${id}.json`,
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            accept: "application/json",
          },
          method: "PUT",
          body: { id, usrName: name },
        }
      ),
    }),
    //Wijzig de profile pic van een user
    changeUserPicture: builder.mutation({
      query: ({ id, picture, token }) => ({
        url: `/users/${id}.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, usrPicture: picture },
      }),
      invalidatesTags: ["PROFILEPICTURE"],
    }),
    //Wijzig de category van een todo
    updateCategoryTodo: builder.mutation({
      query: ({ id, catId, token }) => ({
        url: `/todos/${id}.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, tdoCty: catId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TODOLIST", id: arg.id },
      ],
    }),
    //Wijzig de prioriteit van een todo
    updatePriorityTodo: builder.mutation({
      query: ({ id, ptyId, token }) => ({
        url: `/todos/${id}.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: { id, tdoPty: ptyId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TODOLIST", id: arg.id },
      ],
    }),
    //Wijzig een appointment (PUT)
    updateAppointment: builder.mutation({
      query: ({
        appId,
        appTitle,
        appStartsAt,
        appStopsAt,
        userId,
        appDescription,
        contactId,
        token,
      }) => ({
        url: `/appointments/${appId}.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: {
          apmTitle: appTitle,
          apmStartsat: appStartsAt,
          apmStopsat: appStopsAt,
          apmUsr: userId,
          apmDescription: appDescription,
          apmCnt: contactId,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "APPOINTMENTLIST", id: arg.id },
      ],
    }),
    //Wijzig een contact (PUT)
    updateOneContact: builder.mutation({
      query: ({ conid, name, tel, street, postal, city, mail, token }) => ({
        url: `/contacts/${conid}.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: {
          id: conid,
          cntName: name,
          cntTel: tel,
          cntStreet: street,
          cntPostal: postal,
          cntCity: city,
          cntMail: mail,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CONTACTLIST", id: arg.id },
      ],
    }),
    //DELETE een todo
    removeOneTodo: builder.mutation({
      query: ({ id, token }) => ({
        url: `/todos/${id}.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TODOLIST", id: arg.id },
      ],
    }),

    //DELETE een contact
    removeOneContact: builder.mutation({
      query: ({ id, token }) => ({
        url: `/contacts/${id}.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CONTACTLIST", id: arg.id },
      ],
    }),
    //DELETE een user
    removeUserCompletely: builder.mutation({
      query: ({ userId, token }) => ({
        url: `/users/${userId}.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: { id: userId },
      }),
    }),
    //DELETE een appointment
    removeOneAppointment: builder.mutation({
      query: ({ id, token }) => ({
        url: `/appointments/${id}.json`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["APPOINTMENTLIST"],
    }),
  }),
});

export default api;
export const {
  useGetAppointmentContactQuery,
  useGetContactInfoQuery,
  useGetAllCategoriesQuery,
  useGetAllPrioritiesQuery,
  useGetAllUserInfoQuery,
  useGetProfilePicQuery,
  useGetAllUserTodosQuery,
  useGetAllUserAppointmentsQuery,
  useGetAllTheUserContactsQuery,
  useGetAllUserContactsIndexedQuery,
  useRegisterUserMutation,
  useUpdateCategoryTodoMutation,
  useAddOneContactAppointmentMutation,
  useUpdatePriorityTodoMutation,
  useAddOnetodoMutation,
  useChangeAppointmentContactMutation,
  useUpdateAppointmentMutation,
  useAddOneAppointmentMutation,
  useUpdateIsCheckedTodoMutation,
  useChangeUsernameMutation,
  useUpdateTitleTodoMutation,
  useChangeUserPictureMutation,
  useUpdateOneContactMutation,
  useRemoveOneTodoMutation,
  useRemoveOneAppointmentMutation,
  useRemoveOneContactMutation,
  useAddOneContactMutation,
  useRemoveUserCompletelyMutation,
} = api;
