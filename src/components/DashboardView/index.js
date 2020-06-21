import React, { useContext } from "react";
import { AuthUserContext } from "../../config/Session";

export default function DashboardView() {
  const authUser = useContext(AuthUserContext); 
  const {photoURL, displayName, email} = authUser || {};
  return (
    <div>{email || "No logged in user"}</div>
  ) 
};
