import Dashboard from "@material-ui/icons/Dashboard";
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import UserRoles from "../constants/roles.js";
import DepartmentHeadDashboardView from "../components/DepartmentHeadDashboardView";
import ManagementStaffDashboardView from "../components/ManagementStaffDashboardView";
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
