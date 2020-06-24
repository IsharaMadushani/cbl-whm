import React, { useContext } from "react";
import { AuthUserContext, withAuthorization } from "../../config/Session";
import UserRoles from "../../constants/roles";

const ManagementStaffDashboardView = () => {
  const authUserContext = useContext(AuthUserContext); 
  const state = authUserContext.state || {};
  return (
    <div>
      <h1>Dashboard</h1>
      <div>{state.authUserRole || "No logged in user"}</div>
      <div>{"Management staff dashboard"}</div>
    </div>    
  ) 
};
 
const condition = authUserRole => authUserRole &&  authUserRole === UserRoles.ManagementStaff;
 
export default withAuthorization(condition)(ManagementStaffDashboardView);