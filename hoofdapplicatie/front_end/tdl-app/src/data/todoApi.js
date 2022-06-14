import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wdev2.be/fs_anthonym/eindwerk/api",
  }),
  tagTypes: ["TODOLIST","APPOINTMENTLIST","CONTACTLIST"],
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
      //Get alle categorieen
      getAllCategories: builder.query({
        query: () => ({url: `/categories.json?pagination=false`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        }
      })
      }),
      //Get alle prioriteiten
      getAllPriorities: builder.query({
        query: () => ({url: `/priorities.json?pagination=false`, 
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        }
      }),
      }),
      //Get alle user informatie
      getAllUserInfo: builder.query({
        query: (id) => `/users/${id}.json?pagination=false`,
      }),
      //Get alle user informatie
      getContactInfo: builder.query({
        query: (id) => `/contacts/${id}`,
      }),
      //Get alle contacts asc
      getAllUserContacts: builder.query({
        query: (id) => ({url: `/contacts?pagination=false&cntUser=${id}&order%5BcntName%5D=asc`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        }
      }),
      providesTags: ['CONTACTLIST'],
    }),
      //Get alle contacts van een user order by asc, set title index
      getAllUserContactsIndexed: builder.query({
        query: (id) => ({url: `/contacts.json?pagination=false&cntUser=${id}&order%5BcntName%5D=asc`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        }
      }),
      transformResponse(response){
        let capital = "";
        const indexing = response.map(contact => {
            if("cntName" in contact && contact.cntName.length > 0){
        const index = contact.cntName[0].toString().toUpperCase();
        if(capital[0]?.toString().toUpperCase() !== index)
        {
            capital = index;
            return {...contact, index}
        }
        return {...contact, index: ""};
        }
        return {...contact}
        })
        return indexing
      },
      providesTags: ['CONTACTLIST'],
    }),
      //Get alle todos van een user
      getAllUserTodos: builder.query({
        query: (id) => ({url: `/todos.json?page=1&pagination=false&tdoUsr=${id}`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        }
      }),
      providesTags: (result, error, arg) =>
      result
        ? [...result.map(({ id }) => ({ type: 'TODOLIST', id })), 'TODOLIST']
        : ['TODOLIST'],
      }),
      //Get alle appointments van een user
      getAllUserAppointments: builder.query({
        query: (id) => ({url: `/appointments?tdoUsr=${id}.json?pagination=false`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        }
      }),
      providesTags: (result, error, arg) =>
      result
        ? [...result.map(({ id }) => ({ type: 'APPOINTMENTLIST', id })), 'APPOINTMENTLIST']
        : ['APPOINTMENTLIST'],
      }),
      //Register user
      registerUser: builder.mutation({
        query: ({username, password, email, hasAgreed}) => ({
          url: `/users.json`,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          method: "POST",
          body: {
            username,
            password,
            usrMail: email,
            usrHasAgreed: hasAgreed
          },
        }),
      }),
      //Post een todo
    addOnetodo: builder.mutation({
      query: ({id, title}) => ({
        url: `/todos.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: {
          tdoTitle: title,
          tdoIsDone: false,
          tdoUsr: id,
          tdoPty: 1,
          tdoCty:1
        },
      }),
      invalidatesTags: ["TODOLIST"],
    }),
      //Post een contact
      addOneContact: builder.mutation({
        query: ({userId, name}) => ({
          url: `/contacts.json`,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          method: "POST",
          body: {
            cntUser: userId,
            cntName: name
          },
        }),
        invalidatesTags: ['CONTACTLIST'],
      }),
      //Post een appointment
      addOneAppointment: builder.mutation({
        query: ({id, title, startsAt, stopsAt}) => ({
          url: `/appointments.json`,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          method: "POST",
          body: {
            apmTitle: title,
            apmDescription: "description",
            apmStartsAt: startsAt,
            apmStopsAt: stopsAt,
            apmUsr: id
          },
        }),
        invalidatesTags: ["APPOINTMENTLIST"],
      }),
        //Wijzig isChecked van een todo
        updateIsCheckedTodo: builder.mutation({
          query: ({ id, tdoChecked}) => ({
            url: `/todos/${id}.json`,
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            method: "PUT",
            body: { id, tdoIsDone: tdoChecked},
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'TODOLIST', id: arg.id }],
        }),
        //Wijzig de titel van een todo
        updateTitleTodo: builder.mutation({
          query: ({ id, todoTitle}) => ({
            url: `/todos/${id}.json`,
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            method: "PUT",
            body: { id, tdoTitle: todoTitle},
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'TODOLIST', id: arg.id }],
        }),
        //Wijzig de category van een todo
        updateCategoryTodo: builder.mutation({
          query: ({ id, catId}) => ({
            url: `/todos/${id}.json`,
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            method: "PUT",
            body: { id, tdoCty: catId},
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'TODOLIST', id: arg.id }],
        }),
        //Wijzig de prioriteit van een todo
        updatePriorityTodo: builder.mutation({
          query: ({ id, ptyId}) => ({
            url: `/todos/${id}.json`,
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            method: "PUT",
            body: { id, tdoPty: ptyId},
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'TODOLIST', id: arg.id }],
        }),
        //Wijzig een appointment (PUT)
        updateAppointment: builder.mutation({
          query: ({ appId, appTitle, appStartsAt, appStopsAt, userId,appDescription, contactId, }) => ({
            url: `/appointments/${appId}.json`,
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            method: "PUT",
            body: {
              apmTitle: appTitle,
              apmStartsAt: appStartsAt,
              apmStopsAt: appStopsAt,
              apmUsr: userId,
              apmDescription: appDescription,
              apmCnt: contactId
            }, 
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'APPOINTMENTLIST', id: arg.id }],
        }),
        //Wijzig een contact (PUT)
        updateOneContact: builder.mutation({
          query: ({ conid, name, tel, street, postal,city,mail}) => ({
            url: `/contacts/${conid}.json`,
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            method: "PUT",
            body: {id: conid,cntName: name,cntTel: tel,cntStreet: street,cntPostal: postal,cntCity:city,cntMail: mail},
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'CONTACTLIST', id: arg.id }],
        }),
      //DELETE een todo
    removeOneTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'TODOLIST', id: arg.id }],
    }),
    //DELETE een contact
    removeOneContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["CONTACTLIST"],
    }),
      //DELETE een appointment
    removeOneAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointments/${id}.json`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["APPOINTMENTLIST"],
    }),
  })
});

export default api;
export const {
useGetAppointmentContactQuery,
useGetContactInfoQuery,
useGetAllCategoriesQuery,
useGetAllPrioritiesQuery,
useGetAllUserInfoQuery,
useGetAllUserTodosQuery,
useGetAllUserAppointmentsQuery,
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
useGetAllUserContactsQuery,
useUpdateTitleTodoMutation,
useUpdateOneContactMutation,
useRemoveOneTodoMutation,
useRemoveOneAppointmentMutation,
useRemoveOneContactMutation,
useAddOneContactMutation
} = api;
