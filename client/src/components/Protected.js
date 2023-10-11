import React from "react";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { name } = useAppContext();

  if (!name) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default Protected;
