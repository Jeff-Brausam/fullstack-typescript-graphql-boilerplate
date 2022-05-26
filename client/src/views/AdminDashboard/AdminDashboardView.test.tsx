import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import AdminDashboardView from "./AdminDashboardView";
import { RenderWithGraphQL } from "../../testing-utils/testing-utils";
import { server } from "../../mocks/server";
import { wait } from "@testing-library/user-event/dist/utils";

describe("AdminDashboardView Tests", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test("Loading... is displayed when loading data from the server", async () => {
    render(
      <RenderWithGraphQL>
        <AdminDashboardView />
      </RenderWithGraphQL>
    );

    const loading = screen.getByText(/Loading.../i);
    expect(loading).toBeInTheDocument();
  });
  test("UsersList -- GraphQL queries user data and displays a list of them", async () => {
    render(
      <RenderWithGraphQL>
        <AdminDashboardView />
      </RenderWithGraphQL>
    );

    await waitFor(() => {
      screen.getByText(/John Schmidt/i);
    });
    expect(screen.getByText(/John Schmidt/i)).toBeInTheDocument();
    expect(screen.getByText(/Carly Manhattan/i)).toBeInTheDocument();
    expect(screen.getByText(/Chevy Chase/i)).toBeInTheDocument();
  });
  // CreateUserForm
  test("CreateUserForm - GraphQL mutation and form inputs allows user to be created", async () => {
    render(
      <RenderWithGraphQL>
        <AdminDashboardView />
      </RenderWithGraphQL>
    );
    await waitFor(() => {
      screen.getByTestId(/editUserFormId/i) as HTMLInputElement;
    });

    const Username = screen.getByTestId(
      /CreateUserUsernameInput/i
    ) as HTMLInputElement;
    fireEvent.change(Username, {
      target: { value: "Kailie Moore" },
    });

    const AddUserButton = screen.getByText(/Add User/i) as HTMLButtonElement;
    fireEvent.click(AddUserButton);
    await wait(1000);
    // Testing for the input clear, because MSW doesn't refresh caches
    expect(Username).toHaveValue("");
  });
  test("EditUserForm -- GraphQL mutation and form inputs allow user to be edited", async () => {
    render(
      <RenderWithGraphQL>
        <AdminDashboardView />
      </RenderWithGraphQL>
    );
    await waitFor(() => {
      screen.getByTestId(/editUserFormId/i) as HTMLInputElement;
    });

    const UserIdInput = screen.getByTestId(
      /editUserFormId/i
    ) as HTMLInputElement;
    fireEvent.change(UserIdInput, {
      target: { value: "user-e0724e83-8ccd-4bd6-86cf-d78ca45e059e" },
    });

    const UsernameInput = screen.getByPlaceholderText(
      /Updated Username/i
    ) as HTMLInputElement;
    fireEvent.change(UsernameInput, {
      target: { value: "Zoey Grant" },
    });

    const EditUserButton = screen.getByText(/Edit User/i) as HTMLButtonElement;
    fireEvent.click(EditUserButton);

    await waitFor(() => {
      screen.getByText(/Zoey Grant/);
    }).then(() => {
      expect(screen.getByText(/Zoey Grant/)).toBeInTheDocument();
    });
  });
  test("DeleteUserForm -- GraphQL mutation and form inputs allows user to be deleted", async () => {
    render(
      <RenderWithGraphQL>
        <AdminDashboardView />
      </RenderWithGraphQL>
    );
    await waitFor(() => {
      screen.getByTestId(/deleteUserFormId/i) as HTMLInputElement;
    });

    const userId = screen.getByTestId(/deleteUserFormId/i) as HTMLInputElement;
    fireEvent.change(userId, {
      target: { value: "user-e0724e83-8ccd-4bd6-86cf-d78ca45e059e" },
    });

    const DeleteUserButton = screen.getByText(
      /Delete User/i
    ) as HTMLButtonElement;
    fireEvent.click(DeleteUserButton);
    await wait(1000);
    // Testing for the input clear, because MSW doesn't refresh caches
    expect(DeleteUserButton).toHaveValue("");
  });
});
