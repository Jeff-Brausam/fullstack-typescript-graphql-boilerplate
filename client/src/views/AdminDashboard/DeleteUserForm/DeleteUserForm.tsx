import { gql } from "@apollo/client";
import React, { useState } from "react";
import { GET_USERS } from "../UsersList/UsersList";
import { useDeleteUserMutation } from "../../../generated/graphql";

export const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`;

const DeleteUserForm: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [deleteUser, { error }] = useDeleteUserMutation();
  if (error) return <p>Error deleting user: {error.message}</p>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteUser({
      variables: { userId: userId },
      refetchQueries: [GET_USERS],
    })
      .then(() => setUserId(""))
      .catch((err: Error) => err);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Id"
          data-testid="deleteUserFormId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit">Delete User</button>
      </form>
    </div>
  );
};
export default DeleteUserForm;
