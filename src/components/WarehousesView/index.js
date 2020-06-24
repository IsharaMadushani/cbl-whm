import React, { useContext } from "react";
import { AuthUserContext, withAuthorization } from "../../config/Session";
import UserRoles from "../../constants/roles";

const WarehousesView = () => {
  const authUser = useContext(AuthUserContext); 
  const {photoURL, displayName, email} = authUser || {};
  
  return (
    <div>
      <h1>Warehouse Management</h1>
      <div>{email || "No logged in user"}</div>
    </div>    
  ) 
};
 
const condition = authUserRole => authUserRole &&  authUserRole === UserRoles.DepartmentHead;
 
export default withAuthorization(condition)(WarehousesView);