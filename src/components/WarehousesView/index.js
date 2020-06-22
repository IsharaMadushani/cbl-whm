import React, { useContext } from "react";
import { AuthUserContext, withAuthorization } from "../../config/Session";

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
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(WarehousesView);