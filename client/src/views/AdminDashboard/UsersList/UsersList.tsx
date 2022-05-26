import React from "react";
import { gql } from "@apollo/client";
import { useGetUsersQuery } from "../../../generated/graphql";
import "./UsersList.css";
import { User } from "../types";

export const GET_USERS = gql`
  query GetUsers {
    Users {
      id
      name
      avatarUrl
      createdAt
      updatedAt
    }
  }
`;

const Users: React.FC = () => {
  const { loading, error, data } = useGetUsersQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data.</p>;

  const { Users } = data;

  return (
    <div className="UsersList">
      <h3>Users</h3>
      {Users.map((user: User | null, key: number) => (
        <ul key={key}>
          <li className="UserName">
            <strong>Name:</strong>
            {user!.name}
          </li>
          <li className="UserId">
            <strong>Id:</strong> {user!.id}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Users;
