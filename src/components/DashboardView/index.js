import React, { useContext } from "react";
import { AuthUserContext, withAuthorization } from "../../config/Session";

const DashboardView = () => {
  const authUser = useContext(AuthUserContext); 
  const {photoURL, displayName, email} = authUser || {};
  return (
    <div>
      <h1>Home Page</h1>
      <div>{email || "No logged in user"}</div>
    </div>    
  ) 
};
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(DashboardView);