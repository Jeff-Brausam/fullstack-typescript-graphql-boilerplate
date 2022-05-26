import { graphql } from "msw";
import { User } from "../views/AdminDashboard/types";

interface GetUsersResponse {
  Users: User[];
}

interface CreateNewUserVariables {
  name: string;
}
interface CreateNewUserResponse {
  createUser: User;
}
interface EditUserVariables {
  name: string;
  userId: string;
}
interface EditUserResponse {
  editUser: User;
}

export const handlers = [
  // Get All Users Query
  graphql.query<GetUsersResponse>("GetUsers", (req, res, ctx) => {
    return res(
      ctx.data({
        Users: [
          {
            __typename: "User",
            name: "John Schmidt",
            avatarUrl: "http://localhost:3000/static/john-schmidt.jpeg",
            createdAt: "2022-05-24T19:23:24.920Z",
            updatedAt: "2022-05-24T20:53:00.255Z",
            id: "user-1e45618d-4690-400e-b765-e1619e9c55de",
          },
          {
            __typename: "User",
            name: "Chevy Chase",
            avatarUrl: "http://localhost:3000/static/chevy-chase.png",
            createdAt: "2022-05-24T19:23:24.920Z",
            updatedAt: "2022-05-24T20:53:00.255Z",
            id: "user-d3b10b7d-f57e-4073-a887-85b775cd8ee3",
          },
          {
            __typename: "User",
            name: "Carly Manhattan",
            avatarUrl: "http://localhost:3000/static/carlymanhattan.png",
            createdAt: "2022-05-24T19:23:24.921Z",
            updatedAt: "2022-05-24T20:53:00.255Z",
            id: "user-0ef70aa2-3f33-4198-95ac-b807813a7070",
          },
          {
            __typename: "User",
            name: "Sara Berginni",
            avatarUrl: "http://localhost:3000/static/sara-berginni.png",
            createdAt: "2022-05-24T19:23:24.921Z",
            updatedAt: "2022-05-24T20:53:00.255Z",
            id: "user-0ef70aa2-3f33-4198-95ac-b807813a7071",
          },
          {
            __typename: "User",
            name: "Zoe Geralds",
            avatarUrl: "http://localhost:3000/static/1zoe.jpeg",
            createdAt: "2022-05-24T19:23:24.922Z",
            updatedAt: "2022-05-24T20:53:00.255Z",
            id: "user-e0724e83-8ccd-4bd6-86cf-d78ca45e059e",
          },
        ],
      })
    );
  }),
  // Create New User Mutation
  graphql.mutation<CreateNewUserResponse, CreateNewUserVariables>(
    "CreateNewUser",
    (req, res, ctx) => {
      const { name } = req.variables;
      return res(
        ctx.data({
          createUser: {
            __typename: "User",
            name: name,
            avatarUrl: `http://localhost:3000/static/mockuser.jpeg`,
            createdAt: "2022-05-24T19:23:24.922Z",
            updatedAt: "2022-05-24T20:53:00.255Z",
            id: "user-e074e83-8ccd-4bd6-86cf-d78c2185e059e",
          },
        })
      );
    }
  ),
  graphql.mutation<EditUserResponse, EditUserVariables>(
    "EditUser",
    (req, res, ctx) => {
      const { userId, name } = req.variables;

      if (userId === "non-existing") {
        return res(
          ctx.errors([
            {
              message: "User not found",
              extensions: {
                id: "user-e0724e83-8ccd-4bd6-86cf-d78cdss3f9e",
              },
            },
          ])
        );
      }

      return res(
        ctx.data({
          editUser: {
            __typename: "User",
            name,
            avatarUrl: `http://localhost:3000/static/mockuser.jpeg`,
            createdAt: "2022-05-24T19:23:24.922Z",
            updatedAt: "2022-05-24T20:53:00.255Z",
            id: userId,
          },
        })
      );
    }
  ),
  graphql.mutation("DeleteUser", (req, res, ctx) => {
    const { userId } = req.variables;

    return res(
      ctx.data({
        deleteUser: {
          __typename: "User",
          id: userId,
        },
      })
    );
  }),
];
