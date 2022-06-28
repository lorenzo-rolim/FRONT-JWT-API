import React from "react";
import { Route, Routes } from "react-router-dom";
import EditUser from "../pages/EditUser";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import PrivateRoute from "./PrivateRoute";

const RoutesComp = ({ children }) => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/edit"
        element={
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default RoutesComp;
