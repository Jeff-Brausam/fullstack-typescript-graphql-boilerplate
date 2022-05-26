import React from "react";
import CreateUserForm from "./CreateUserForm";
import DeleteUserForm from "./DeleteUserForm";
import EditUserForm from "./EditUserForm";
import UserList from "./UsersList";
import "./AdminDashboardView.css";

const AdminDashboardView: React.FC = () => {
  return (
    <div className="Container">
      <div className="ActionsContainer">
        <h3>Actions</h3>
        <CreateUserForm />
        <EditUserForm />
        <DeleteUserForm />
      </div>
      <div className="UsersListContainer">
        <UserList />
      </div>
    </div>
  );
};

export default AdminDashboardView;
