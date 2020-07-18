import Dashboard from "@material-ui/icons/Dashboard";
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import TransformIcon from '@material-ui/icons/Transform';
import UserRoles from "../constants/roles.js";
import DepartmentHeadDashboardView from "../components/DepartmentHeadDashboardView";
import ManagementStaffDashboardView from "../components/ManagementStaffDashboardView";
import TransferNotesView from "../components/TransferNotesView";
import Warehouses from "../layouts/WarehouseLayout/Warehouse";
import Users from '../layouts/UsersLayout/Users'


const routes = [
  {
    icon: Dashboard,
    name: "Dashboard",
    layout: "/departmentHead",
    path: "/dashboard",
    component: DepartmentHeadDashboardView,
    authReuired: true,
    authorizedUserRole: UserRoles.DepartmentHead
  },
  {
    icon: Dashboard,
    name: "Dashboard",
    layout: "/managementStaff",
    path: "/dashboard",
    component: ManagementStaffDashboardView,
    authReuired: true,
    authorizedUserRole: UserRoles.ManagementStaff
  },
  {
    icon: TransformIcon,
    name: "TransferNotes",
    layout: "/transferNotes",
    path: "/transfernotes",
    component: TransferNotesView,
    authReuired: true,
    authorizedUserRole: UserRoles.Any
  },
  {
    icon: LocalConvenienceStoreIcon,
    name: "Warehouses",
    layout: "/departmentHead",
    path: "/warehouses",
    component: Warehouses,
    authReuired: true,
    authorizedUserRole: UserRoles.DepartmentHead
  },
  {
    icon: TransformIcon,
    name: "User Managements",
    layout: "/departmentHead",
    path: "/users",
    component: Users,
    authReuired: true,
    authorizedUserRole: UserRoles.Any
  }


];

export default routes;
