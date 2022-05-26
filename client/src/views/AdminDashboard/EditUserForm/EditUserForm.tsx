import { gql } from "@apollo/client";
import React, { useState } from "react";
import { GET_USERS } from "../UsersList/UsersList";
import { useEditUserMutation } from "../../../generated/graphql";

export const EDIT_USER = gql`
  mutation EditUser($userId: String!, $name: String!) {
    editUser(userId: $userId, name: $name) {
      id
      name
      avatarUrl
      createdAt
      updatedAt
    }
  }
`;

const EditUserForm: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [editUser, { error }] = useEditUserMutation();
  if (error) return <p>Error editing user: {error.message}</p>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editUser({
      variables: { userId: userId, name: userName },
      refetchQueries: [GET_USERS],
    })
      .then(() => {
        setUserId("");
        setUserName("");
      })
      .catch((err: Error) => err);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Id"
          data-testid="editUserFormId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Updated Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">Edit User</button>
      </form>
    </div>
  );
};
export default EditUserForm;
