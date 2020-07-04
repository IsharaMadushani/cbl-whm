import Dashboard from "@material-ui/icons/Dashboard";
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import TransformIcon from '@material-ui/icons/Transform';
import UserRoles from "../constants/roles.js";
import DepartmentHeadDashboardView from "../components/DepartmentHeadDashboardView";
import ManagementStaffDashboardView from "../components/ManagementStaffDashboardView";
import TransferNotesView from "../components/TransferNotesView";
import WarehousesView from "../components/WarehousesView";


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
    component: WarehousesView,
    authReuired: true,
    authorizedUserRole: UserRoles.DepartmentHead
  }

];

export default routes;
