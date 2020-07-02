import React, { useContext } from "react";
import { AuthUserContext, withAuthorization } from "../../config/Session";
import UserRoles from "../../constants/roles";

const ITNView = () => {
  const authUserContext = useContext(AuthUserContext); 
  const state = authUserContext.state || {};
  return (
    <div>
      <div>{"ITN"}</div>
    </div>    
  ) 
};
 
const condition = authUserRole => authUserRole &&  authUserRole === UserRoles.ManagementStaff;
 
export default withAuthorization(condition)(ITNView);