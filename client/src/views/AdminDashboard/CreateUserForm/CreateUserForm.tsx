import { gql } from "@apollo/client";
import React, { useState } from "react";
import { GET_USERS } from "../UsersList/UsersList";
import { useCreateNewUserMutation } from "../../../generated/graphql";

export const CREATE_NEW_USER = gql`
  mutation CreateNewUser($name: String!, $avatarUrl: String) {
    createUser(name: $name, avatarUrl: $avatarUrl) {
      name
      avatarUrl
      createdAt
      updatedAt
      id
    }
  }
`;

const CreateUserForm: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [createNewUser, { error }] = useCreateNewUserMutation();
  if (error) return <p>Error creating new user: {error.message}</p>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewUser({
      variables: { name: userName },
      refetchQueries: [GET_USERS],
    })
      .then(() => setUserName(""))
      .catch((err: Error) => err);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          data-testid="CreateUserUsernameInput"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};
export default CreateUserForm;
